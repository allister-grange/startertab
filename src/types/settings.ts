export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  lightDefault?: string;
  darkDefault?: string;
  defaultSetting?: string;
  tileGroup?: TileGroup;
  type: OptionType;
};

export type OptionType = "ColorPicker" | "SubRedditPicker";

export type TileGroup =
  | "HackerNews Tile"
  | "Strava Tile"
  | "Bonsai Tile"
  | "Weather Tile"
  | "Spotify Tile"
  | "Wind Tile"
  | "Swimming Tile"
  | "Search Tile"
  | "Reddit Tile"
  | "Clock Tile"
  | "Theme Changer Tile"
  | "UV Tile";

export type Themes = "dark" | "light";

export type ThemeSettings = {
  themeName: string;
  backgroundColor: string;
  textColor: string;
  tile1BackgroundColor: string;
  tile2BackgroundColor: string;
  tile3BackgroundColor: string;
  tile4BackgroundColor: string;
  tile5BackgroundColor: string;
  tile6BackgroundColor: string;
  tile7BackgroundColor: string;
  tile8BackgroundColor: string;
  tile9BackgroundColor: string;
  tile10BackgroundColor: string;
  tile11BackgroundColor: string;
  tile12BackgroundColor: string;
  tile1TextColor: string;
  tile2TextColor: string;
  tile3TextColor: string;
  tile4TextColor: string;
  tile5TextColor: string;
  tile6TextColor: string;
  tile7TextColor: string;
  tile8TextColor: string;
  tile9TextColor: string;
  tile10TextColor: string;
  tile11TextColor: string;
  tile12TextColor: string;
};

export type UserSettings = {
  themes: ThemeSettings[];
  subReddit?: string;
};

export type SortedOption = {
  [key in TileGroup]: Option[];
};
