import { OutlookMeetingResponse } from "@/types";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const OUTLOOK_MEETINGS_ENDPOINT = `https://graph.microsoft.com/v1.0/me/calendarview`;
const REFRESH_TOKEN_ENDPOINT = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
const CLIENT_ID = process.env.OUTLOOK_CLIENT_ID;
const CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let accessToken = req.cookies["outlookAccessToken"];
  let refreshToken = req.cookies["outlookRefreshToken"];

  if (!accessToken || !refreshToken) {
    return res.status(400).send("Failed to provide access or refresh token");
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
      let data = await getOutlookMeetingsData(accessToken);

      // access token is stale, get a new token and re-call the fetch method
      if (!data) {
        const tokens = await getNewTokens(refreshToken);
        if (tokens) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            tokens;
          data = await getOutlookMeetingsData(newAccessToken);
          await setNewTokenCookies(newAccessToken, newRefreshToken, res);
        } else {
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

export const getOutlookMeetingsData = async (accessToken: string) => {
  try {
    const now = new Date();
    let today: string | Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    today.setTime(today.getTime() + 1000);
    today = today.toISOString();
    let tomorrow: string | Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    tomorrow.setTime(tomorrow.getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000);
    tomorrow = tomorrow.toISOString();

    const res = await fetch(
      OUTLOOK_MEETINGS_ENDPOINT +
        `?startDateTime=${today}&endDateTime=${tomorrow}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // access token is stale, get a new token and re-call this method
    if (res.status === 401 || res.status === 403) {
      return null;
    }

    const data = (await res.json()) as OutlookMeetingResponse;

    data.value.sort((a, b) => {
      // First, sort events that last 24 hours to the top
      if (a.isAllDay && !b.isAllDay) return -1;
      if (!a.isAllDay && b.isAllDay) return 1;

      // Next, sort by start time
      const startA = new Date(a.start.dateTime);
      const startB = new Date(b.start.dateTime);
      return startA.getTime() - startB.getTime();
    });

    return data.value;
  } catch (error) {
    console.error("Failed to fetch outlook meetings", error);
  }
};

const getNewTokens = async (refreshToken: string) => {
  try {
    const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    });
    const data = await response.json();

    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const setNewTokenCookies = async (
  accessToken: string,
  refreshToken: string,
  res: NextApiResponse
) => {
  const AES = (await import("crypto-js/aes")).default;

  res.setHeader("Set-Cookie", [
    cookie.serialize("outlookAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 34560000,
      sameSite: "strict",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
    cookie.serialize("outlookRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 34560000,
      sameSite: "strict",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
  ]);
};
