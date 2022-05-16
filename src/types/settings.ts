import { TodoObject } from "./tiles";

export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  lightDefault?: string;
  darkDefault?: string;
  defaultSetting?: string;
  optionType: OptionType;
  tileId: TileId;
};

export type OptionType =
  | "ColorPicker"
  | "SubRedditPicker"
  | "MediumTileTypePicker"
  | "DropShadowInput"
  | "LargeTileTypePicker"
  | "SmallTileTypePicker"
  | "CityInput";

export type TileType =
  | "Reddit Feed"
  | "Hacker News Feed"
  | "Strava Graph"
  | "Search Bar"
  | "Bonsai"
  | "Weather"
  | "UV Graph"
  | "Theme Picker"
  | "Spotify"
  | "Time"
  | "Todo List"
  | "Large Spotify Tile"
  | "None";

export type Themes = "dark" | "light";

export type TileSettings = {
  subReddit?: string;
  twitterFeedURL?: string;
  stravaToken?: string;
  backgroundColor: string;
  textColor: string;
  tileType: TileType;
  dropShadow?: string;
  cityForWeather?: string;
  todoList?: TodoObject[];
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
};

export type UserSettings = {
  themes: ThemeSettings[];
};

export type SortedOption = {
  [key in TileId]: Option[];
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
  | "globalSettings";

export interface UserSettingsContextInterface {
  settings: UserSettings;
  setSettings: (value: UserSettings) => void;
  inMemorySettings: UserSettings;
  setInMemorySettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}
