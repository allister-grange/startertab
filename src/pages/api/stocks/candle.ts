import { FinnhubCandleResponse } from "@/types/stocks";
import { NextApiRequest, NextApiResponse } from "next";

const finnHubSecret = process.env.FINNHUB_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (
      !req.query.stock ||
      req.query.stock === "undefined" ||
      req.query.stock === ""
    ) {
      return res
        .status(404)
        .send("Please provide a stock ticker when calling this endpoint");
    }

    const stockData = await fetchStockCandleData(req.query.stock as string);

    // API sends back a object even when the stock ticker doesn't exist -_-
    if (stockData.s !== "ok") {
      return res
        .status(404)
        .send(`Couldn't find ticker with name ${req.query.stock}`);
    }

    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const fetchStockCandleData = async (
  stock: string
): Promise<FinnhubCandleResponse> => {
  // Calculate Unix timestamp for 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const unixTime7DaysAgo = Math.floor(sevenDaysAgo.getTime() / 1000);

  // Calculate Unix timestamp for today
  const now = new Date();
  const unixTimeToday = Math.floor(now.getTime() / 1000);

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stock.toUpperCase()}&resolution=D&from=${unixTime7DaysAgo}&to=${unixTimeToday}`,
      {
        method: "GET",
        headers: {
          "X-Finnhub-Token": `${finnHubSecret}`,
        },
      }
    );

    const data = (await res.json()) as FinnhubCandleResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};
