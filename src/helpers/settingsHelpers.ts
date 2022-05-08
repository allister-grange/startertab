import { Option, ThemeSettings, TileGroup, UserSettings } from "@/types";

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
    "--bg-color-tile12",
    theme.tile12.backgroundColor
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
  document.documentElement.style.setProperty(
    "--text-color-tile12",
    theme.tile12.textColor
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
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Tile 1",
    optionType: "ColorPicker",
    tileId: "tile1",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 1",
    optionType: "ColorPicker",
    tileId: "tile1",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    tileGroup: "Tile 1",
    optionType: "SubRedditPicker",
    tileId: "tile1",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    defaultSetting: "Hacker News Feed",
    tileGroup: "Tile 1",
    optionType: "TypePicker",
    tileId: "tile1",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Tile 2",
    optionType: "ColorPicker",
    tileId: "tile2",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 2",
    optionType: "ColorPicker",
    tileId: "tile2",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Tile 3",
    optionType: "ColorPicker",
    tileId: "tile3",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 3",
    optionType: "ColorPicker",
    tileId: "tile3",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    tileGroup: "Tile 3",
    optionType: "SubRedditPicker",
    tileId: "tile3",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    defaultSetting: "None",
    tileGroup: "Tile 3",
    optionType: "TypePicker",
    tileId: "tile3",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Tile 4",
    optionType: "ColorPicker",
    tileId: "tile5",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 4",
    optionType: "ColorPicker",
    tileId: "tile5",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    tileGroup: "Tile 4",
    optionType: "SubRedditPicker",
    tileId: "tile5",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    defaultSetting: "Reddit Feed",
    tileGroup: "Tile 4",
    optionType: "TypePicker",
    tileId: "tile5",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#F06808",
    darkDefault: "#F06808",
    tileGroup: "Tile 5",
    optionType: "ColorPicker",
    tileId: "tile6",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 5",
    optionType: "ColorPicker",
    tileId: "tile6",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Tile 6",
    optionType: "ColorPicker",
    tileId: "tile7",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 6",
    optionType: "ColorPicker",
    tileId: "tile7",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Tile 7",
    optionType: "ColorPicker",
    tileId: "tile8",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 7",
    optionType: "ColorPicker",
    tileId: "tile8",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Tile 8",
    optionType: "ColorPicker",
    tileId: "tile9",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 8",
    optionType: "ColorPicker",
    tileId: "tile9",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Tile 9",
    optionType: "ColorPicker",
    tileId: "tile10",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 9",
    optionType: "ColorPicker",
    tileId: "tile10",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Tile 10",
    optionType: "ColorPicker",
    tileId: "tile11",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 10",
    optionType: "ColorPicker",
    tileId: "tile11",
  },
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Tile 11",
    optionType: "ColorPicker",
    tileId: "tile12",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Tile 11",
    optionType: "ColorPicker",
    tileId: "tile12",
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
      },
      tile1: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "Hacker News Feed",
      },
      tile2: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "None",
      },
      tile3: {
        backgroundColor: "#9AB899",
        textColor: "#222222",
        tileType: "None",
      },
      tile4: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "None",
      },
      tile5: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "Reddit Feed",
      },
      tile6: {
        backgroundColor: "#F06808",
        textColor: "#222222",
        tileType: "None",
      },
      tile7: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "None",
      },
      tile8: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "None",
      },
      tile9: {
        backgroundColor: "#9AB899",
        textColor: "#222222",
        tileType: "None",
      },
      tile10: {
        backgroundColor: "#E89C4B",
        textColor: "#222222",
        tileType: "None",
      },
      tile11: {
        backgroundColor: "#9AB899",
        textColor: "#222222",
        tileType: "None",
      },
      tile12: {
        backgroundColor: "#65abc1",
        textColor: "#222222",
        tileType: "None",
      },
    },
    {
      themeName: "light",
      globalSettings: {
        backgroundColor: "#ffffff",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile1: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile2: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile3: {
        backgroundColor: "#9AB899",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile4: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile5: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "Reddit Feed",
      },
      tile6: {
        backgroundColor: "#F06808",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile7: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile8: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile9: {
        backgroundColor: "#9AB899",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile10: {
        backgroundColor: "#E89C4B",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile11: {
        backgroundColor: "#9AB899",
        textColor: "#ffffff",
        tileType: "None",
      },
      tile12: {
        backgroundColor: "#65abc1",
        textColor: "#ffffff",
        tileType: "None",
      },
    },
  ],
};

export const sortOptionsIntoTileGroups = (
  options: Option[]
): Map<TileGroup, Option[]> => {
  const optionsInTileGroups: any = {};

  options.forEach((option) => {
    if (!option.tileGroup) {
      return;
    }
    if (!(option.tileGroup in optionsInTileGroups)) {
      optionsInTileGroups[option.tileGroup] = [option];
    } else {
      optionsInTileGroups[option.tileGroup] = [
        ...optionsInTileGroups[option.tileGroup],
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
