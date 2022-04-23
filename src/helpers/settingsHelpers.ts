import {Option, UserSettings} from "@/types/settings";

export const sideBarOptions: Option[] = [
  {
    title: "Light theme background color",
    subTitle: "Controls the light theme background color of the main page",
    localStorageId: "lightThemeBackgroundColor",
    default: "#ffffff"
  },
  {
    title: "Dark theme background color",
    subTitle: "Controls the dark theme background color of the main page",
    localStorageId: "darkThemeBackgroundColor",
    default: "1B202B"
  },
];

export const defaultSettings: UserSettings = {
  lightThemeBackgroundColor: "#ffffff",
  darkThemeBackgroundColor: "#1B202B"
}