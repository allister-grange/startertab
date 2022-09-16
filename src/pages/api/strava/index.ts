import { NextApiRequest, NextApiResponse } from "next";
import {
  StravaActivity,
  StravaCombinedGraphData,
  StravaGraphData,
  StravaGraphPoint,
} from "@/types/strava";
import cookie from "cookie";

const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let accessToken = req.cookies["stravaAccessToken"];
    let refreshToken = req.cookies["stravaRefreshToken"];

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

    let stravaData = await getStravaData(accessToken as string);

    if (!stravaData) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await getNewOAuthTokens(refreshToken);
      stravaData = await getStravaData(newAccessToken);
      await setNewTokenCookies(newAccessToken, newRefreshToken, res);
    }

    res.status(200).json(stravaData);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getStravaData = async (accessToken: string) => {
  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_SECRET) {
    throw new Error("No environment variables set for Strava API");
  }
  try {
    const MonEpoch = getMonsEpoch();

    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&after=${MonEpoch}`
    );

    if (activitiesRes.status === 403 || activitiesRes.status === 401) {
      return null;
    }

    const activitiesJson: StravaActivity[] = await activitiesRes.json();

    const formattedStravaData = formatStravaData(activitiesJson);

    return formattedStravaData;
  } catch (err) {
    throw new Error(err as string);
  }
};

const getMonsEpoch = (): number => {
  const date = new Date();
  const day = date.getDay();

  // change date to Monday
  const diff = date.getDate() - day + (day == 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  const monday12am = monday.setHours(0, 0, 0, 0);

  // converting to unix timestamp
  return Math.floor(new Date(monday12am).getTime() / 1000);
};

const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

// I want two lots of data (swimming and running)
const formatStravaData = (data: StravaActivity[]) => {
  const formattedStravaData = getEmptyStravaData();

  data.forEach((activity) => {
    const dayOfActivity = new Date(activity.start_date_local).getUTCDay();

    if (activity.type === "Run") {
      formattedStravaData.running.forEach((activityToFind) => {
        if (activityToFind.day === weekday[dayOfActivity]) {
          activityToFind.distance +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (activityToFind.day === weekday[dayOfActivity]) {
          activityToFind.run +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    } else if (activity.type === "Swim") {
      formattedStravaData.swimming.forEach((activityToFind) => {
        if (activityToFind.day === weekday[dayOfActivity]) {
          activityToFind.distance +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (activityToFind.day === weekday[dayOfActivity]) {
          activityToFind.swim +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    } else if (activity.type === "Ride") {
      formattedStravaData.riding.forEach((activityToFind) => {
        if (activityToFind.day === weekday[dayOfActivity]) {
          activityToFind.distance +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (activityToFind.day === weekday[dayOfActivity]) {
          activityToFind.ride +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    }
  });

  return formattedStravaData;
};

export const getEmptyStravaData = (): StravaGraphData => {
  const formattedStravaData: StravaGraphData = {
    swimming: [] as StravaGraphPoint[],
    running: [] as StravaGraphPoint[],
    riding: [] as StravaGraphPoint[],
    combinedData: [] as StravaCombinedGraphData[],
  };

  formattedStravaData.running.push({ day: "Mon", distance: 0 });
  formattedStravaData.running.push({ day: "Tues", distance: 0 });
  formattedStravaData.running.push({ day: "Wed", distance: 0 });
  formattedStravaData.running.push({ day: "Thur", distance: 0 });
  formattedStravaData.running.push({ day: "Fri", distance: 0 });
  formattedStravaData.running.push({ day: "Sat", distance: 0 });
  formattedStravaData.running.push({ day: "Sun", distance: 0 });
  formattedStravaData.swimming.push({ day: "Mon", distance: 0 });
  formattedStravaData.swimming.push({ day: "Tues", distance: 0 });
  formattedStravaData.swimming.push({ day: "Wed", distance: 0 });
  formattedStravaData.swimming.push({ day: "Thur", distance: 0 });
  formattedStravaData.swimming.push({ day: "Fri", distance: 0 });
  formattedStravaData.swimming.push({ day: "Sat", distance: 0 });
  formattedStravaData.swimming.push({ day: "Sun", distance: 0 });
  formattedStravaData.riding.push({ day: "Mon", distance: 0 });
  formattedStravaData.riding.push({ day: "Tues", distance: 0 });
  formattedStravaData.riding.push({ day: "Wed", distance: 0 });
  formattedStravaData.riding.push({ day: "Thur", distance: 0 });
  formattedStravaData.riding.push({ day: "Fri", distance: 0 });
  formattedStravaData.riding.push({ day: "Sat", distance: 0 });
  formattedStravaData.riding.push({ day: "Sun", distance: 0 });
  formattedStravaData.combinedData.push({
    day: "Mon",
    run: 0,
    swim: 0,
    ride: 0,
  });
  formattedStravaData.combinedData.push({
    day: "Tues",
    run: 0,
    swim: 0,
    ride: 0,
  });
  formattedStravaData.combinedData.push({
    day: "Wed",
    run: 0,
    swim: 0,
    ride: 0,
  });
  formattedStravaData.combinedData.push({
    day: "Thur",
    run: 0,
    swim: 0,
    ride: 0,
  });
  formattedStravaData.combinedData.push({
    day: "Fri",
    run: 0,
    swim: 0,
    ride: 0,
  });
  formattedStravaData.combinedData.push({
    day: "Sat",
    run: 0,
    swim: 0,
    ride: 0,
  });
  formattedStravaData.combinedData.push({
    day: "Sun",
    run: 0,
    swim: 0,
    ride: 0,
  });

  return formattedStravaData;
};

const getNewOAuthTokens = async (refreshToken: string) => {
  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    refresh_token: refreshToken,
    client_secret: process.env.STRAVA_SECRET,
    grant_type: "refresh_token",
  });

  const headers = {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json",
  };

  try {
    const reAuthorizeRes = await fetch("https://www.strava.com/oauth/token", {
      body: body,
      headers: headers,
      method: "post",
    });

    const { access_token, refresh_token } = await reAuthorizeRes.json();

    if (!access_token || !refresh_token) {
      throw new Error(
        "Could not find tokens from Strava when grabbing fresh tokens"
      );
    }

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  } catch (err) {
    throw new Error(err as string);
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
