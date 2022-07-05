import { TopArtistSpotify, TopArtistSpotifyData } from "@/types/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`);

const TOP_ARTISTS = `https://api.spotify.com/v1/me/top/artists?time_range=long_term`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let {
        query: { accessToken, refreshToken },
      } = req;

      if (!accessToken || !refreshToken) {
        return res.status(500).send("No access/refresh token provided");
      }

      const spotifyData = await getSpotifyTopArtists(
        accessToken as string,
        refreshToken as string
      );

      spotifyData.topArtists.sort((a, b) => b.popularity - a.popularity);

      res.status(200).json(spotifyData);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
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
  refreshToken: string
): Promise<TopArtistSpotifyData> => {
  const res = await fetch(TOP_ARTISTS, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // access token is stale, get a new token and re-call this method
  if (res.status === 401) {
    console.log("Refreshing old access token", accessToken);
    const newAccessToken = await getAccessToken(refreshToken);
    console.log("New access token grabbed", newAccessToken);
    const data = await getSpotifyTopArtists(newAccessToken, refreshToken);
    return { ...data, accessToken: newAccessToken };
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
