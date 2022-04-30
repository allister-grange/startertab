import { Option, ThemeSettings, TileGroup, UserSettings } from "@/types";

export const applyTheme = (theme: ThemeSettings) => {
  document.body.style.backgroundColor = theme.globalSettings.backgroundColor;
  document.documentElement.style.setProperty(
    "--bg-color-tile-1",
    theme.tile1.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-2",
    theme.tile2.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-3",
    theme.tile3.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-4",
    theme.tile4.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-5",
    theme.tile5.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-6",
    theme.tile6.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-7",
    theme.tile7.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-8",
    theme.tile8.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-9",
    theme.tile9.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-10",
    theme.tile10.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-11",
    theme.tile11.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-12",
    theme.tile12.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-1",
    theme.tile1.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-2",
    theme.tile2.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-3",
    theme.tile3.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-4",
    theme.tile4.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-5",
    theme.tile5.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-6",
    theme.tile6.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-7",
    theme.tile7.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-8",
    theme.tile8.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-9",
    theme.tile9.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-10",
    theme.tile10.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-11",
    theme.tile11.textColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-12",
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
    tileGroup: "HackerNews Tile",
    optionType: "ColorPicker",
    tileId: "tile1",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "HackerNews Tile",
    optionType: "ColorPicker",
    tileId: "tile1",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "HackerNews Tile",
    optionType: "TypePicker",
    tileId: "tile1",
  },
  {
    title: "Strava tile background color",
    subTitle: "Background color of the Strava tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Strava Tile",
    optionType: "ColorPicker",
    tileId: "tile2",
  },
  {
    title: "Strava tile text color",
    subTitle: "Text color of the Strava tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Strava Tile",
    optionType: "ColorPicker",
    tileId: "tile2",
  },
  {
    title: "Wind tile background color",
    subTitle: "Background color of the wind tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Wind Tile",
    optionType: "ColorPicker",
    tileId: "tile3",
  },
  {
    title: "Wind tile text color",
    subTitle: "Text color of the wind tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Wind Tile",
    optionType: "ColorPicker",
    tileId: "tile3",
  },
  {
    title: "Swimming lane booking tile background color",
    subTitle: "Background color of the swimming lane tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Swimming Tile",
    optionType: "ColorPicker",
    tileId: "tile4",
  },
  {
    title: "Swimming lane booking text color",
    subTitle: "Text color of the swimming lane tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Swimming Tile",
    optionType: "ColorPicker",
    tileId: "tile4",
  },
  {
    title: "Reddit feed tile background color",
    subTitle: "Background color of the reddit tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Reddit Tile",
    optionType: "ColorPicker",
    tileId: "tile5",
  },
  {
    title: "Reddit feed tile text color",
    subTitle: "Text color of the reddit tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Reddit Tile",
    optionType: "ColorPicker",
    tileId: "tile5",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    tileGroup: "Reddit Tile",
    optionType: "SubRedditPicker",
    tileId: "tile5",
  },
  {
    title: "Search tile background color",
    subTitle: "Background color of the first tile",
    localStorageId: "backgroundColor",
    lightDefault: "#F06808",
    darkDefault: "#F06808",
    tileGroup: "Search Tile",
    optionType: "ColorPicker",
    tileId: "tile6",
  },
  {
    title: "Search tile text color",
    subTitle: "text color of the search tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Search Tile",
    optionType: "ColorPicker",
    tileId: "tile6",
  },
  {
    title: "Bonsai background color",
    subTitle: "Background color of the bonsai tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Bonsai Tile",
    optionType: "ColorPicker",
    tileId: "tile7",
  },
  {
    title: "Bonsai text color",
    subTitle: "Text color of the bonsai tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Bonsai Tile",
    optionType: "ColorPicker",
    tileId: "tile7",
  },
  {
    title: "Weather tile background color",
    subTitle: "Background color of the weather tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Weather Tile",
    optionType: "ColorPicker",
    tileId: "tile8",
  },
  {
    title: "Weather tile text color",
    subTitle: "Text color of the weather tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Weather Tile",
    optionType: "ColorPicker",
    tileId: "tile8",
  },
  {
    title: "Spotify tile background color",
    subTitle: "Background color of the spotify tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Spotify Tile",
    optionType: "ColorPicker",
    tileId: "tile9",
  },
  {
    title: "Spotify tile text color",
    subTitle: "Text color of the spotify tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Spotify Tile",
    optionType: "ColorPicker",
    tileId: "tile9",
  },
  {
    title: "UvIndex Tile background color",
    subTitle: "Background color of the UV tile",
    localStorageId: "backgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "UV Tile",
    optionType: "ColorPicker",
    tileId: "tile10",
  },
  {
    title: "UvIndex Tile text color",
    subTitle: "Text color of the UV tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "UV Tile",
    optionType: "ColorPicker",
    tileId: "tile10",
  },
  {
    title: "Clock tile background color",
    subTitle: "Background color of the clock tile",
    localStorageId: "backgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Clock Tile",
    optionType: "ColorPicker",
    tileId: "tile11",
  },
  {
    title: "Clock tile text color",
    subTitle: "Text color of the clock tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Clock Tile",
    optionType: "ColorPicker",
    tileId: "tile11",
  },
  {
    title: "Theme changer tile background color",
    subTitle: "Background color of the theme changer tile",
    localStorageId: "backgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Theme Changer Tile",
    optionType: "ColorPicker",
    tileId: "tile12",
  },
  {
    title: "Theme changer tile text color",
    subTitle: "Text color of the theme changer tile",
    localStorageId: "textColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Theme Changer Tile",
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
        tileType: "None",
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
