import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import {
  getGoogleRedirectUrl,
  getOutlookRedirectUrl,
} from "@/helpers/redirectHelpers";

const TOKEN_ENDPOINT = `https://oauth2.googleapis.com/token`;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {
      query: { code },
    } = req;

    if (!code) {
      return res.status(500).send("No code on the redirect from Google");
    }

    if (!ENCRYPTION_KEY) {
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
          "Didn't find access token or refresh token in google token retrieval"
        );
    }

    const AES = (await import("crypto-js/aes")).default;

    res.setHeader("Set-Cookie", [
      cookie.serialize("googleRefreshToken", refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 34560000,
        sameSite: "none",
        path: "/",
        encode: (value) => AES.encrypt(value, ENCRYPTION_KEY).toString(),
      }),
      cookie.serialize("googleAccessToken", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 34560000,
        sameSite: "none",
        path: "/",
        encode: (value) => AES.encrypt(value, ENCRYPTION_KEY).toString(),
      }),
    ]);

    res.redirect(`/`);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getFirstAccessTokenFromCode = async (code: string) => {
  try {
    const postData = {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: getGoogleRedirectUrl(),
      grant_type: "authorization_code",
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const tokenRes = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postData),
    });

    const data = await tokenRes.json();

    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};
