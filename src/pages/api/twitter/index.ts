import { Tweet, TwitterFeedResponse } from "@/types";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const TWITTER_FEED_ENDPOINT = `https://api.twitter.com/2/users`;
const REFRESH_TOKEN_ENDPOINT = `https://api.twitter.com/2/oauth2/token`;
const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(`base64`);

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
      let data = await getTwitterFeedData(accessToken, userId);

      // access token is stale, get a new token and re-call the fetch method
      if (!data) {
        const tokens = await getNewTokens(refreshToken);
        if (tokens) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            tokens;
          data = await getTwitterFeedData(newAccessToken, userId);
          await setNewTokenCookies(newAccessToken, newRefreshToken, res);
        } else {
          setExpiredCookies(res);
          res.status(401).send("Your refresh token is invalid");
        }
      }

      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).json(err as string);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }
}

export const getTwitterFeedData = async (
  accessToken: string,
  userId: string
): Promise<Tweet[] | null> => {
  const endpoint =
    `${TWITTER_FEED_ENDPOINT}/${userId}/timelines/` +
    `reverse_chronological?tweet.fields=created_at,public_metrics&expansions=author_id` +
    `&user.fields=created_at&max_results=10`;
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // access token is stale, get a new token and re-call this method
  if (res.status === 401 || res.status === 403) {
    return null;
  }

  if (res.status >= 400) {
    throw new Error("Failed pulling tweets from Twitter");
  }

  const tweetResData = (await res.json()) as TwitterFeedResponse;

  if (!tweetResData.data) {
    throw new Error("Bad request to Twitter API");
  }

  const tweets = tweetResData.data.map((tweet) => {
    tweet.author = tweetResData.includes.users.find(
      (user) => user.id === tweet.author_id
    )?.username!;
    return tweet;
  });

  return tweets;
};

const getNewTokens = async (refreshToken: string) => {
  try {
    const endpoint = `${REFRESH_TOKEN_ENDPOINT}?refresh_token=${encodeURIComponent(
      refreshToken
    )}&grant_type=refresh_token`;

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
    });

    const data = await response.json();

    if (!data.access_token || !data.refresh_token) {
      return null;
    }

    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  } catch (err) {
    console.error("Error fetching access token " + err);
    return null;
  }
};

const setNewTokenCookies = async (
  accessToken: string,
  refreshToken: string,
  res: NextApiResponse
) => {
  const AES = (await import("crypto-js/aes")).default;

  res.setHeader("Set-Cookie", [
    cookie.serialize("twitterAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 34560000,
      sameSite: "strict",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
    cookie.serialize("twitterRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 34560000,
      sameSite: "strict",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
  ]);
};

const setExpiredCookies = async (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("twitterAccessToken", "deleted", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("twitterRefreshToken", "deleted", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    }),
  ]);
};
