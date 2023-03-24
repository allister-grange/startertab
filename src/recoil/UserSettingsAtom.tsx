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

const localStorageThemeNameEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    } else {
      localStorage.setItem(key, JSON.stringify("Colored Light"));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userSettingState = atom({
  key: "UserSettings",
  default: {} as UserSettings,
  effects: [localStorageUserSettingsEffect("user_settings")],
});

export const colorModeState = atom({
  key: "ColorMode",
  default: "uninitilized",
  effects: [localStorageThemeNameEffect("themeName")],
});

export const settingsSidebarSate = atom({
  key: "SidebarOpen",
  default: false,
});
