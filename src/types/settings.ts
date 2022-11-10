import { TodoObject, Booking, FavoriteLink, RSSFeed } from "@/types/tiles";

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
  | "LongTileTypePicker"
  | "BorderRadiusInput"
  | "BorderSelect"
  | "SmallStockInput"
  | "GridGapInput"
  | "ResetColorsAndRandomize"
  | "LargeStockTile"
  | "CityInputForWeather"
  | "HackerNewsFeedType"
  | "SpotifyTopArtistsTimeLength"
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
  | "Day Planner"
  | "Theme Picker"
  | "Small Spotify Tile"
  | "Time"
  | "Twitter Feed Tile"
  | "Markdown File Tile"
  | "Todo List"
  | "Large Spotify Tile"
  | "Small Stock Tile"
  | "Large Stock Tile"
  | "Spotify Top Artist Tile"
  | "Blank Tile"
  | "Favorite Links Tile"
  | "RSS Feed Tile"
  | "None";

export type TileSettings = {
  textColor: string;
  backgroundColor: string;
  tileType: TileType;
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
