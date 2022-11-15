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

  try {
    const body = (await JSON.parse(req.body)) as CreateThemeRequest;
    if (body.name.length > 20 || body.author?.length! > 15) {
      return res.status(400).json("A field length is too long");
    }
    if (body.tags.join(",").length > 30) {
      return res.status(400).json("The length of your tags is too long");
    }

    const marketplaceTheme = await prisma.theme.create({
      data: {
        name: body.name,
        author: body.author,
        data: body.data as unknown as Prisma.JsonObject,
        tags: body.tags.join(","),
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
