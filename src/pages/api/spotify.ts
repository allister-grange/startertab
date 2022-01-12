import { NowPlayingSpotifyData } from "@/types/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stravaData = await getSpotifyNowPlayingData();

    res.status(200).json(stravaData);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAccessToken = async () => {
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
};

export const getSpotifyNowPlayingData =
  async (): Promise<NowPlayingSpotifyData> => {
    const { access_token: accessToken } = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
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
      };
    }

    const data = await res.json();

    return {
      playing: data.is_playing,
      songTitle: data.item.name,
      songArtist: data.item.artists[0].name,
      link: data.item.external_urls.spotify,
    };
  };

export const getSpotifyData = async () => {
  const { accessToken } = await getAccessToken();

  const responseTracks = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseArtists = await fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseRecently = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { responseArtists, responseRecently, responseTracks };
};
