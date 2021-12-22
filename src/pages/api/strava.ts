import { NextApiRequest, NextApiResponse } from "next";
import {
  StravaActivity,
  StravaGraphData,
  StravaGraphPoint,
} from "../../types/strava";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    // get the time in NZ compared to UTC
    const nzTimeZone = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Pacific/Auckland" })
    );

    // get the offset between NZ time and UTC
    const tzoffset = nzTimeZone.getTimezoneOffset() * 60000; // offset in milliseconds
    const correctedTimeZone = new Date(Date.now() - tzoffset);

    const mondayDate = Math.floor(
      getMonday(correctedTimeZone).getTime() / 1000
    );

    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${reAuthJson.access_token}&after=${mondayDate}`
    );

    const activitiesJson = await activitiesRes.json();

    const formattedStravaData = formatStravaData(activitiesJson);

    res.status(200).json(formattedStravaData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

const getMonday = (date: Date) => {
  date = new Date(date);
  let day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

// I want two lots of data (swimming and running)
const formatStravaData = (data: StravaActivity[]) => {
  const formattedStravaData = getEmptyStravaData();

  data.forEach((activity) => {
    if (activity.type === "Run") {
      formattedStravaData.running.forEach((activityToFind) => {
        if (
          activityToFind.day === getDayName(new Date(activity.start_date_local))
        ) {
          activityToFind.distance = Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    } else if (activity.type === "Swim") {
      formattedStravaData.swimming.forEach((activityToFind) => {
        if (
          activityToFind.day === getDayName(new Date(activity.start_date_local))
        ) {
          activityToFind.distance = Math.round((activity.distance / 1000) * 10) / 10;
        }
      });    }
  });

  return formattedStravaData;
};

function getDayName(date: Date) {
  return date.toLocaleDateString("en-NZ", { weekday: "long" });
}

const getEmptyStravaData = (): StravaGraphData => {
  const formattedStravaData: StravaGraphData = {
    swimming: [] as StravaGraphPoint[],
    running: [] as StravaGraphPoint[],
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

  return formattedStravaData;
};
