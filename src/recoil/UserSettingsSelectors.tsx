import { selectorFamily } from "recoil";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtom";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  TileId,
  TodoObject,
  UserSettings,
  Booking,
  FavoriteLink,
  RSSFeed,
} from "@/types";

export const redditFeedSelector = selectorFamily({
  key: "RedditFeed",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].subReddit;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].subReddit = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const hackerNewsFeedSelector = selectorFamily({
  key: "HackerNewsFeed",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].hackerNewsFeedType;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].hackerNewsFeedType = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const cityForWeatherSelector = selectorFamily({
  key: "CityForWeather",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].cityForWeather;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].cityForWeather = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const tempDisplayInCelsiusSelector = selectorFamily({
  key: "CityForWeather",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].tempDisplayInCelsius;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].tempDisplayInCelsius = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const bookingsSelector = selectorFamily({
  key: "Bookings",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].bookings;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].bookings = newValue as Booking[])
      );
      set(userSettingState, userSettings);
    },
});

export const stockSelector = selectorFamily({
  key: "Stock",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].stockName;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].stockName = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const bonsaiTrunkColorSelector = selectorFamily({
  key: "BonsaiTrunkColor",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].bonsaiTrunkColor;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].bonsaiTrunkColor = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const bonsaiBaseColorSelector = selectorFamily({
  key: "BonsaiBaseColor",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].bonsaiBaseColor;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].bonsaiBaseColor = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const uvCitySelector = selectorFamily({
  key: "UvCity",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].cityForUv;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].cityForUv = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const todoListSelector = selectorFamily({
  key: "TodoList",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].todoList;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].todoList = newValue as TodoObject[])
      );
      set(userSettingState, userSettings);
    },
});

export const spotifyTopArtistTimeLengthSelector = selectorFamily({
  key: "SpotifyTopArtistTimeLength",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].spotifyArtistSearchTimeLength;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) =>
          (theme[tileId].spotifyArtistSearchTimeLength = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const markdownFileTextSelector = selectorFamily({
  key: "MarkdownFileText",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].markdownFileText;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].markdownFileText = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});

export const favoriteLinksSelector = selectorFamily({
  key: "FavoriteLinks",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].favoriteLinks;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].favoriteLinks = newValue as FavoriteLink[])
      );
      set(userSettingState, userSettings);
    },
});

export const rssFeedsSelector = selectorFamily({
  key: "RSSFeeds",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);
      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].rssFeeds;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      userSettings.themes.forEach(
        (theme) => (theme[tileId].rssFeeds = newValue as RSSFeed[])
      );
      set(userSettingState, userSettings);
    },
});
