import { TwitterFeedResponse } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const key = process.env.TOKEN_ENCRYPT_KEY;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`);

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

  if (!key) {
    return res
      .status(500)
      .send("No encryption key found in environment variables");
  }

  const CryptoJS = (await import("crypto-js")).default;

  accessToken = CryptoJS.AES.decrypt(accessToken, key).toString(
    CryptoJS.enc.Utf8
  );
  refreshToken = CryptoJS.AES.decrypt(refreshToken, key).toString(
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

const getAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
      method: `POST`,
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      body: querystring.stringify({
        grant_type: `refresh_token`,
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    return data.access_token;
  } catch (err) {
    throw new Error("Error fetching access token " + err);
  }
};

export const getTwitterFeedData = async (
  accessToken: string,
  refreshToken: string,
  userId: string
): Promise<any> => {
  const endpoint = `${TWITTER_FEED_ENDPOINT}/${userId}/timelines/reverse_chronological?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=10`;
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // access token is stale, get a new token and re-call this method
  if (res.status === 401) {
    console.log("Refreshing old access token", accessToken);
    const newAccessToken = await getAccessToken(refreshToken);
    //todo set new cookies here?
    console.log("New access token grabbed", newAccessToken);
    return await getTwitterFeedData(newAccessToken, refreshToken, userId);
  }

  const tweetResData = (await res.json()) as TwitterFeedResponse;

  const tweets = tweetResData.data.map((tweet) => {
    tweet.author = tweetResData.includes.users.find(
      (user) => user.id === tweet.author_id
    )?.username!;
    return tweet;
  });

  return tweets;
};
