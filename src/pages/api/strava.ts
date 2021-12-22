import { NextApiRequest, NextApiResponse } from "next";
import {
  HackerNewsApiItem,
  HackerNewsLinkHolder,
} from "../../types/hackernews";

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

    const tzOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    const localTimeZone = new Date(Date.now() - tzOffset);

    const mondayDate = Math.floor(getMonday(localTimeZone).getTime() / 1000);

    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${reAuthJson.access_token}&after=${mondayDate}`
    );

    const activitiesJson = await activitiesRes.json();

    // console.log(activitiesJson);

    res.status(200).json(activitiesJson);
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
