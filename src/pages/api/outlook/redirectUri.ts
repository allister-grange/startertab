import {
  getOutlookRedirectUri,
  getOutlookRedirectUrl,
} from "@/helpers/apiHelpers";
import { NextApiResponse } from "next";

const clientId = process.env.OUTLOOK_CLIENT_ID;

export default async function handler(
  req: NextApiResponse,
  res: NextApiResponse
) {
  try {
    const redirectUri = getOutlookRedirectUri(
      clientId as string,
      getOutlookRedirectUrl()
    );

    console.log(redirectUri);

    res.status(200).send({ redirectUri });
  } catch (err) {
    res.status(500).send(err);
  }
}
