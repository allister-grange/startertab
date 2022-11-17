import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/helpers/prisma";

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

  const searchTerm = req.query.searchTerm;

  try {
    let marketplaceItems;
    if (
      searchTerm !== "undefined" &&
      typeof searchTerm === "string" &&
      searchTerm.length > 0
    ) {
      marketplaceItems = await prisma.theme.findMany({
        take,
        skip: cursor !== "" ? 1 : 0,
        cursor: cursorObj,
        include: {
          votes: true,
        },
        where: {
          OR: [
            {
              name: {
                contains: searchTerm ? searchTerm : undefined,
              },
            },
            {
              author: {
                contains: searchTerm ? searchTerm : undefined,
              },
            },
            {
              tags: {
                contains: searchTerm ? searchTerm : undefined,
              },
            },
          ],
        },
      });
    } else {
      marketplaceItems = await prisma.theme.findMany({
        take,
        skip: cursor !== "" ? 1 : 0,
        cursor: cursorObj,
        include: {
          votes: true,
        },
      });
    }

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
