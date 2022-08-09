import { selector, selectorFamily } from "recoil";
import { colorModeState, userSettingState } from "./UserSettingsAtom";
import { useColorMode } from "@chakra-ui/react";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId } from "@/types";

export const redditFeedSelector = selectorFamily({
  key: "RedditFeed",
  get:
    (tileId: TileId) =>
    ({ get }) => {
      const settings = get(userSettingState);
      const colorMode = get(colorModeState);

      console.log("colorMode", colorMode);

      console.log(window);

      const currentTheme = getCurrentTheme(settings, colorMode);

      return currentTheme[tileId].subReddit;
    },
  set:
    (tileId: TileId) =>
    ({ get, set }, newValue) => {
      const userSettings = get(userSettingState);

      userSettings.themes.forEach(
        (theme) => (theme[tileId].subReddit = newValue as string)
      );
      set(userSettingState, userSettings);
    },
});
