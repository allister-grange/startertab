import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false });
    }

    const accessToken = req.cookies["spotifyAccessToken"];
    const refreshToken = req.cookies["spotifyRefreshToken"];

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ loggedIn: false });
    } else {
      return res.status(200).json({ loggedIn: true });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
