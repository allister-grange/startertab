import { Booking, FavoriteLink, RSSFeed, TodoObject } from "@/types/tiles";
import { Layouts } from "react-grid-layout";

export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  optionType: OptionType;
};

export type OptionType =
  | "ColorPicker"
  | "SubRedditPicker"
  | "MediumTileTypePicker"
  | "DropShadowInput"
  | "LargeTileTypePicker"
  | "SmallTileTypePicker"
  | "LongTileTypePicker"
  | "BorderRadiusInput"
  | "BorderSelect"
  | "SmallStockInput"
  | "GridGapInput"
  | "RandomizeColors"
  | "LargeStockTile"
  | "CityInputForWeather"
  | "HackerNewsFeedType"
  | "SpotifyTopArtistsTimeLength"
  | "CityInputForUV";

export const TileTypes = [
  "Reddit Feed",
  "Hacker News Feed",
  "Strava Graph",
  "Search Bar",
  "Bonsai",
  "Small Weather Tile",
  "Large Weather Tile",
  "UV Graph",
  "Day Planner",
  "Theme Picker",
  "Small Spotify Tile",
  "Time",
  "Twitter Feed Tile",
  "Markdown File Tile",
  "Todo List",
  "Large Spotify Tile",
  "Small Stock Tile",
  "Large Stock Tile",
  "Spotify Top Artist Tile",
  "Blank Tile",
  "Favorite Links Tile",
  "RSS Feed Tile",
  "None",
] as const;

export type TileType = typeof TileTypes[number];

export type TileSettingsKey = keyof TileSettings;

export type TileSize = "small" | "large" | "medium" | "long";

export type TileSettings = {
  tileId: number;
  textColor: string;
  backgroundColor: string;
  tileType: TileType;
  tileSize: TileSize;
  themePickerBubbleColor?: string;
  sidebarBackgroundColor?: string;
  sidebarBorderColor?: string;
  subTextColor?: string;
  subReddit?: string;
  twitterFeedURL?: string;
  stravaToken?: string;
  dropShadow?: string;
  cityForWeather?: string;
  cityForUv?: string;
  todoList?: TodoObject[];
  tileBorder?: string;
  stockName?: string;
  bonsaiBaseColor?: string;
  bonsaiTrunkColor?: string;
  borderRadius?: string;
  borderColor?: string;
  gridGap?: string;
  tempDisplayInCelsius?: string;
  hackerNewsFeedType?: string;
  spotifyArtistSearchTimeLength?: string;
  bookings?: Booking[];
  markdownFileText?: string;
  favoriteLinks?: FavoriteLink[];
  rssFeeds?: RSSFeed[];
};

export type ThemeSettings = {
  themeName: string;
  downloadedFromMarketplace: boolean;
  globalSettings: TileSettings;
  tileLayout: Layouts;
  tiles: TileSettings[];
};

export type UserSettings = {
  themes: ThemeSettings[];
};
