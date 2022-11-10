import { NextApiRequest, NextApiResponse } from "next";
import {
  HackerNewsApiItem,
  HackerNewsLinkHolder,
} from "../../types/hackernews";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

  const { hackerNewsFeed } = req.query;

  if (!hackerNewsFeed || typeof hackerNewsFeed !== "string") {
    return res.status(400).send("Bad request, please include feed type");
  }

  try {
    const hackerNewsData = await getHackerNewsData(hackerNewsFeed);
    return res.status(200).json(hackerNewsData);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

export const getHackerNewsData = async (hackerNewsFeed: string) => {
  let hackerNewsUrl;

  switch (hackerNewsFeed) {
    case "Ask":
      hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/askstories.json";
      break;
    case "Show":
      hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/showstories.json";
      break;
    default:
      hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/beststories.json";
  }

  const hackerNewsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";

  try {
    const takenAsks = 25;

    const topPostsRes = await fetch(hackerNewsUrl);
    const topPosts = (await topPostsRes.json()) as number[];
    const topPostsTruncated = topPosts.slice(0, takenAsks);
    const postLinks: HackerNewsLinkHolder[] = [];

    await Promise.all(
      topPostsTruncated.map(async (askId) => {
        const postDetailRes = await fetch(`${hackerNewsItemUrl}${askId}.json`);
        const postDetail = (await postDetailRes.json()) as HackerNewsApiItem;

        postLinks.push({
          title: postDetail.title,
          url: `https://news.ycombinator.com/item?id=${postDetail.id}`,
          id: postDetail.id,
          time: postDetail.time,
          author: postDetail.by,
        });
      })
    );

    return postLinks;
  } catch (err) {
    throw new Error(err as string);
  }
};
