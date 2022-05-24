export type FinnhubStockResponse = {
  "c": number,
  "h": number,
  "l": number,
  "o": number,
  "pc": number,
  "t": number,
  "dp": number,
  "d": number,
  ticker: string,
}

export type StockTickers = [
  FinnhubStockResponse?
]