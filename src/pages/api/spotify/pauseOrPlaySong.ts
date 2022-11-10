import { NextApiRequest, NextApiResponse } from "next";

const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const PAUSE_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/pause`;
const PLAY_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/play`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
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

  let {
    query: { pause },
  } = req;

  const pauseBool = pause === "true" ? true : false;

  try {
    const endpointUrl = pauseBool ? PAUSE_SONG_ENDPOINT : PLAY_SONG_ENDPOINT;

    const pausePlaySongRes = await fetch(endpointUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // access token is out of data, the client should refresh itself
    if (pausePlaySongRes.status === 401) {
      return res.status(401);
    }

    if (pausePlaySongRes.status >= 400) {
      return res
        .status(pausePlaySongRes.status)
        .json("Failed to pause or play song");
    }

    return res.status(200).json("Paused/played song");
  } catch (err) {
    return res.status(500).json(err);
  }
}
