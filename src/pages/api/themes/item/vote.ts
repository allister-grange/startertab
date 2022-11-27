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

  const { themeId } = req.query;

  if (!themeId) {
    return res.status(400).json({
      success: false,
      message: "Please include a theme id with your vote",
    });
  }

  const themeIdAsNumber = parseInt(themeId as string);
  const forwarded = req.headers["x-forwarded-for"];
  let ip = req.socket.remoteAddress;
  if (forwarded && typeof forwarded === "string") {
    ip = forwarded.split(/, /)[0];
  }

  try {
    const ipInDbDate = await prisma.vote.findFirst({
      where: {
        ipAddress: ip,
        themeId: themeIdAsNumber,
      },
      select: {
        createdAt: true,
      },
    });

    const ONE_HOUR = 60 * 60 * 1000;

    // check if they've voted for this theme in the last hour
    // this in conjunction with the localStorage should be enough 🤞
    // people can have the same IP, hence the ONE_HOUR check
    if (
      ipInDbDate &&
      new Date().getTime() - new Date(ipInDbDate.createdAt).getTime() < ONE_HOUR
    ) {
      return res.status(429).send("You've already voted for this theme");
    }

    const marketplaceTheme = await prisma.vote.create({
      data: {
        themeId: themeIdAsNumber,
        ipAddress: ip,
      },
    });
    return res.status(201).json(marketplaceTheme);
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "Error creating theme in marketplace", success: false });
  }
}
