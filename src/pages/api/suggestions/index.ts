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
  const take = 100;
  const cursorObj =
    cursor === "" ? undefined : { id: parseInt(cursor as string, 10) };

  const orderBy = req.query.orderBy as ThemeFilteringOptions;

  const orderByArray = [
    ...(orderBy === "Popularity"
      ? [
          {
            votes: {
              _count: Prisma.SortOrder.desc,
            },
          },
        ]
      : []),
  ];

  try {
    const suggestions = await prisma.suggestion.findMany({
      take,
      skip: cursor !== "" ? 1 : 0,
      cursor: cursorObj,
      include: {
        votes: true,
      },
      orderBy: orderByArray,
    });

    return res.status(200).json({
      suggestions,
      nextId:
        suggestions.length === take ? suggestions[take - 1].id : undefined,
    });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({
      error: "Error pulling down suggestions: " + error,
      success: false,
    });
  }
}
