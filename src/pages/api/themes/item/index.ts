import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/helpers/prisma";
import { ThemeFilteringOptions } from "@/types";
import { Prisma } from "@prisma/client";

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

  let searchTerm = req.query.searchTerm as string | undefined;
  const orderBy = req.query.orderBy as ThemeFilteringOptions;
  const isReversed = req.query.reverseOrdering === "true";

  const orderByArray = [
    ...(orderBy === "Popularity"
      ? [
          {
            votes: {
              _count: isReversed ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
            },
          },
        ]
      : []),
    ...(orderBy === "Created on"
      ? [
          {
            createdAt: isReversed
              ? Prisma.SortOrder.asc
              : Prisma.SortOrder.desc,
          },
        ]
      : []),
    ...(orderBy === "Author"
      ? [
          {
            author: isReversed ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
          },
        ]
      : []),
    ...(orderBy === "Name"
      ? [
          {
            name: isReversed ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
          },
        ]
      : []),
  ];

  try {
    let themes;

    // due to Prisma evaluating OR with 0 filters as an empty list
    // I need the conditional
    if (
      searchTerm !== "undefined" &&
      typeof searchTerm === "string" &&
      searchTerm.length > 0
    ) {
      themes = await prisma.theme.findMany({
        take,
        skip: cursor !== "" ? 1 : 0,
        cursor: cursorObj,
        include: {
          votes: true,
        },
        orderBy: orderByArray,
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
      themes = await prisma.theme.findMany({
        take,
        skip: cursor !== "" ? 1 : 0,
        cursor: cursorObj,
        include: {
          votes: true,
        },
        orderBy: orderByArray,
      });
    }

    return res.status(200).json({
      themes,
      nextId: themes.length === take ? themes[take - 1].id : undefined,
    });
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "Error pulling down themes: " + error, success: false });
  }
}
