import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const accessToken = req.cookies["twitterAccessToken"];
    const refreshToken = req.cookies["twitterRefreshToken"];

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ loggedIn: false });
    } else {
      return res.status(200).json({ loggedIn: true });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
