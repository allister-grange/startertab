import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  ThemeSettings,
  TileId,
  TileSettings,
  UserSettings,
  UserSettingsContextInterface,
} from "@/types";
import { useColorMode } from "@chakra-ui/react";
import { clone } from "lodash";
import cloneDeep from "lodash.clonedeep";
import * as React from "react";
import { atom, AtomEffect, DefaultValue } from "recoil";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      console.log("newValue", newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userSettingState = atom({
  key: "UserSettings",
  default: {} as UserSettings,
  effects: [localStorageEffect("recoil_settings")],
});
