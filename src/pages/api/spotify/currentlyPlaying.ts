import { NextApiRequest, NextApiResponse } from "next";

const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const STATUS_ENDPOINT = `https://api.spotify.com/v1/me/player?additional_types=episode,track`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

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

  try {
    const spotifyStatusRes = await fetch(STATUS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // if there isn't any music playing, we need to make a fetch to the recently played endpoint
    if (spotifyStatusRes.status === 204) {
      return res.status(204).end();
    }

    // access token is out of data, the client should refresh itself
    if (spotifyStatusRes.status === 401) {
      return res.status(401).send("Auth token has expired");
    }

    if (spotifyStatusRes.status >= 400) {
      return res
        .status(spotifyStatusRes.status)
        .send("Failed to fetch current song " + spotifyStatusRes.text);
    }

    const data = await spotifyStatusRes.json();

    // if a podcast is playing
    if (data.currently_playing_type === "episode") {
      return res.status(200).json({
        playing: data.is_playing,
        songArtist: data.item.show.name,
        songTitle: data.item.name,
        link: data.item.show.href,
        albumFullSizeImageUrl: data.item.images[0].url,
        albumPreviewUrl: data.item.images[2].url,
        playable: true,
      });
    } else {
      // if a song is playing
      return res.status(200).json({
        playing: data.is_playing,
        songTitle: data.item.name,
        songArtist: data.item.artists[0].name,
        link: data.item.external_urls.spotify,
        albumFullSizeImageUrl: data.item.album.images[0].url,
        albumPreviewUrl: data.item.album.images[2].url,
        playable: true,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
