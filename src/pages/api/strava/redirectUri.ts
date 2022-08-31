import {
  getStravaRedirectUri,
  getStravaRedirectUrl,
} from "@/helpers/apiHelpers";
import { NextApiResponse } from "next";

const clientId = process.env.STRAVA_CLIENT_ID;

export default async function handler(
  req: NextApiResponse,
  res: NextApiResponse
) {
  try {
    const redirectUri = getStravaRedirectUri(
      clientId as string,
      ["activity:read_all", "activity:read"],
      getStravaRedirectUrl()
    );

    res.status(200).send({ redirectUri });
  } catch (err) {
    res.status(500).send(err);
  }
}
