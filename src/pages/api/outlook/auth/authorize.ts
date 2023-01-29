import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getOutlookRedirectUrl } from "@/helpers/redirectHelpers";

const TOKEN_ENDPOINT = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;

const clientId = process.env.OUTLOOK_CLIENT_ID;
const clientSecret = process.env.OUTLOOK_CLIENT_SECRET;
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
      return res.status(500).send("No code on the redirect from Outlook");
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
          "Didn't find access token or refresh token in Outlook token retrieval"
        );
    }

    const AES = (await import("crypto-js/aes")).default;

    res.setHeader("Set-Cookie", [
      cookie.serialize("outlookRefreshToken", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 34560000,
        sameSite: "strict",
        path: "/",
        encode: (value) => AES.encrypt(value, key).toString(),
      }),
      cookie.serialize("outlookAccessToken", access_token, {
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
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: headers,
      body:
        `client_id=${clientId}&client_secret=${clientSecret}&` +
        `code=${code}&grant_type=authorization_code&` +
        `redirect_uri=${getOutlookRedirectUrl()}`,
    });

    const data = await response.json();

    console.log(data);

    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};
