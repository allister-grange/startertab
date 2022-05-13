import { NowPlayingSpotifyData } from "@/types/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`);
const STATUS_ENDPOINT = `https://api.spotify.com/v1/me/player`;
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
  if (req.method === "POST") {
    try {
      let {
        query: { forward, pause },
      } = req;

      if (forward !== undefined) {
        const forwardBool = forward === "true" ? true : false;
        await changeSongSpotify(forwardBool);

        res.status(200).json({ success: true });
      } else if (pause !== undefined) {
        const pauseBool = pause === "true" ? true : false;
        await pausePlaySongSpotify(pauseBool);

        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (req.method === "GET") {
    try {
      const spotifyData = await getSpotifyStatus();

      res.status(200).json(spotifyData);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ success: false });
  }
}

const getAccessToken = async () => {
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

    return response.json();
  } catch (err) {
    throw new Error("Error fetching access token " + err);
  }
};

export const getSpotifyStatus = async (): Promise<NowPlayingSpotifyData> => {
  const { access_token: accessToken } = await getAccessToken();

  const res = await fetch(STATUS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 204) {
    const data = await getRecentlyPlayed();
    return data;
  }

  if (res.status !== 200) {
    return {
      playing: false,
      songArtist: undefined,
      songTitle: undefined,
      link: undefined,
      albumImageUrl: undefined,
      playable: false,
    };
  }

  const data = await res.json();

  // if a podcast is playing
  if (data.currently_playing_type === "episode") {
    return {
      playing: false,
      songArtist: undefined,
      songTitle: undefined,
      link: undefined,
      albumImageUrl: undefined,
      playable: false,
    };
  }

  return {
    playing: data.is_playing,
    songTitle: data.item.name,
    songArtist: data.item.artists[0].name,
    link: data.item.external_urls.spotify,
    albumImageUrl: data.item.album.images[0].url,
    playable: true,
  };
};

export const getRecentlyPlayed = async (): Promise<NowPlayingSpotifyData> => {
  const { access_token: accessToken } = await getAccessToken();

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
      albumImageUrl: undefined,
      playable: false,
    };
  }

  const data = await res.json();

  // if a podcast is playing
  if (data.items[0].track.type === "episode") {
    return {
      playing: false,
      songArtist: undefined,
      songTitle: undefined,
      link: undefined,
      albumImageUrl: undefined,
      playable: false,
    };
  }

  return {
    playing: false,
    songTitle: data.items[0].track.name,
    songArtist: data.items[0].track.artists[0].name,
    link: data.items[0].track.external_urls.spotify,
    albumImageUrl: data.items[0].track.album.images[0].url,
    playable: false,
  };
};

export const changeSongSpotify = async (forward: boolean) => {
  const { access_token: accessToken } = await getAccessToken();

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

export const pausePlaySongSpotify = async (pause: boolean) => {
  const { access_token: accessToken } = await getAccessToken();

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
