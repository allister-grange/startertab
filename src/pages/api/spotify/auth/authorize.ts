import { getSpotifyRedirectUrl } from "@/helpers/redirectHelpers";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const key = process.env.TOKEN_ENCRYPT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {
      query: { code },
    } = req;

    if (!code) {
      res.status(500).send("No code on the redirect from Spotify");
    }

    if (!key) {
      return res
        .status(500)
        .send("No encryption key found in environment variables");
    }

    const data = await getFirstAccessTokenFromCode(code as string);

    const { access_token, refresh_token } = data;

    if (!access_token) {
      res.status(500).send("Didn't find access token in Spotify response");
    }

    const AES = (await import("crypto-js/aes")).default;

    res.setHeader("Set-Cookie", [
      cookie.serialize("spotifyAccessToken", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 34560000,
        sameSite: "none",
        path: "/",
        encode: (value) => AES.encrypt(value, key).toString(),
      }),
      cookie.serialize("spotifyRefreshToken", refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 34560000,
        sameSite: "none",
        path: "/",
        encode: (value) => AES.encrypt(value, key).toString(),
      }),
    ]);

    res.redirect(`/`);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getFirstAccessTokenFromCode = async (code: string) => {
  const redirectUri = getSpotifyRedirectUrl();

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: `POST`,
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};
