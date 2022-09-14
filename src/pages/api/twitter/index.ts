import { Tweet, TwitterFeedResponse } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(`base64`);

const TWITTER_FEED_ENDPOINT = `https://api.twitter.com/2/users`;
const REFRESH_TOKEN_ENDPOINT = `https://api.twitter.com/2/oauth2/token`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let accessToken = req.cookies["twitterAccessToken"];
  let refreshToken = req.cookies["twitterRefreshToken"];
  let userId = req.cookies["twitterUserId"];

  if (!accessToken || !refreshToken) {
    return res.status(400).send("Failed to provide access or refresh token");
  }

  if (!userId) {
    return res.status(400).send("Couldn't find userId cookie");
  }

  if (!ENCRYPT_KEY) {
    return res
      .status(500)
      .send("No encryption key found in environment variables");
  }

  const CryptoJS = (await import("crypto-js")).default;

  accessToken = CryptoJS.AES.decrypt(accessToken, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8
  );
  refreshToken = CryptoJS.AES.decrypt(refreshToken, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8
  );

  if (req.method === "GET") {
    try {
      const data = await getTwitterFeedData(accessToken, refreshToken, userId);

      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }
}

export const getTwitterFeedData = async (
  accessToken: string,
  refreshToken: string,
  userId: string
): Promise<Tweet[]> => {
  const endpoint =
    `${TWITTER_FEED_ENDPOINT}/${userId}/timelines/` +
    `reverse_chronological?tweet.fields=created_at,public_metrics&expansions=author_id` +
    `&user.fields=created_at&max_results=10`;
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(res);

  // access token is stale, get a new token and re-call this method
  if (res.status === 401) {
    console.log("Refreshing old access token", accessToken);
    const newAccessToken = await getAccessToken(refreshToken);
    //todo set new cookies here?
    console.log("New access token grabbed", newAccessToken);
    // return await getTwitterFeedData(newAccessToken, refreshToken, userId);
  }

  if (res.status !== 200) {
    throw new Error("Failed pulling tweets from Twitter");
  }

  const tweetResData = (await res.json()) as TwitterFeedResponse;

  console.log(tweetResData);

  if (!tweetResData.data) {
    throw new Error("Bad request to Twitter API");
  }

  const tweets = tweetResData.data.map((tweet) => {
    tweet.author = tweetResData.includes.users.find(
      (user) => user.id === tweet.author_id
    )?.username!;
    return tweet;
  });

  console.log(tweets);

  return tweets;
};

const getAccessToken = async (refreshToken: string) => {
  try {
    const endpoint = `${REFRESH_TOKEN_ENDPOINT}?refresh_token=${refreshToken}&grant_type=refresh_token`;

    const response = await fetch(endpoint, {
      method: `POST`,
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": `application/x-www-form-urlencoded`,
      },
    });

    const data = await response.json();

    return data.access_token;
  } catch (err) {
    throw new Error("Error fetching access token " + err);
  }
};
