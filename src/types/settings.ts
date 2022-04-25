export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  lightDefault: string;
  darkDefault: string;
};

export type Themes = "dark" | "light";

export type ThemeSettings = {
  themeName: string;
  backgroundColor: string;
  textColor: string;
  tile1BackgroundColor: string;
  tile2BackgroundColor: string;
  tile3BackgroundColor: string;
  tile4BackgroundColor: string;
  tile5BackgroundColor: string;
  tile6BackgroundColor: string;
  tile7BackgroundColor: string;
  tile8BackgroundColor: string;
  tile9BackgroundColor: string;
  tile10BackgroundColor: string;
  tile11BackgroundColor: string;
  tile12BackgroundColor: string;
}

export type UserSettings = {
  themes: ThemeSettings[],
};
