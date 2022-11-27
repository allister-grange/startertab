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

  if (!req.query.themeId) {
    return res
      .status(400)
      .json({ message: "Missing themeId from download statistics" });
  }

  const themeId = parseInt(req.query.themeId as string) as number;

  try {
    // if it doesn't exist, create it
    const currentDownloads = await prisma.themeDownload.findFirst({
      where: {
        themeId: {
          equals: themeId,
        },
      },
    });

    let downloadsRes;
    if (!currentDownloads) {
      downloadsRes = await prisma.themeDownload.create({
        data: {
          themeId: themeId,
          downloads: 1,
        },
      });
    } else {
      const newDownloadsNumber = currentDownloads.downloads + 1;
      downloadsRes = await prisma.themeDownload.update({
        where: {
          themeId,
        },
        data: {
          downloads: newDownloadsNumber,
        },
      });
    }

    return res.status(201).json(downloadsRes);
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "Error creating theme in marketplace", success: false });
  }
}
