export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  lightDefault: string;
  darkDefault: string;
};
// export type Option = {
//   title: string;
//   subTitle: string;
//   localStorageId: string;
//   default: string;
// };

export type Themes = "dark" | "light";

export type ThemeSettings = {
  themeName: string;
  backgroundColor: string;
  textColor: string;
  hackerNewsFeedBackgroundColor: string;
}

// could be an array of themes 
export type UserSettings = {
  themes: ThemeSettings[],
};
