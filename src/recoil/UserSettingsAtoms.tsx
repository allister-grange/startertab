import { defaultSettings } from "@/helpers/themes";
import { UserSettings } from "@/types";
import { atom, AtomEffect } from "recoil";

const localStorageUserSettingsEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultSettings));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const localStoragePreviousSystemThemePreferenceEffect: (
  key: string
) => AtomEffect<string> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const prefersDarkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(savedValue);
    } else {
      localStorage.setItem(key, prefersDarkTheme ? "dark" : "light");
    }

    onSet((newValue) => {
      localStorage.setItem(key, newValue);
    });
  };

export const userSettingState = atom({
  key: "UserSettings",
  default: {} as UserSettings,
  effects: [localStorageUserSettingsEffect("user_settings")],
});

export const previousSystemThemePreferenceState = atom({
  key: "PreviousSystemThemePreference",
  default: "uninitilized",
  effects: [
    localStoragePreviousSystemThemePreferenceEffect(
      "previousSystemThemePreference"
    ),
  ],
});
