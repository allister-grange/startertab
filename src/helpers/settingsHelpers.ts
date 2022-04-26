import { Option, SortedOption, ThemeSettings, TileGroup, UserSettings } from "@/types/settings";

export const applyTheme = (theme: ThemeSettings) => {
  document.body.style.backgroundColor = theme.backgroundColor;
  document.documentElement.style.setProperty(
    "--bg-color-tile-1",
    theme.tile1BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-2",
    theme.tile2BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-3",
    theme.tile3BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-4",
    theme.tile4BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-5",
    theme.tile5BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-6",
    theme.tile6BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-7",
    theme.tile7BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-8",
    theme.tile8BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-9",
    theme.tile9BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-10",
    theme.tile10BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-11",
    theme.tile11BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--bg-color-tile-12",
    theme.tile12BackgroundColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-1",
    theme.tile1TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-2",
    theme.tile2TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-3",
    theme.tile3TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-4",
    theme.tile4TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-5",
    theme.tile5TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-6",
    theme.tile6TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-7",
    theme.tile7TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-8",
    theme.tile8TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-9",
    theme.tile9TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-10",
    theme.tile10TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-11",
    theme.tile11TextColor
  );
  document.documentElement.style.setProperty(
    "--text-color-tile-12",
    theme.tile12TextColor
  );
};

export const sideBarOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Controls the theme background color of the main page",
    localStorageId: "backgroundColor",
    lightDefault: "#ffffff",
    darkDefault: "#1B202B",
  },
  {
    title: "HackerNews background color",
    subTitle: "Background color of the HackerNews tile",
    localStorageId: "tile1BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "HackerNews Tile",
  },
  {
    title: "HackerNews text color",
    subTitle: "Text color of the HackerNews tile",
    localStorageId: "tile1TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "HackerNews Tile",
  },
  {
    title: "Strava tile background color",
    subTitle: "Background color of the Strava tile",
    localStorageId: "tile2BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Strava Tile",
  },
  {
    title: "Strava tile text color",
    subTitle: "Text color of the Strava tile",
    localStorageId: "tile2TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Strava Tile",
  },
  {
    title: "Wind tile background color",
    subTitle: "Background color of the wind tile",
    localStorageId: "tile3BackgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Wind Tile",
  },
  {
    title: "Wind tile text color",
    subTitle: "Text color of the wind tile",
    localStorageId: "tile3TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Wind Tile",
  },
  {
    title: "Swimming lane booking tile background color",
    subTitle: "Background color of the swimming lane tile",
    localStorageId: "tile4BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Swimming Tile",
  },
  {
    title: "Swimming lane booking text color",
    subTitle: "Text color of the swimming lane tile",
    localStorageId: "tile4TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Swimming Tile",
  },
  {
    title: "Reddit feed tile background color",
    subTitle: "Background color of the reddit tile",
    localStorageId: "tile5BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Reddit Tile",
  },
  {
    title: "Reddit feed tile text color",
    subTitle: "Text color of the reddit tile",
    localStorageId: "tile5TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Reddit Tile",
  },
  {
    title: "Search tile background color",
    subTitle: "Background color of the first tile",
    localStorageId: "tile6BackgroundColor",
    lightDefault: "#F06808",
    darkDefault: "#F06808",
    tileGroup: "Search Tile",
  },
  {
    title: "Search tile text color",
    subTitle: "text color of the search tile",
    localStorageId: "tile6TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Search Tile",
  },
  {
    title: "Bonsai background color",
    subTitle: "Background color of the bonsai tile",
    localStorageId: "tile7BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "Bonsai Tile",
  },
  {
    title: "Bonsai text color",
    subTitle: "Text color of the bonsai tile",
    localStorageId: "tile7TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Bonsai Tile",
  },
  {
    title: "Weather tile background color",
    subTitle: "Background color of the weather tile",
    localStorageId: "tile8BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Weather Tile",
  },
  {
    title: "Weather tile text color",
    subTitle: "Text color of the weather tile",
    localStorageId: "tile8TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Weather Tile",
  },
  {
    title: "Spotify tile background color",
    subTitle: "Background color of the spotify tile",
    localStorageId: "tile9BackgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Spotify Tile",
  },
  {
    title: "Spotify tile text color",
    subTitle: "Text color of the spotify tile",
    localStorageId: "tile9TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Spotify Tile",
  },
  {
    title: "UvIndex Tile background color",
    subTitle: "Background color of the UV tile",
    localStorageId: "tile10BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
    tileGroup: "UV Tile",
  },
  {
    title: "UvIndex Tile text color",
    subTitle: "Text color of the UV tile",
    localStorageId: "tile10TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "UV Tile",
  },
  {
    title: "Clock tile background color",
    subTitle: "Background color of the clock tile",
    localStorageId: "tile11BackgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
    tileGroup: "Clock Tile",
  },
  {
    title: "Clock tile text color",
    subTitle: "Text color of the clock tile",
    localStorageId: "tile11TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Clock Tile",
  },
  {
    title: "Theme changer tile background color",
    subTitle: "Background color of the theme changer tile",
    localStorageId: "tile12BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
    tileGroup: "Theme Changer Tile",
  },
  {
    title: "Theme changer tile text color",
    subTitle: "Text color of the theme changer tile",
    localStorageId: "tile12TextColor",
    lightDefault: "#ffffff",
    darkDefault: "#222222",
    tileGroup: "Theme Changer Tile",
  },
];

