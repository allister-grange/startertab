import { Prisma } from "@prisma/client";

export type CreateSuggestionRequest = {
  author: string;
  suggestion: string;
  tags: string[];
};

export type SuggestionsWithVotes = Prisma.SuggestionGetPayload<{
  include: {
    votes: true;
  };
}>;

export type SuggestionData = {
  suggestions: SuggestionsWithVotes[];
  nextId: number | undefined;
};
