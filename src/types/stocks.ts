export type FinnhubQuoteResponse = {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
  dp: number;
  d: number;
  ticker: string;
};

export type FinnhubCandleResponse = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
};

export type CandleGraphPoint = {
  amount: number;
  date: string;
};

export type StockTickers = [FinnhubQuoteResponse?];
