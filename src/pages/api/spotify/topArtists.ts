import { TopArtistSpotify, TopArtistSpotifyData } from "@/types/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";
import cookie from "cookie";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const key = process.env.TOKEN_ENCRYPT_KEY;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`);

const TOP_ARTISTS = `https://api.spotify.com/v1/me/top/artists`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

  try {
    let {
      query: { timeRange },
    } = req;

    let accessToken = req.cookies["spotifyAccessToken"];
    let refreshToken = req.cookies["spotifyRefreshToken"];

    if (!accessToken || !refreshToken) {
      return res.status(400).send("Failed to provide access or refresh token");
    }

    if (!key) {
      return res
        .status(500)
        .send("No encryption key found in environment variables");
    }

    const CryptoJS = (await import("crypto-js")).default;

    accessToken = CryptoJS.AES.decrypt(accessToken, key).toString(
      CryptoJS.enc.Utf8
    );
    refreshToken = CryptoJS.AES.decrypt(refreshToken, key).toString(
      CryptoJS.enc.Utf8
    );

    let spotifyData = await getSpotifyTopArtists(
      accessToken as string,
      refreshToken as string,
      timeRange as string
    );

    const AES = (await import("crypto-js/aes")).default;

    // if a new access token is sent back, set it in cookies
    // and re-fetch the request
    if (typeof spotifyData === "string") {
      res.setHeader("Set-Cookie", [
        cookie.serialize("spotifyAccessToken", spotifyData, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 34560000,
          sameSite: "strict",
          path: "/",
          encode: (value) => AES.encrypt(value, key!).toString(),
        }),
      ]);
      spotifyData = (await getSpotifyTopArtists(
        accessToken as string,
        refreshToken as string,
        timeRange as string
      )) as TopArtistSpotifyData;
    }

    spotifyData.topArtists.sort((a, b) => b.popularity - a.popularity);

    res.status(200).json(spotifyData);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const getAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: `POST`,
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      body: querystring.stringify({
        grant_type: `refresh_token`,
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    return data.access_token;
  } catch (err) {
    throw new Error("Error fetching access token " + err);
  }
};

export const getSpotifyTopArtists = async (
  accessToken: string,
  refreshToken: string,
  timeRange: string
): Promise<TopArtistSpotifyData | string> => {
  const res = await fetch(`${TOP_ARTISTS}?time_range=${timeRange}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // access token is stale, get a new token and re-call this method
  if (res.status === 401) {
    const newAccessToken = await getAccessToken(refreshToken);
    return newAccessToken;
  }

  if (res.status !== 200) {
    throw new Error("Didn't get a 200 from Spotify API, status:" + res.status);
  }

  const spotifyData: TopArtistSpotify[] = [];
  const data = await res.json();

  data.items.forEach((spotifyItem: any) => {
    spotifyData.push({
      name: spotifyItem.name,
      popularity: spotifyItem.popularity,
    });
  });

  return {
    topArtists: spotifyData,
  };
};
