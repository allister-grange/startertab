import { NextApiRequest, NextApiResponse } from "next";
import {
  NiwaResponse, TransformedNiwaData
} from "../../types/niwa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const niwaKey = process.env.NIWA_API_KEY;
  const niwaSecret = process.env.NIWA_API_SECRET;
  const niwaURL = process.env.NIWA_API_URL;

  if (!niwaKey || !niwaSecret || !niwaURL) {
    res.status(500).send("Missing environment config data");
    return;
  }

  try {
    const niwaRes = await fetch(niwaURL + "?lat=-41.2924&long=174.7787", {
      headers: { "Content-Type": "application/json", "x-apikey": niwaKey },
    });

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

  data.products[0].values.slice(0, 35).forEach((val) => {
    timeValuePairs.push({ name: val.time, sunny: val.value, cloudy: 0 });
  });

  data.products[1].values.slice(0, 35).forEach((val, idx) => {
    timeValuePairs[idx].cloudy = val.value;
  });

  console.log(timeValuePairs);

  return timeValuePairs;
};
