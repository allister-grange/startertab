import {
  Option,
  ThemeSettings,
  TileSettingsKey,
  TileSettings,
  UserSettings,
} from "@/types";
import { setCookies } from "cookies-next";
import { deepClone } from "@/helpers/tileHelpers";
import { defaultGridLayout } from "@/helpers/gridLayout";

export const applyTheme = (theme: ThemeSettings) => {
  document.body.style.background = theme.globalSettings.backgroundColor;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  document.documentElement.style.setProperty(
    "--bg-color-sidebar",
    theme.globalSettings.sidebarBackgroundColor || ""
  );
  document.documentElement.style.setProperty(
    "--text-color-sidebar",
    theme.globalSettings.textColor || ""
  );
  for (const tileId in theme.tiles) {
    document.documentElement.style.setProperty(
      `--bg-color-${tileId}`,
      theme.tiles[tileId].backgroundColor
    );
    document.documentElement.style.setProperty(
      `--text-color-${tileId}`,
      theme.tiles[tileId].textColor
    );
  }
  setCookies("background", theme.globalSettings.backgroundColor, {
    maxAge: 34560000,
    sameSite: "strict",
    path: "/",
  });
};

export const getThemeNames = (settings: UserSettings): string[] => {
  const themeNames: string[] = [];
  settings.themes.forEach((theme) => themeNames.push(theme.themeName));
  return themeNames;
};

export const getCurrentTheme = (
  settings: UserSettings,
  colorMode: string
): ThemeSettings => {
  let theme = settings.themes.find((theme) => theme.themeName === colorMode);

  if (!theme) {
    theme = settings.themes[0];
  }

  return theme;
};

/** backwards compatibility for the old settings formatting */
export const getNewSettingsFromLegacyTheme = (
  settings: UserSettings,
  colorMode: string
) => {
  let theme = settings.themes.find((theme) => theme.themeName === colorMode);
  const themeToCheck = theme as any;
  if (themeToCheck.tile1) {
    const newSettings = deepClone(settings) as any;

    // take each Tile from (1-11) and push them into tiles object, then delete the old reference
    for (const theme in newSettings.themes) {
      const themeToLookAt = newSettings.themes[theme] as any;
      const newTileArray: TileSettings[] = [];

      for (const [key, value] of Object.entries(themeToLookAt)) {
        if (
          key === "globalSettings" ||
          key === "themeName" ||
          key === "downloadedFromMarketplace" ||
          key === "tiles" ||
          key === "tileOrder" ||
          key === "tileLayout"
        ) {
          continue;
        }

        // should only be Tile1, Tile2 object etc once you're here
        const newTileId = parseInt(key.split("tile")[1]) - 1;
        newTileArray.push({
          ...(value as TileSettings),
          tileId: newTileId,
        } as TileSettings);

        delete themeToLookAt[key];
      }
      const themeToChange = newSettings.themes[theme];
      themeToChange.tiles = newTileArray;
      themeToChange.tileLayout = defaultGridLayout;
    }
    return newSettings;
  }
};

export const findNewTileId = (tileSettings: TileSettings[]): number => {
  const tileIds = new Set(tileSettings.map((settings) => settings.tileId));

  let newTileId = 0;

  while (tileIds.has(newTileId)) {
    newTileId++;
  }

  return newTileId;
};
