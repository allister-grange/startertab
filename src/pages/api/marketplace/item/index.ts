import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

  const cursor = req.query.cursor ?? "";
  const take = 10;
  const cursorObj =
    cursor === "" ? undefined : { id: parseInt(cursor as string, 10) };

  try {
    const marketplaceItems = await prisma.theme.findMany({
      take,
      skip: cursor !== "" ? 1 : 0,
      cursor: cursorObj,
      include: {
        votes: true,
      },
    });

    return res.status(200).json({
      themes: marketplaceItems,
      nextId:
        marketplaceItems.length === take
          ? marketplaceItems[take - 1].id
          : undefined,
    });
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "Error creating theme in marketplace", success: false });
  }
}
