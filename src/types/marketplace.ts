import { ThemeSettings } from "./settings";

export type CreateThemeRequest = {
  author?: string;
  name: string;
  data: ThemeSettings;
  tags: string[];
};
