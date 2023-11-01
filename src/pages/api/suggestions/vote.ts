import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false });
  }

  const { suggestionId } = req.query;

  if (!suggestionId) {
    return res.status(400).json({
      success: false,
      message: "Please include a theme id with your vote",
    });
  }

  const suggestionIdAsNumber = parseInt(suggestionId as string);
  const forwarded = req.headers["x-forwarded-for"];
  let ip = req.socket.remoteAddress;
  if (forwarded && typeof forwarded === "string") {
    ip = forwarded.split(/, /)[0];
  }

  try {
    const ipInDbDate = await prisma.suggestionVote.findFirst({
      where: {
        ipAddress: ip,
        suggestionId: suggestionIdAsNumber,
      },
      select: {
        createdAt: true,
      },
    });

    const ONE_HOUR = 60 * 60 * 1000;

    // check if they've voted for this suggestion in the last hour
    // this in conjunction with the localStorage should be enough 🤞
    // people can have the same IP, hence the ONE_HOUR check
    if (
      ipInDbDate &&
      new Date().getTime() - new Date(ipInDbDate.createdAt).getTime() < ONE_HOUR
    ) {
      return res.status(429).send("You've already voted for this suggestion");
    }

    const suggestionVote = await prisma.suggestionVote.create({
      data: {
        suggestionId: suggestionIdAsNumber,
        ipAddress: ip,
      },
    });
    return res.status(201).json(suggestionVote);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({
      error: "Error voting for suggestions",
      success: false,
    });
  }
}
