import {
  WeatherCondition,
  WeatherData,
  WeatherResponse,
} from "@/types/weather";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getWeatherData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const getWeatherData = async () => {
  const weatherAPIToken = process.env.WEATHERAPI_TOKEN;

  if (!weatherAPIToken) {
    throw new Error("Missing weather api environment config data");
  }

  try {
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIToken}&q=Wellington&days=1&aqi=no&alerts=no`;

    const weatherRes = await fetch(weatherUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (weatherRes.status !== 200) {
      throw new Error("Bad request to niwa");
    }

    const data = (await weatherRes.json()) as WeatherResponse;

    let conditions: WeatherCondition = "sunny";

    switch (data.forecast.forecastday![0].day.condition.text) {
      case "Sunny":
      case "Clear":
        conditions = "sunny";
        break;
      case "Partly Cloudy":
        conditions = "partly cloudy";
        break;
      case "Cloudy":
      case "Overcast":
        conditions = "cloudy";
        break;
    }

    // can't do a search in a switch so must do an if check
    if (data.forecast.forecastday![0].day.condition.text.includes("rain")) {
      conditions = "rain";
    }

    const transformedData: WeatherData = {
      current: data.current.temp_c,
      dailyMax: data.forecast.forecastday![0].day.maxtemp_c,
      dailyMin: data.forecast.forecastday![0].day.mintemp_c,
      condition:
        data.forecast.forecastday![0].day.condition.text === "Sunny"
          ? "sunny"
          : "cloudy",
    };

    return transformedData;
  } catch (err) {
    throw new Error(err as string);
  }
};
