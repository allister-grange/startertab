import {
  UvGraphData,
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
    if (
      !req.query.city ||
      req.query.city === "undefined" ||
      req.query.city === ""
    ) {
      console.log("here");
      
      res.status(404);
    }

    console.log("pop" + req.query.city);

    const data = await getWeatherConditions(req.query.city as string);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const getWeatherConditions = async (city: string) => {
  const weatherAPIToken = process.env.WEATHERAPI_TOKEN;

  if (!weatherAPIToken) {
    throw new Error("Missing weather api environment config data");
  }

  try {
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIToken}&q=${city}&days=1&aqi=no&alerts=no`;

    const weatherRes = await fetch(weatherUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (weatherRes.status !== 200) {
      throw new Error("Bad request to weather api");
    }

    const data = (await weatherRes.json()) as WeatherResponse;

    let weatherCondition: WeatherCondition = "sunny";
    const weatherConditionFromApi =
      data.forecast.forecastday![0].day.condition.text;

    if (
      weatherConditionFromApi === "Sunny" ||
      weatherConditionFromApi == "Clear"
    ) {
      weatherCondition = "sunny";
    } else if (weatherConditionFromApi === "Partly cloudy") {
      weatherCondition = "partly cloudy";
    } else if (
      weatherConditionFromApi === "Cloudy" ||
      weatherConditionFromApi == "Overcast"
    ) {
      weatherCondition = "cloudy";
    } else if (
      data.forecast.forecastday![0].day.condition.text.includes("rain") ||
      data.forecast.forecastday![0].day.condition.text.includes("Rain")
    ) {
      weatherCondition = "rain";
    }

    const transformedData: WeatherData = {
      current: data.current.temp_c,
      dailyMax: data.forecast.forecastday![0].day.maxtemp_c,
      dailyMin: data.forecast.forecastday![0].day.mintemp_c,
      condition: weatherCondition,
    };

    return transformedData;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getUVData = async (): Promise<UvGraphData[]> => {
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
    let uvData = [] as UvGraphData[];
    data.forecast.forecastday![0].hour!.forEach((hour) => {
      uvData.push({
        value: hour.uv,
        time: hour.time.split(" ")[1],
      });
    });

    return uvData;
  } catch (err) {
    throw new Error(err as string);
  }
};
