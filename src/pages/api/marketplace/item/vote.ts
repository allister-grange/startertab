import { CreateThemeRequest } from "@/types/marketplace";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

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

  try {
    // const body = (await JSON.parse(req.body)) as CreateThemeRequest;
    const marketplaceTheme = await prisma.vote.create({
      data: {
        themeId: themeIdAsNumber,
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
