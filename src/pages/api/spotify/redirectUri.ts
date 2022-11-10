import {
  getSpotifyRedirectUri,
  getSpotifyRedirectUrl,
} from "@/helpers/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

const clientId = process.env.SPOTIFY_CLIENT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

  try {
    const redirectUri = getSpotifyRedirectUri(
      clientId as string,
      [
        "user-read-currently-playing",
        "user-top-read",
        "user-read-playback-state",
        "user-read-recently-played",
        "user-modify-playback-state",
        "user-read-playback-position",
      ],
      getSpotifyRedirectUrl(),
      true
    );

    res.status(200).send({ redirectUri });
  } catch (err) {
    res.status(500).send(err);
  }
}
