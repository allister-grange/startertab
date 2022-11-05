import { NextApiRequest, NextApiResponse } from "next";

const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const NEXT_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/next`;
const PREVIOUS_SONG_ENDPOINT = `https://api.spotify.com/v1/me/player/previous`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
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
    query: { forward },
  } = req;
  const forwardBool = forward === "true" ? true : false;

  try {
    const endpointUrl = forwardBool
      ? NEXT_SONG_ENDPOINT
      : PREVIOUS_SONG_ENDPOINT;

    const changeSongRes = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // access token is out of data, the client should refresh itself
    if (changeSongRes.status === 401) {
      return res.status(401).send("Auth token has expired");
    }

    if (changeSongRes.status >= 400) {
      return res.status(500).json("Failed to change song");
    }

    return res.status(200).json("Changed song");
  } catch (err) {
    return res.status(500).json(err);
  }
}
