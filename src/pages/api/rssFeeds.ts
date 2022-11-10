import { RSSFeed, RSSItem } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
let Parser = require("rss-parser");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

  let { rssFeeds } = req.query;

  if (!rssFeeds || typeof rssFeeds !== "string") {
    return res.status(400).send("Bad request, please include RSS feed");
  }

  rssFeeds = rssFeeds.split(",");

  const feeds: RSSFeed[] = [];
  try {
    await Promise.all(
      rssFeeds.map(async (feed) => {
        let parser = new Parser();
        let remoteFeed = await parser.parseURL(feed);

        let feedData: RSSItem[] = [];
        for (let i = 0; i < 30; i++) {
          if (!remoteFeed.items[i]) {
            continue;
          }

          const { title, link, isoDate: date, author } = remoteFeed.items[i];
          feedData.push({
            title,
            link,
            date,
            author,
            feedName: remoteFeed.title,
          });
        }

        feeds.push({
          id: (Math.random() + 1).toString(36).substring(7),
          url: feed,
          name: remoteFeed.title as string,
          data: feedData,
        });
      })
    );
  } catch (err) {
    console.error(err);
    return res.status(500);
  }

  res.status(200).json(feeds);
}
