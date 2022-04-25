import { Option, ThemeSettings, UserSettings } from "@/types/settings";

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
  },
  {
    title: "Strava tile background color",
    subTitle: "Background color of the Strava tile",
    localStorageId: "tile2BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
  },
  {
    title: "Wind tile background color",
    subTitle: "Background color of the wind tile",
    localStorageId: "tile3BackgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
  },
  {
    title: "Swimming lane booking tile background color",
    subTitle: "Background color of the swimming lane tile",
    localStorageId: "tile4BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
  },
  {
    title: "Reddit feed tile background color",
    subTitle: "Background color of the reddit tile",
    localStorageId: "tile5BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
  },
  {
    title: "Search tile background color",
    subTitle: "Background color of the first tile",
    localStorageId: "tile6BackgroundColor",
    lightDefault: "#F06808",
    darkDefault: "#F06808",
  },
  {
    title: "Bonsai background color",
    subTitle: "Background color of the bonsai tile",
    localStorageId: "tile7BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
  },
  {
    title: "Weather tile background color",
    subTitle: "Background color of the weather tile",
    localStorageId: "tile8BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
  },
  {
    title: "Spotify tile background color",
    subTitle: "Background color of the spotify tile",
    localStorageId: "tile9BackgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
  },
  {
    title: "UvIndex Tile background color",
    subTitle: "Background color of the UV tile",
    localStorageId: "tile10BackgroundColor",
    lightDefault: "#E89C4B",
    darkDefault: "#E89C4B",
  },
  {
    title: "Clock tile background color",
    subTitle: "Background color of the clock tile",
    localStorageId: "tile11BackgroundColor",
    lightDefault: "#9AB899",
    darkDefault: "#9AB899",
  },
  {
    title: "Theme changer tile background color",
    subTitle: "Background color of the theme changer tile",
    localStorageId: "tile12BackgroundColor",
    lightDefault: "#65abc1",
    darkDefault: "#65abc1",
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
    },
  ],
};