export const defaultSettings: UserSettings = {
  themes: [
    {
      themeName: "dark",
      backgroundColor: "#1B202B",
      textColor: "#222222",
      tile1BackgroundColor: "#65abc1",
      tile2BackgroundColor: "#E89C4B",
      tile3BackgroundColor: "#9AB899",
      tile4BackgroundColor: "#65abc1",
      tile5BackgroundColor: "#E89C4B",
      tile6BackgroundColor: "#F06808",
      tile7BackgroundColor: "#E89C4B",
      tile8BackgroundColor: "#65abc1",
      tile9BackgroundColor: "#9AB899",
      tile10BackgroundColor: "#E89C4B",
      tile11BackgroundColor: "#9AB899",
      tile12BackgroundColor: "#65abc1",
      tile1TextColor: "#222222",
      tile2TextColor: "#222222",
      tile3TextColor: "#222222",
      tile4TextColor: "#222222",
      tile5TextColor: "#222222",
      tile6TextColor: "#222222",
      tile7TextColor: "#222222",
      tile8TextColor: "#222222",
      tile9TextColor: "#222222",
      tile10TextColor: "#222222",
      tile11TextColor: "#222222",
      tile12TextColor: "#222222",
    },
    {
      themeName: "light",
      backgroundColor: "#ffffff",
      textColor: "#ffffff",
      tile1BackgroundColor: "#65abc1",
      tile2BackgroundColor: "#E89C4B",
      tile3BackgroundColor: "#9AB899",
      tile4BackgroundColor: "#65abc1",
      tile5BackgroundColor: "#E89C4B",
      tile6BackgroundColor: "#F06808",
      tile7BackgroundColor: "#E89C4B",
      tile8BackgroundColor: "#65abc1",
      tile9BackgroundColor: "#9AB899",
      tile10BackgroundColor: "#E89C4B",
      tile11BackgroundColor: "#9AB899",
      tile12BackgroundColor: "#65abc1",
      tile1TextColor: "#ffffff",
      tile2TextColor: "#ffffff",
      tile3TextColor: "#ffffff",
      tile4TextColor: "#ffffff",
      tile5TextColor: "#ffffff",
      tile6TextColor: "#ffffff",
      tile7TextColor: "#ffffff",
      tile8TextColor: "#ffffff",
      tile9TextColor: "#ffffff",
      tile10TextColor: "#ffffff",
      tile11TextColor: "#ffffff",
      tile12TextColor: "#ffffff",
    },
  ],
};

export const sortOptionsIntoTileGroups = (options: Option[]): Map<TileGroup, Option[]> => {
  // I want a hashtable of key: array of options
  const optionsInTileGroups: any = {};

  options.forEach((option) => {
    // push into beginning bit?
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
