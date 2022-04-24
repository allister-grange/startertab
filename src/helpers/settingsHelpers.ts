import { Option, UserSettings } from "@/types/settings";

export const sideBarOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Controls the theme background color of the main page",
    localStorageId: "backgroundColor",
    lightDefault: "#ffffff",
    darkDefault: "#1B202B",
  },
  // {
  //   title: "Light theme background color",
  //   subTitle: "Controls the light theme background color of the main page",
  //   localStorageId: "lightThemeBackgroundColor",
  //   default: "#ffffff"
  // },
  // {
  //   title: "Dark theme background color",
  //   subTitle: "Controls the dark theme background color of the main page",
  //   localStorageId: "darkThemeBackgroundColor",
  //   default: "#1B202B"
  // },
];

export const defaultSettings: UserSettings = {
  themes: [
    {
      themeName: "dark",
      backgroundColor: "#1B202B",
      textColor: "#222222",
      hackerNewsFeedBackgroundColor: "#F06808",
    },
    {
      themeName: "light",
      backgroundColor: "#ffffff",
      textColor: "#ffffff",
      hackerNewsFeedBackgroundColor: "#F26898",
    },
  ],
};
