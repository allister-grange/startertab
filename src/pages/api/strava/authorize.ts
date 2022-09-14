import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const TOKEN_ENDPOINT = `https://www.strava.com/oauth/token`;

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_SECRET;
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
      return res.status(500).send("No code on the redirect from Strava");
    }

    if (!key) {
      return res
        .status(500)
        .send("No encryption key found in environment variables");
    }

    const data = await getFirstAccessTokenFromCode(code as string);

    const { access_token, refresh_token } = data;

    if (!access_token || !refresh_token) {
      return res
        .status(500)
        .send(
          "Didn't find access token or refresh token in Strava token retrieval"
        );
    }

    const AES = (await import("crypto-js/aes")).default;

    res.setHeader("Set-Cookie", [
      cookie.serialize("stravaRefreshToken", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
        encode: (value) => AES.encrypt(value, key).toString(),
      }),
      cookie.serialize("stravaAccessToken", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
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
  try {
    const body = JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
    });

    const headers = {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    };

    const response = await fetch(`${TOKEN_ENDPOINT}`, {
      method: `POST`,
      headers: headers,
      body: body,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};
