import { TodoObject } from "./tiles";

export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
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
  | "BorderRadiusInput"
  | "BorderSelect"
  | "SmallStockInput"
  | "GridGapInput"
  | "LargeStockTile"
  | "CityInputForWeather"
  | "CityInputForUV";

export type TileType =
  | "Reddit Feed"
  | "Hacker News Feed"
  | "Strava Graph"
  | "Search Bar"
  | "Bonsai"
  | "Small Weather Tile"
  | "Large Weather Tile"
  | "UV Graph"
  | "Theme Picker"
  | "Small Spotify Tile"
  | "Time"
  | "Todo List"
  | "Large Spotify Tile"
  | "Small Stock Tile"
  | "Large Stock Tile"
  | "None";

// export type Themes = "dark" | "light";

export type TileSettings = {
  subReddit?: string;
  twitterFeedURL?: string;
  stravaToken?: string;
  backgroundColor: string;
  textColor: string;
  tileType: TileType;
  dropShadow?: string;
  cityForWeather?: string;
  cityForUv?: string;
  todoList?: TodoObject[];
  tileBorder?: string;
  stockName?: string;
  subTextColor?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  bonsaiBaseColor?: string;
  bonsaiTrunkColor?: string;
  borderRadius?: string;
  borderColor?: string;
  gridGap?: string;
  tempDisplayInCelsius?: string;
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
