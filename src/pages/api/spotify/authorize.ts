import { getSpotifyRedirectUrl } from "@/helpers/getClientUrl";
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

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

    const data = await getFirstAccessTokenFromCode(code as string);

    const { access_token, refresh_token } = data;

    if (!access_token || !refresh_token) {
      res
        .status(500)
        .send("Didn't find access token or refresh token in Spotify response");
    }

    res.redirect(
      `/?accessToken=${access_token}&refreshToken=${refresh_token}&fromSpotify=true`
    );
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
