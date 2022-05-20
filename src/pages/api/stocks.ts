import { FinnhubStockResponse, StockTickers } from "@/types/stocks";
import { NextApiRequest, NextApiResponse } from "next";

const finnHubSecret = process.env.FINNHUB_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (
      !req.query.stocks ||
      req.query.stocks === "undefined" ||
      req.query.stocks === ""
    ) {
      res.status(404);
    }

    const stockData = await getStockTickerInfo(req.query.stocks as string);
    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getStockTickerInfo = async (
  stocks: string
): Promise<StockTickers> => {
  try {
    let stocksArray = stocks.split(",");
    let stockTickers: StockTickers = [];

    await Promise.all(
      stocksArray.map(async (stockName) => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${stockName}`,
          {
            method: "GET",
            headers: {
              "X-Finnhub-Token": `${finnHubSecret}`,
            },
          }
        );

        const data = (await res.json()) as FinnhubStockResponse;
        data.ticker = stockName;
        stockTickers.push(data);
      })
    );

    return stockTickers;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};
