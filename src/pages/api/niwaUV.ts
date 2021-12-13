import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const niwaKey = process.env.NIWA_API_KEY;
  const niwaSecret = process.env.NIWA_API_SECRET;
  const niwaURL = process.env.NIWA_API_URL;

  if(!niwaKey || !niwaSecret || !niwaURL) {
    res.status(500).send("Missing environment config data");
    return;
  }

  try {
    const niwaRes = await fetch(niwaURL + '?lat=-41.2924&long=174.7787', {
      headers: { "Content-Type": "application/json", "x-apikey": niwaKey },
    });

    const data = await niwaRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}
