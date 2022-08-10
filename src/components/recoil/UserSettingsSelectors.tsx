import { selectorFamily } from "recoil";
import {
  colorModeState,
  userSettingState,
} from "@/components/recoil/UserSettingsAtom";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettings } from "@/types";
import { Booking } from "@/components/tiles";

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
