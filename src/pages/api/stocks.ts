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
      return res
        .status(404)
        .send("Please provide stock tickers to call this API with");
    }

    const stockData = await getStockTickerInfo(req.query.stocks as string);

    // API sends back a object even when the stock ticker doesn't exist -_-
    if (stockData[0]!.d === null) {
      return res
        .status(404)
        .send(`Couldn't find ticker with name req.query.stocks`);
    }

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
          `https://finnhub.io/api/v1/quote?symbol=${stockName.toUpperCase()}`,
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
