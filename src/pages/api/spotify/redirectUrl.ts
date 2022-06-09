import { getRedirectUrl, getSpotifyRedirectUrl } from "@/helpers/getClientUrl";
import { NextApiRequest, NextApiResponse } from "next";

const clientId = process.env.SPOTIFY_CLIENT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const redirectUri = getRedirectUrl(
      clientId as string,
      [
        "user-read-currently-playing",
        "user-top-read",
        "user-read-playback-state",
        "user-read-recently-played",
        "user-modify-playback-state",
      ],
      getSpotifyRedirectUrl(),
      true
    );

    res.status(200).send({redirectUri});
  } catch (err) {
    res.status(500).send(err);
  }
}
