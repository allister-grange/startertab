import { NextApiRequest, NextApiResponse } from "next";
import { NiwaResponse, TransformedNiwaData } from "../../types/niwa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
  } = req;
  const googleAPIKey = process.env.GOOGLE_KEEP_API_KEY;

  switch (method) {
    case "GET":
      try {
        const latLongRes = await fetch(
          `https://keep.googleapis.com/v1/notes?key=${googleAPIKey}`
        );

        if(latLongRes.status !== 200) {
          console.error(latLongRes);
          return res.status(500).json({
            success: false,
          });
        }
        const data = await latLongRes.json();
        console.log("data", data);
        

        return res.status(200).json({
          success: true,
          data: { "hello": "poo"},
        });
      } catch (error) {
        console.error(error);
        return res.status(404).json({
          success: false,
        });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false });
  }

}
