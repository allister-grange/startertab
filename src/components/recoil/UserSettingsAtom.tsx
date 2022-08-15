import { defaultSettings } from "@/helpers/themes";
import { UserSettings } from "@/types";
import { ColorMode } from "@chakra-ui/react";
import { atom, AtomEffect } from "recoil";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
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

export const userSettingState = atom({
  key: "UserSettings",
  default: {} as UserSettings,
  effects: [localStorageEffect("user_settings")],
});

export const colorModeState = atom({
  key: "ColorMode",
  default: "dark" as ColorMode,
});
