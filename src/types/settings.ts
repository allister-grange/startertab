export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  lightDefault?: string;
  darkDefault?: string;
  defaultSetting?: string;
  tileGroup?: TileGroup;
  optionType: OptionType;
  tileId: TileId;
};

export type OptionType = "ColorPicker" | "SubRedditPicker" | "TypePicker";

export type TileType = "Reddit Feed" | "Hacker News Feed" | "None";

export type TileGroup =
  | "Tile 1"
  | "Tile 2"
  | "Tile 3"
  | "Tile 4"
  | "Tile 5"
  | "Tile 6"
  | "Tile 7"
  | "Tile 8"
  | "Tile 9"
  | "Tile 10"
  | "Tile 11"
  | "Tile 12";

export type Themes = "dark" | "light";

export type TileSettings = {
  subReddit?: string;
  twitterFeedURL?: string;
  stravaToken?: string;
  backgroundColor: string;
  textColor: string;
  tileType: TileType;
};

export type ThemeSettings = {
  themeName: string;
  globalSettings: TileSettings;
  tile1: TileSettings;
  tile2: TileSettings;
  tile3: TileSettings;
  tile4: TileSettings;
  tile5: TileSettings;
  tile6: TileSettings;
  tile7: TileSettings;
  tile8: TileSettings;
  tile9: TileSettings;
  tile10: TileSettings;
  tile11: TileSettings;
  tile12: TileSettings;
};

export type UserSettings = {
  themes: ThemeSettings[];
};

export type SortedOption = {
  [key in TileGroup]: Option[];
};

export type TileId =
  | "tile1"
  | "tile2"
  | "tile3"
  | "tile4"
  | "tile5"
  | "tile6"
  | "tile7"
  | "tile8"
  | "tile9"
  | "tile10"
  | "tile11"
  | "tile12"
  | "globalSettings";

export interface UserSettingsContextInterface {
  settings: UserSettings;
  setSettings: (value: UserSettings) => void;
  inMemorySettings: UserSettings;
  setInMemorySettings: (React.Dispatch<React.SetStateAction<UserSettings>>)
}
