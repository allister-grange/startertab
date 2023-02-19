import { GoogleMeetingResponse } from "@/types";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment-timezone";

const CALENDER_ID = "primary";
const GOOGLE_MEETINGS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDER_ID}/events`;
const REFRESH_TOKEN_ENDPOINT = `https://oauth2.googleapis.com/token`;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let accessToken = req.cookies["googleAccessToken"];
  let refreshToken = req.cookies["googleRefreshToken"];
  const timezone = req.query["timezone"] as string | undefined;

  if (!accessToken || !refreshToken) {
    return res.status(400).send("Failed to provide access or refresh token");
  }

  if (!timezone) {
    return res.status(400).send("Failed to provide timezone");
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
      let data = await getGoogleMeetingsData(accessToken, timezone);

      // access token is stale, get a new token and re-call the fetch method
      if (!data) {
        const tokens = await getNewTokens(refreshToken, res);
        if (tokens) {
          const { accessToken: newAccessToken } = tokens;
          data = await getGoogleMeetingsData(newAccessToken, timezone);
          await setNewTokenCookies(newAccessToken, res);
        } else {
          res
            .status(401)
            .send("Your Google refresh token is invalid, please login again");
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

export const getGoogleMeetingsData = async (
  accessToken: string,
  timezone: string
) => {
  try {
    const startOfDatMoment = moment().tz(timezone);
    const startOfDay = startOfDatMoment.startOf("day");

    const endOfDayMoment = moment().tz(timezone);
    const endOfDay = endOfDayMoment.endOf("day");

    const res = await fetch(
      GOOGLE_MEETINGS_ENDPOINT +
        `?timeMin=${encodeURIComponent(
          startOfDay.format()
        )}&timeMax=${encodeURIComponent(endOfDay.format())}`,
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

    const data = (await res.json()) as GoogleMeetingResponse;

    return data.items;
  } catch (error) {
    console.error("Failed to fetch google meetings", error);
    throw error;
  }
};

const getNewTokens = async (refreshToken: string, res: NextApiResponse) => {
  try {
    const postData = {
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
    };

    const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (response.status >= 400) {
      setExpiredCookies(res);
    }

    const data = await response.json();

    return { accessToken: data.access_token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const setNewTokenCookies = async (
  accessToken: string,
  res: NextApiResponse
) => {
  const AES = (await import("crypto-js/aes")).default;

  res.setHeader("Set-Cookie", [
    cookie.serialize("googleAccessToken", accessToken, {
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
    cookie.serialize("googleAccessToken", "deleted", {
      httpOnly: true,
      secure: true,
      maxAge: -1,
      sameSite: "none",
      path: "/",
    }),
    cookie.serialize("googleRefreshToken", "deleted", {
      httpOnly: true,
      secure: true,
      maxAge: -1,
      sameSite: "none",
      path: "/",
    }),
  ]);
};
