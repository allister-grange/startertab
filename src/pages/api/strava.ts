import moment from "moment-timezone";
import { NextApiRequest, NextApiResponse } from "next";
import {
  StravaActivity,
  StravaCombinedGraphData,
  StravaGraphData,
  StravaGraphPoint
} from "../../types/strava";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const stravaData = await getStravaData();
    res.status(200).json(stravaData);
  }
  catch (err) {
    res.status(500).json(err);
  }

}

export const getStravaData = async() => {
  if (
    !process.env.STRAVA_CLIENT ||
    !process.env.STRAVA_REFRESH_TOKEN ||
    !process.env.STRAVA_SECRET
  ) {
    throw new Error("No environment variables set for Strava API");
  }
  
  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT,
    refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    client_secret: process.env.STRAVA_SECRET,
    grant_type: "refresh_token",
  });

  const headers = {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json",
  };  

  try {
    const reauthouriseRes = await fetch("https://www.strava.com/oauth/token", {
      body: body,
      headers: headers,
      method: "post",
    });

    const reAuthJson = await reauthouriseRes.json();

    const mondayEpoch = getMondaysEpoch();

    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${reAuthJson.access_token}&after=${mondayEpoch}`
    );

    const activitiesJson: StravaActivity[] = await activitiesRes.json();

    const formattedStravaData = formatStravaData(activitiesJson);

    return formattedStravaData;
  } catch (err) {
    throw new Error(err as string);
  }

}

const getMondaysEpoch = (): number => {
  let NZ = moment.tz(moment(), "Pacific/Auckland");
  const startOfWeek = NZ.startOf("isoWeek");

  const startOfWeekEpoch = startOfWeek.unix();

  return startOfWeekEpoch;
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// I want two lots of data (swimming and running)
const formatStravaData = (data: StravaActivity[]) => {
  const formattedStravaData = getEmptyStravaData();

  data.forEach((activity) => {
    if (activity.type === "Run") {
      formattedStravaData.running.forEach((activityToFind) => {
        if (
          activityToFind.day ===
          weekday[new Date(activity.start_date_local).getDay()]
        ) {
          activityToFind.distance =
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (
          activityToFind.day ===
          weekday[new Date(activity.start_date_local).getDay()]
        ) {
          activityToFind.run = Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    } else if (activity.type === "Swim") {
      formattedStravaData.swimming.forEach((activityToFind) => {
        if (
          activityToFind.day ===
          weekday[new Date(activity.start_date_local).getDay()]
        ) {
          activityToFind.distance =
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (
          activityToFind.day ===
          weekday[new Date(activity.start_date_local).getDay()]
        ) {
          activityToFind.swim = Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    }
  });

  return formattedStravaData;
};

const getEmptyStravaData = (): StravaGraphData => {
  const formattedStravaData: StravaGraphData = {
    swimming: [] as StravaGraphPoint[],
    running: [] as StravaGraphPoint[],
    combinedData: [] as StravaCombinedGraphData[],
  };

  formattedStravaData.running.push({ day: "Monday", distance: 0 });
  formattedStravaData.running.push({ day: "Tuesday", distance: 0 });
  formattedStravaData.running.push({ day: "Wednesday", distance: 0 });
  formattedStravaData.running.push({ day: "Thursday", distance: 0 });
  formattedStravaData.running.push({ day: "Friday", distance: 0 });
  formattedStravaData.running.push({ day: "Saturday", distance: 0 });
  formattedStravaData.running.push({ day: "Sunday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Monday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Tuesday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Wednesday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Thursday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Friday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Saturday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Sunday", distance: 0 });
  formattedStravaData.combinedData.push({ day: "Monday", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Tuesday", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Wednesday", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Thursday", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Friday", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Saturday", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Sunday", run: 0, swim: 0 });

  return formattedStravaData;
};
