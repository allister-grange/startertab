export type TodoObject = {
  done: boolean;
  title: string;
  date: number;
};

export type Booking = {
  color: string;
  startTime: string;
  endTime: string;
  title: string;
  creationDate: Date;
  permanentBooking: boolean;
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
