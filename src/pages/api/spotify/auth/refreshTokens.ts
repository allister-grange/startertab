import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import querystring from "querystring";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(`base64`);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

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

  try {
    const newTokensResponse = await fetch(TOKEN_ENDPOINT, {
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

    if (newTokensResponse.status >= 400) {
      return res
        .status(newTokensResponse.status)
        .send("There was an error refreshing the access tokens");
    }

    const data = await newTokensResponse.json();

    if (!data.access_token || !data.refresh_token) {
      return res
        .status(500)
        .send("Missing tokens on response from Spotify when refreshing tokens");
    }

    const AES = (await import("crypto-js/aes")).default;

    res.setHeader("Set-Cookie", [
      cookie.serialize("spotifyAccessToken", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
        encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
      }),
      cookie.serialize("spotifyRefreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
        encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
      }),
    ]);

    res.status(200).json("Tokens refreshed");
  } catch (err) {
    return res.status(500).json(err);
  }
}
