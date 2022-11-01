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
  id: number;
  url: string;
  favicon: string;
  name: string;
};
