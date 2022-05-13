import { Option, ThemeSettings, TileId, UserSettings } from "@/types";

export const applyTheme = (theme: ThemeSettings) => {
  document.body.style.backgroundColor = theme.globalSettings.backgroundColor;
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
};

export const sideBarOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Controls the theme background color of the main page",
    localStorageId: "backgroundColor",
    lightDefault: "#ffffff",
    darkDefault: "#1B202B",
    optionType: "ColorPicker",
    tileId: "globalSettings",
  },
  {
    title: "Drop shadow",
    subTitle: "Controls the drop shadow of all the tiles",
    localStorageId: "dropShadow",
    lightDefault: "",
    darkDefault: "",
    optionType: "DropShadowInput",
    tileId: "globalSettings",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    optionType: "ColorPicker",
    tileId: "tile1",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile1",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    optionType: "SubRedditPicker",
    tileId: "tile1",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    defaultSetting: "Hacker News Feed",
    optionType: "TypePicker",
    tileId: "tile1",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    optionType: "ColorPicker",
    tileId: "tile2",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile2",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    optionType: "ColorPicker",
    tileId: "tile3",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile3",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    optionType: "SubRedditPicker",
    tileId: "tile3",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    defaultSetting: "None",
    optionType: "TypePicker",
    tileId: "tile3",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    optionType: "ColorPicker",
    tileId: "tile4",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile4",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    optionType: "SubRedditPicker",
    tileId: "tile4",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    defaultSetting: "Reddit Feed",
    optionType: "TypePicker",
    tileId: "tile4",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#F06808",
    darkDefault: "#F06808",
    optionType: "ColorPicker",
    tileId: "tile5",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile5",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    optionType: "ColorPicker",
    tileId: "tile6",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile6",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    optionType: "ColorPicker",
    tileId: "tile7",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile7",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    optionType: "ColorPicker",
    tileId: "tile8",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile8",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    optionType: "ColorPicker",
    tileId: "tile9",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile9",
  },
  {
    title: "Tile Type",
    subTitle: "Type of tile you want to display",
    localStorageId: "tileType",
    defaultSetting: "Large Spotify Tile",
    optionType: "LargeTileTypePicker",
    tileId: "tile9",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    optionType: "ColorPicker",
    tileId: "tile10",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile10",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    optionType: "ColorPicker",
    tileId: "tile11",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    optionType: "ColorPicker",
    tileId: "tile11",
  },
];

export const defaultSettings: UserSettings = {
  themes: [
    {
      themeName: "dark",
      globalSettings: {
        backgroundColor: "#1B202B",
        textColor: "#222222",
        tileType: "None",
        dropShadow: "",
      },
      tile1: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "Hacker News Feed",
      },
      tile2: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "Strava Graph",
      },
      tile3: {
        backgroundColor: "#9AB899",
        textColor: "#222222",
        tileType: "None",
      },
      tile4: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "Reddit Feed",
      },
      tile5: {
        backgroundColor: "#F06808",
        textColor: "#222222",
        tileType: "Search Bar",
      },
      tile6: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "Bonsai",
      },
      tile7: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "Weather",
      },
      tile8: {
        backgroundColor: "#9AB899",
        textColor: "#222222",
        tileType: "None",
      },
      tile9: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "Large Spotify Tile",
      },
      tile10: {
        backgroundColor: "#9AB899",
        textColor: "#222222",
        tileType: "Time",
      },
      tile11: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "Theme Picker",
      }
    },
    {
      themeName: "light",
      globalSettings: {
        backgroundColor: "#ffffff",
        textColor: "#ffffff",
        tileType: "None",
        dropShadow: "",
      },
      tile1: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "Hacker News Feed",
      },
      tile2: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "Strava Graph",
      },
      tile3: {
        backgroundColor: "#9AB899",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile4: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "Reddit Feed",
      },
      tile5: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "Search Bar",
      },
      tile6: {
        backgroundColor: "#F06808",
        textColor: "#ffffff",
        tileType: "Bonsai",
      },
      tile7: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "Weather",
      },
      tile8: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile9: {
        backgroundColor: "#9AB899",
        textColor: "#ffffff",
        tileType: "Large Spotify Tile",
      },
      tile10: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "Time",
      },
      tile11: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "Theme Picker",
      }
    },
  ],
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

export const getDefaultSettingForOption = (
  option: Option,
  currentThemeName: string
): string => {
  let defaultSetting =
    currentThemeName === "dark" ? option.darkDefault : option.lightDefault;

  // if there's no light/dark default there should be a regular default settings
  if (!defaultSetting) {
    defaultSetting = option.defaultSetting;
  }

  return defaultSetting ? defaultSetting : "";
};

export const getCurrentTheme = (
  settings: UserSettings,
  colorMode: string
): ThemeSettings => {
  const theme = settings.themes.find((theme) => theme.themeName === colorMode);
  if (!theme) {
    throw new Error("No change named " + colorMode);
  }

  return theme;
};
