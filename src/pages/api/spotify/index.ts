import { NowPlayingSpotifyData } from "@/types/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";
import cookie from "cookie";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(`base64`);

const STATUS_ENDPOINT = `https://api.spotify.com/v1/me/player?additional_types=episode,track`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NEXT_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/next`;
const PREVIOUS_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/previous`;
const PAUSE_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/pause`;
const PLAY_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/play`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let accessToken = req.cookies["spotifyAccessToken"];
  let refreshToken = req.cookies["spotifyRefreshToken"];

  if (!accessToken || !refreshToken) {
    return res.status(400).send("Failed to provide access or refresh token");
  }

  if (!ENCRYPT_KEY) {
    return res
      .status(500)
      .send("No encryption key found in environment variables");
  }

  const CryptoJS = (await import("crypto-js")).default;

  accessToken = CryptoJS.AES.decrypt(accessToken, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8
  );
  refreshToken = CryptoJS.AES.decrypt(refreshToken, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8
  );

  if (req.method === "POST") {
    try {
      let {
        query: { forward, pause },
      } = req;

      if (forward !== undefined) {
        const forwardBool = forward === "true" ? true : false;
        await changeSongSpotify(forwardBool, accessToken as string);

        return res.status(200).json({ success: true });
      } else if (pause !== undefined) {
        const pauseBool = pause === "true" ? true : false;
        await pausePlaySongSpotify(pauseBool, accessToken as string);

        return res.status(200).json({ success: true });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (req.method === "GET") {
    try {
      let spotifyData = await getSpotifyStatus(accessToken as string);

      // if a new access token is sent back, set it in cookies
      // and re-fetch the request
      if (!spotifyData) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await getNewOAuthTokens(refreshToken);
        spotifyData = await getSpotifyStatus(newAccessToken);
        await setNewTokenCookies(newAccessToken, newRefreshToken, res);
      }

      return res.status(200).json(spotifyData);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ success: false });
  }
}

export const getSpotifyStatus = async (
  accessToken: string
): Promise<NowPlayingSpotifyData | null> => {
  const spotifyStatusRes = await fetch(STATUS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // access token is stale, get a new token and re-call this method
  if (spotifyStatusRes.status === 401) {
    return null;
  }

  if (spotifyStatusRes.status === 204) {
    try {
      const data = await getRecentlyPlayed(accessToken);
      return data;
    } catch {
      return null;
    }
  }

  if (spotifyStatusRes.status !== 200) {
    return {
      playing: false,
      songArtist: undefined,
      songTitle: undefined,
      link: undefined,
      albumFullSizeImageUrl: undefined,
      albumPreviewUrl: undefined,
      playable: false,
    };
  }

  const data = await spotifyStatusRes.json();

  // if a podcast is playing
  if (data.currently_playing_type === "episode") {
    return {
      playing: data.is_playing,
      songArtist: data.item.show.name,
      songTitle: data.item.name,
      link: data.item.show.href,
      albumFullSizeImageUrl: data.item.images[0].url,
      albumPreviewUrl: data.item.images[2].url,
      playable: true,
    };
  }

  return {
    playing: data.is_playing,
    songTitle: data.item.name,
    songArtist: data.item.artists[0].name,
    link: data.item.external_urls.spotify,
    albumFullSizeImageUrl: data.item.album.images[0].url,
    albumPreviewUrl: data.item.album.images[2].url,
    playable: true,
  };
};

export const getRecentlyPlayed = async (
  accessToken: string
): Promise<NowPlayingSpotifyData> => {
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 200) {
    return {
      playing: false,
      songArtist: undefined,
      songTitle: undefined,
      link: undefined,
      albumFullSizeImageUrl: undefined,
      albumPreviewUrl: undefined,
      playable: false,
    };
  }

  const data = await res.json();

  // if a podcast is playing
  if (data.items[0].track.type === "episode") {
    return {
      playing: false,
      songTitle: data.items[1].track.name,
      songArtist: data.items[1].track.artists[0].name,
      link: data.items[1].track.external_urls.spotify,
      albumFullSizeImageUrl: data.items[1].track.album.images[0].url,
      albumPreviewUrl: data.items[1].track.album.images[2].url,
      playable: false,
    };
  }

  return {
    playing: false,
    songTitle: data.items[0].track.name,
    songArtist: data.items[0].track.artists[0].name,
    link: data.items[0].track.external_urls.spotify,
    albumFullSizeImageUrl: data.items[0].track.album.images[0].url,
    albumPreviewUrl: data.items[0].track.album.images[2].url,
    playable: false,
  };
};

export const changeSongSpotify = async (
  forward: boolean,
  accessToken: string
) => {
  const endpointUrl = forward ? NEXT_SONG_ENDPOINT : PREVIOUS_SONG_ENDPOINT;

  const res = await fetch(endpointUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 204) {
    throw new Error("Failed to change spotify song");
  }
};

export const pausePlaySongSpotify = async (
  pause: boolean,
  accessToken: string
) => {
  const endpointUrl = pause ? PAUSE_SONG_ENDPOINT : PLAY_SONG_ENDPOINT;

  try {
    const res = await fetch(endpointUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 204) {
      throw new Error("Failed to pause/play spotify song " + res.statusText);
    }

    return res;
  } catch (err) {
    throw new Error("Failed to pause/play spotify song " + err);
  }
};

const getNewOAuthTokens = async (refreshToken: string) => {
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

    if (!data.access_token || !data.refresh_token) {
      throw new Error("Missing token on response from Twitter");
    }

    return { refreshToken: data.refresh_token, accessToken: data.access_token };
  } catch (err) {
    throw new Error("Error fetching access token " + err);
  }
};

const setNewTokenCookies = async (
  accessToken: string,
  refreshToken: string,
  res: NextApiResponse
) => {
  const AES = (await import("crypto-js/aes")).default;

  res.setHeader("Set-Cookie", [
    cookie.serialize("twitterAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 34560000,
      sameSite: "strict",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
    cookie.serialize("twitterRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 34560000,
      sameSite: "strict",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
  ]);
};
