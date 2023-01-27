import {
  getGoogleRedirectUri,
  getGoogleRedirectUrl,
} from "@/helpers/redirectHelpers";
import { NextApiResponse } from "next";

const clientId = process.env.GOOGLE_CLIENT_ID;

export default async function handler(
  req: NextApiResponse,
  res: NextApiResponse
) {
  try {
    const redirectUri = getGoogleRedirectUri(
      clientId as string,
      getGoogleRedirectUrl()
    );

    res.status(200).send({ redirectUri });
  } catch (err) {
    res.status(500).send(err);
  }
}
