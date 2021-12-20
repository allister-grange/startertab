import { NextApiRequest, NextApiResponse } from "next";
import { HackerNewsApiItem, HackerNewsLinkHolder } from "../../types/hackernews";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const hackerNewsTopAskUrl = "https://hacker-news.firebaseio.com/v0/askstories.json";
  const hackerNewsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";

  try {
    const takenAsks = 25;
    const topAsksRes = await fetch(hackerNewsTopAskUrl);
    const topAsks = await topAsksRes.json() as number[];
    const topAskTruncated = topAsks.slice(0, takenAsks);
    const askLinks: HackerNewsLinkHolder[] = [];
    
    await Promise.all(topAskTruncated.map(async (askId) => {
      const askDetailRes = await fetch(`${hackerNewsItemUrl}${askId}.json`);
      const askDetail = await askDetailRes.json() as HackerNewsApiItem;
      askLinks.push({title: askDetail.title, url: `https://news.ycombinator.com/item?id=${askDetail.id}`})
    }));

    res.status(200).json(askLinks);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}