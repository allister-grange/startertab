import { NextApiRequest, NextApiResponse } from "next";
import { NiwaResponse, TransformedNiwaData } from "../../types/niwa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const niwaKey = process.env.NIWA_API_KEY;
  const niwaSecret = process.env.NIWA_API_SECRET;
  const niwaURL = process.env.NIWA_API_URL;

  if (!niwaKey || !niwaSecret || !niwaURL) {
    return res.status(500).send("Missing environment config data");
  }

  try {
    const niwaRes = await fetch(niwaURL + "?lat=-41.2924&long=174.7787", {
      headers: { "Content-Type": "application/json", "x-apikey": niwaKey },
    });

    if (niwaRes.status !== 200) {
      return res.status(500).json("Bad request to niwa");
    }

    const data = (await niwaRes.json()) as NiwaResponse;

    const transformedData = transformNiwaData(data);

    res.status(200).json(transformedData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

const transformNiwaData = (data: NiwaResponse): TransformedNiwaData[] => {
  const timeValuePairs = [] as TransformedNiwaData[];

  data.products[0].values.forEach((val) => {
    timeValuePairs.push({
      name: val.time,
      sunny: val.value,
      cloudy: 0,
    });
  });

  data.products[1].values.forEach((val, idx) => {
    timeValuePairs[idx].cloudy = val.value;
  });

  // no way to select what dates/times you want, have to pull down 3 days of data
  // we only want to parse the midday values
  const timeValuePairsFromMidday = timeValuePairs.filter((timeValuePair) => {
    const date = new Date(timeValuePair.name);
    const hours = date.getHours();
    const inNext24Hours =
      date.getTime() <=
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime();
    return hours >= 6 && hours <= 21 && inNext24Hours;
  });

  // convert the date to a friendly name for the graph
  timeValuePairsFromMidday.forEach((val, idx) => {
    const time = timeValuePairs[idx].name;
    const date = new Date(time);
    timeValuePairs[idx].name = date.toLocaleTimeString();
  });

  return timeValuePairsFromMidday;
};
