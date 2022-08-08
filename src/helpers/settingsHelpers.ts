import {
  Option,
  ThemeSettings,
  TileId,
  TileSettings,
  UserSettings,
} from "@/types";
import { defaultSettings } from "@/helpers/themes";
import { setCookies } from "cookies-next";

export const applyTheme = (theme: ThemeSettings) => {
  document.body.style.background = theme.globalSettings.backgroundColor;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.documentElement.style.setProperty(
    "--bg-color-sidebar",
    theme.globalSettings.sidebarBackgroundColor || ""
  );
  document.documentElement.style.setProperty(
    "--text-color-sidebar",
    theme.globalSettings.textColor || ""
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile1",
    theme.tile1.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile1",
    theme.tile1.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile2",
    theme.tile2.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile3",
    theme.tile3.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile4",
    theme.tile4.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile5",
    theme.tile5.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile6",
    theme.tile6.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile7",
    theme.tile7.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile8",
    theme.tile8.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile9",
    theme.tile9.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile10",
    theme.tile10.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile11",
    theme.tile11.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile1",
    theme.tile1.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile2",
    theme.tile2.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile3",
    theme.tile3.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile4",
    theme.tile4.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile5",
    theme.tile5.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile6",
    theme.tile6.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile7",
    theme.tile7.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile8",
    theme.tile8.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile9",
    theme.tile9.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile10",
    theme.tile10.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile11",
    theme.tile11.textColor
  );
  setCookies("background", theme.globalSettings.backgroundColor, {
    maxAge: 34560000,
    sameSite: "strict",
    path: "/",
  });
};

export const sortOptionsIntoTileGroups = (
  options: Option[]
): Map<TileId, Option[]> => {
  const optionsInTileGroups: any = {};

  options.forEach((option) => {
    if (!option.tileId) {
      return;
    }
    if (!(option.tileId in optionsInTileGroups)) {
      optionsInTileGroups[option.tileId] = [option];
    } else {
      optionsInTileGroups[option.tileId] = [
        ...optionsInTileGroups[option.tileId],
        option,
      ];
    }
  });

  return optionsInTileGroups;
};

export const getThemeNames = (settings: UserSettings): string[] => {
  const themeNames: string[] = [];
  settings.themes.forEach((theme) => themeNames.push(theme.themeName));
  return themeNames;
};

export const getDefaultSettingForOption = (
  option: Option,
  currentThemeName: string
): string => {
  const defaultTheme = defaultSettings.themes.find(
    (theme) => theme.themeName === currentThemeName
  );

  if (!defaultTheme) {
    throw new Error("No theme named " + currentThemeName);
  }

  return defaultTheme[option.tileId][
    option.localStorageId as keyof TileSettings
  ] as string;
};

export const getCurrentTheme = (
  settings: UserSettings,
  colorMode: string
): ThemeSettings => {
  const theme = settings.themes.find((theme) => theme.themeName === colorMode);

  if (!theme) {
    throw new Error("No theme named " + colorMode);
  }

  return theme;
};
