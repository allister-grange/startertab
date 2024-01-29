import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { CreateSuggestionRequest } from "@/types/suggestions";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false });
  }

  const body = (await JSON.parse(req.body)) as CreateSuggestionRequest;

  if (!body.author || !body.tags || !body.suggestion) {
    return res.status(400).json("Missing an author, suggestion or tags");
  }

  if (body.suggestion.length > 190 || body.author.length! > 15) {
    return res.status(400).json("A field length is too long");
  }
  if (body.tags.join(",").length > 30) {
    return res.status(400).json("The length of your tags is too long");
  }

  try {
    const prismaSuggestion = await prisma.suggestion.create({
      data: {
        suggestion: body.suggestion,
        author: body.author,
        tags: body.tags.join(","),
        completed: body.completed,
      },
    });
    return res.status(201).json(prismaSuggestion);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "Error creating suggestion", success: false });
  }
}
