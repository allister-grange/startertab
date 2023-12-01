import { defaultGridLayout } from "@/helpers/gridLayout";
import { deepClone } from "@/helpers/tileHelpers";
import { ThemeSettings, TileSettings, TileSize, UserSettings } from "@/types";
import { setCookie } from "cookies-next";

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
    if (theme.globalSettings.globalTileBackgroundColor) {
      document.documentElement.style.setProperty(
        `--bg-color-${tileId}`,
        theme.globalSettings.globalTileBackgroundColor
      );
    } else {
      document.documentElement.style.setProperty(
        `--bg-color-${tileId}`,
        theme.tiles[tileId].backgroundColor
      );
    }
    if (theme.globalSettings.globalTileTextColor) {
      document.documentElement.style.setProperty(
        `--text-color-${tileId}`,
        theme.globalSettings.globalTileTextColor
      );
    } else {
      document.documentElement.style.setProperty(
        `--text-color-${tileId}`,
        theme.tiles[tileId].textColor
      );
    }
  }
  setCookie("background", theme.globalSettings.backgroundColor, {
    maxAge: 34560000,
    sameSite: "none",
    path: "/",
    secure: true,
  });
  setCookie("currentTheme", theme.themeName, {
    maxAge: 34560000,
    sameSite: "none",
    path: "/",
    secure: true,
  });
};

export const getThemeNames = (settings: UserSettings): string[] => {
  const themeNames = [];
  for (const theme of settings.themes) {
    themeNames.push(theme.themeName);
  }
  return themeNames.sort();
};

const getTileSizeFromTileId = (tileId: string) => {
  if (tileId === "tile1") {
    return "medium";
  }
  if (tileId === "tile2") {
    return "large";
  }
  if (tileId === "tile3") {
    return "medium";
  }
  if (tileId === "tile4") {
    return "medium";
  }
  if (tileId === "tile5") {
    return "long";
  }
  if (tileId === "tile6") {
    return "medium";
  }
  if (tileId === "tile7") {
    return "small";
  }
  if (tileId === "tile8") {
    return "small";
  }
  if (tileId === "tile9") {
    return "large";
  }
  if (tileId === "tile10") {
    return "small";
  }
  if (tileId === "tile11") {
    return "small";
  }
};

/** backwards compatibility for the old settings formatting */
export const getNewSettingsFromLegacyTheme = (settings: UserSettings) => {
  const newSettings = deepClone(settings);

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
      const tileSize = getTileSizeFromTileId(key);

      newTileArray.push({
        ...(value as TileSettings),
        tileId: newTileId,
        tileSize,
      } as TileSettings);

      delete themeToLookAt[key];
    }
    const themeToChange = newSettings.themes[theme];
    themeToChange.tiles = newTileArray;
    themeToChange.tileLayout = defaultGridLayout;
  }
  return newSettings;
};

export const findNewTileId = (tileSettings: TileSettings[]): number => {
  const tileIds = new Set(tileSettings.map((settings) => settings.tileId));

  let newTileId = 0;

  while (tileIds.has(newTileId)) {
    newTileId++;
  }

  return newTileId;
};

export const createNewTile = (
  currentTheme: ThemeSettings,
  size: TileSize
): TileSettings => {
  const newTileId = findNewTileId(currentTheme.tiles);

  const newTile: TileSettings = {
    tileId: newTileId,
    tileType: "None",
    tileSize: size,
    backgroundColor: currentTheme.tiles[0]
      ? currentTheme.tiles[0].backgroundColor
      : "white",
    textColor: currentTheme.tiles[0]
      ? currentTheme.tiles[0].textColor
      : "black",
  };

  return newTile;
};

export const getTileLayoutForNewTile = (size: TileSize) => {
  let width = 1,
    height = 1,
    minH = 1,
    minW = 1;

  if (size === "small") {
    width = 1;
    height = 2;
    minH = 2;
    minW = 1;
  } else if (size === "medium") {
    width = 1;
    height = 4;
    minH = 3;
    minW = 1;
  } else if (size === "large") {
    width = 2;
    height = 4;
    minH = 4;
    minW = 2;
  } else if (size === "long") {
    width = 3;
    height = 1;
    minH = 1;
    minW = 2;
  }

  return { width, height, minH, minW };
};

export const getCookieValue = (cookies: string, name: string) =>
  cookies.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
