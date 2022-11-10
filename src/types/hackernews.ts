export interface HackerNewsApiItem {
  by: string;
  descendants: number;
  id: number;
  kids?: number[] | null;
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
}

export interface HackerNewsLinkHolder {
  title: string;
  url: string;
  id: number;
  author: string;
  time: number;
}
