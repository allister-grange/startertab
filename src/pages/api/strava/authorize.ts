import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_ENDPOINT = `https://www.strava.com/oauth/token`;

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {
      query: { code },
    } = req;

    if (!code) {
      res.status(500).send("No code on the redirect from Strava");
    }

    const data = await getFirstAccessTokenFromCode(code as string);

    const { access_token, refresh_token } = data;

    if (!access_token || !refresh_token) {
      return res
        .status(500)
        .send("Didn't find access token or refresh token in Spotify response");
    }

    res.redirect(
      `/?accessToken=${access_token}&refreshToken=${refresh_token}&fromStrava=true`
    );
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
