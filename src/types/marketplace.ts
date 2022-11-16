import { Prisma } from "@prisma/client";
import { ThemeSettings } from "./settings";

export type CreateThemeRequest = {
  author: string;
  name: string;
  data: ThemeSettings;
  tags: string[];
};

export type ThemeWithVotes = Prisma.ThemeGetPayload<{
  include: {
    votes: true;
  };
}>;

export type ThemeDataFromAPI = {
  themes: ThemeWithVotes[];
  nextId: number | undefined;
};
