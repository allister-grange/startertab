import { getTwitterRedirectUri } from "@/helpers/apiHelpers";
import { NextApiResponse } from "next";

const API_KEY = process.env.TWITTER_CLIENT_ID;
const CODE_CHALLENGE_KEY = process.env.TWITTER_CODE_CHALLENGE_KEY;

export default async function handler(
  req: NextApiResponse,
  res: NextApiResponse
) {
  try {
    const redirectUri = getTwitterRedirectUri(
      API_KEY as string,
      CODE_CHALLENGE_KEY as string
    );

    res.status(200).send({ redirectUri });
  } catch (err) {
    res.status(500).send(err);
  }
}
