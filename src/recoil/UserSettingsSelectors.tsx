import { applyTheme } from "@/helpers/settingsHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import {
  Booking,
  FavoriteLink,
  RSSFeed,
  ThemeSettings,
  TodoObject,
  UserSettings,
} from "@/types";
import { selector, selectorFamily } from "recoil";

export const redditFeedSelector = selectorFamily({
  key: "RedditFeed",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].subReddit;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].subReddit = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const subRedditSortTypeSelector = selectorFamily({
  key: "SubRedditSortType",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].subRedditSortType;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].subRedditSortType = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const hackerNewsFeedSelector = selectorFamily({
  key: "HackerNewsFeed",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].hackerNewsFeedType;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].hackerNewsFeedType = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const cityForWeatherSelector = selectorFamily({
  key: "CityForWeather",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].cityForWeather;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].cityForWeather = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const tempDisplayInCelsiusSelector = selectorFamily({
  key: "CityForWeather",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].tempDisplayInCelsius;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].tempDisplayInCelsius = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const isTimerTile12HourSelector = selectorFamily({
  key: "isTimerTile12Hour",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].isTimerTile12Hour;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].isTimerTile12Hour = newValue as boolean;
      }
      set(userSettingState, userSettings);
    },
});

export const bookingsSelector = selectorFamily({
  key: "Bookings",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].bookings;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].bookings = newValue as Booking[];
      }
      set(userSettingState, userSettings);
    },
});

export const stockSelector = selectorFamily({
  key: "Stock",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].stockName;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].stockName = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const graphStockSelector = selectorFamily({
  key: "GraphStock",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].graphStock;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].graphStock = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const bonsaiTrunkColorSelector = selectorFamily({
  key: "BonsaiTrunkColor",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].bonsaiTrunkColor;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].bonsaiTrunkColor = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const bonsaiBaseColorSelector = selectorFamily({
  key: "BonsaiBaseColor",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].bonsaiBaseColor;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].bonsaiBaseColor = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const uvCitySelector = selectorFamily({
  key: "UvCity",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].cityForUv;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].cityForUv = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const todoListSelector = selectorFamily({
  key: "TodoList",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].todoList;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].todoList = newValue as TodoObject[];
      }
      set(userSettingState, userSettings);
    },
});

export const spotifyTopArtistTimeLengthSelector = selectorFamily({
  key: "SpotifyTopArtistTimeLength",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].spotifyArtistSearchTimeLength;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].spotifyArtistSearchTimeLength = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const spotifyMediaControlsShowingSelector = selectorFamily({
  key: "SpotifyMediaControlsShowing",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].spotifyMediaControlsShowing;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].spotifyMediaControlsShowing = newValue as boolean;
      }
      set(userSettingState, userSettings);
    },
});

export const markdownFileTextSelector = selectorFamily({
  key: "MarkdownFileText",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].markdownFileText;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].markdownFileText = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const favoriteLinksSelector = selectorFamily({
  key: "FavoriteLinks",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].favoriteLinks;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].favoriteLinks = newValue as FavoriteLink[];
      }
      set(userSettingState, userSettings);
    },
});

export const favoriteLinksTitleSelector = selectorFamily({
  key: "FavoriteLinksTitle",
  get:
    (tileId: number) =>
    ({ get }) => {
      // TODO delete all these
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].favoriteLinksTitle;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].favoriteLinksTitle = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const rssFeedsSelector = selectorFamily({
  key: "RSSFeeds",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].rssFeeds;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].rssFeeds = newValue as RSSFeed[];
      }
      set(userSettingState, userSettings);
    },
});

export const rssFeedTitleSelector = selectorFamily({
  key: "RSSFeedTitle",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].rssFeedTitle;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].rssFeedTitle = newValue as string;
      }
      set(userSettingState, userSettings);
    },
});

export const subRedditOffsetSelector = selectorFamily({
  key: "SubRedditOffset",
  get:
    (tileId: number) =>
    ({ get }) => {
      const currentTheme = get(themeSelector);
      return currentTheme.tiles[tileId].subRedditOffset;
    },
  set:
    (tileId: number) =>
    ({ get, set }, newValue) => {
      const userSettings = JSON.parse(
        JSON.stringify(get(userSettingState))
      ) as UserSettings;

      for (const theme of userSettings.themes) {
        if (!theme.tiles[tileId]) {
          continue;
        }
        theme.tiles[tileId].subRedditOffset = newValue as number;
      }
      set(userSettingState, userSettings);
    },
});

export const themeSelector = selector<ThemeSettings>({
  key: "themeSelector",
  get: ({ get }) => {
    const userSettings = get(userSettingState);

    // will only be populated if the user doesn't have userSettings.systemThemeSettings in their storage
    let themeNameFromStorage = "";

    // need to have a check if someone still has legacy settings with no systemThemeSettings object
    if (!userSettings.systemThemeSettings) {
      themeNameFromStorage = window.localStorage
        .getItem("themeName")
        ?.replaceAll('"', "")!;
    }

    return userSettings.themes.find(
      (theme) =>
        theme.themeName ===
        (themeNameFromStorage !== ""
          ? themeNameFromStorage
          : userSettings.systemThemeSettings.currentThemeName)
    )!;
  },
});

export const themeNameSelector = selector<string>({
  key: "themeNameSelector",
  get: ({ get }) => {
    const userSettings = get(userSettingState);

    // will only be populated if the user doesn't have userSettings.systemThemeSettings in their storage
    let themeNameFromStorage;
    if (!userSettings.systemThemeSettings) {
      themeNameFromStorage = window.localStorage
        .getItem("themeName")
        ?.replaceAll('"', "")!;
    }

    return themeNameFromStorage
      ? themeNameFromStorage
      : userSettings.systemThemeSettings.currentThemeName;
  },
  set: ({ get, set }, newThemeName) => {
    const userSettings = get(userSettingState);

    // Update the themeName with the new value
    const updatedSystemThemeSettings = {
      ...userSettings.systemThemeSettings,
      currentThemeName: newThemeName,
    };

    const updatedSettings = {
      ...userSettings,
      systemThemeSettings: updatedSystemThemeSettings,
    } as UserSettings;

    applyTheme(
      updatedSettings.themes.find((theme) => theme.themeName === newThemeName)!
    );

    set(userSettingState, updatedSettings);
  },
});
