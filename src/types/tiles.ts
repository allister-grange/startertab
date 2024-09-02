export type TodoObject = {
  done: boolean;
  title: string;
  date: number;
  isCategory?: boolean;
  subTodoListItems?: TodoObject[];
  collapsed?: boolean;
};

export type SearchEngineDefault = {
  url: string;
  name: string;
  extraSearchTerm?: string;
};

export type Booking = {
  color: string;
  startTime: string;
  endTime: string;
  title: string;
  creationDate: Date;
  permanentBooking: boolean;
  duration?: number;
};

export type FavoriteLink = {
  id: string;
  url: string;
  favicon: string;
  name: string;
};

export type RSSFeed = {
  id: string;
  url: string;
  name: string;
  data: RSSItem[];
};

export type RSSItem = {
  title: string;
  link: string;
  date: string;
  author: string;
  feedName: string;
};

export type ThemeFilteringOptions =
  | "Popularity"
  | "Author"
  | "Created on"
  | "Name";
