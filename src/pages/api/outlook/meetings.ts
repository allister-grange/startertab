import { OutlookMeetingResponse } from "@/types";
import cookie from "cookie";
import moment from "moment-timezone";
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
  let timezone = req.query["timezone"] as string | undefined;

  if (!accessToken || !refreshToken) {
    return res.status(400).send("Failed to provide access or refresh token");
  }

  if (!timezone) {
    return res.status(400).send("Failed to provide a timezone");
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
      let data = await getOutlookMeetingsData(accessToken, timezone);

      // access token is stale, get a new token and re-call the fetch method
      if (!data) {
        const tokens = await getNewTokens(refreshToken);
        if (tokens) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            tokens;
          data = await getOutlookMeetingsData(newAccessToken, timezone);
          await setNewTokenCookies(newAccessToken, newRefreshToken, res);
        } else {
          setExpiredCookies(res);
          res
            .status(401)
            .send("Your Outlook refresh token is invalid, please login again");
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

export const getOutlookMeetingsData = async (
  accessToken: string,
  timezone: string
) => {
  try {
    const startOfDatMoment = moment().tz(timezone);
    const startOfDay = startOfDatMoment.startOf("day");

    const endOfDayMoment = moment().tz(timezone);
    const endOfDay = endOfDayMoment.endOf("day");

    const res = await fetch(
      OUTLOOK_MEETINGS_ENDPOINT +
        `?startDateTime=${encodeURIComponent(
          startOfDay.format()
        )}&endDateTime=${encodeURIComponent(endOfDay.format())}`,
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

    if (!data.value) {
      return [];
    }

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
    throw error;
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
      secure: true,
      maxAge: 34560000,
      sameSite: "none",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
    cookie.serialize("outlookRefreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 34560000,
      sameSite: "none",
      path: "/",
      encode: (value) => AES.encrypt(value, ENCRYPT_KEY!).toString(),
    }),
  ]);
};

const setExpiredCookies = async (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("outlookAccessToken", "deleted", {
      httpOnly: true,
      secure: true,
      maxAge: -1,
      sameSite: "none",
      path: "/",
    }),
    cookie.serialize("outlookRefreshToken", "deleted", {
      httpOnly: true,
      secure: true,
      maxAge: -1,
      sameSite: "none",
      path: "/",
    }),
  ]);
};
