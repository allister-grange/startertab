import { getTwitterRedirectUrl } from "@/helpers/apiHelpers";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_ENDPOINT = `https://api.twitter.com/2/oauth2/token`;
const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;
const CODE_CHALLENGE_KEY = process.env.TWITTER_CODE_CHALLENGE_KEY;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(`base64`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {
      query: { code },
    } = req;

    if (!code) {
      return res.status(500).send("No code on the redirect from Twitter");
    }

    if (!ENCRYPT_KEY) {
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
          "Didn't find access token or refresh token in Twitter token retrieval response"
        );
    }

    const userId = await getUserId(access_token as string);

    const AES = (await import("crypto-js/aes")).default;

    res.setHeader("Set-Cookie", [
      cookie.serialize("twitterRefreshToken", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
        encode: (value) => AES.encrypt(value, ENCRYPT_KEY).toString(),
      }),
      cookie.serialize("twitterAccessToken", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
        encode: (value) => AES.encrypt(value, ENCRYPT_KEY).toString(),
      }),
      cookie.serialize("twitterUserId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
      }),
    ]);

    res.redirect(`/`);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getFirstAccessTokenFromCode = async (code: string) => {
  try {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
    };

    const redirectUri = getTwitterRedirectUrl();

    const endpoint =
      `${TOKEN_ENDPOINT}` +
      `?code=${code}` +
      `&grant_type=authorization_code` +
      `&client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code_verifier=${CODE_CHALLENGE_KEY}`;

    const response = await fetch(endpoint, {
      method: `POST`,
      headers: headers,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

const getUserId = async (accessToken: string) => {
  try {
    const res = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data } = await res.json();

    if (!data.id) {
      console.error("No user id found for twitter user");
    }

    return data.id;
  } catch (err) {
    console.error(err as string);
  }
};
