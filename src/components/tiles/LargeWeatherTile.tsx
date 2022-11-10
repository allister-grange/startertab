import {
  cityForWeatherSelector,
  tempDisplayInCelsiusSelector,
} from "@/recoil/UserSettingsSelectors";
import { LargeWeatherTileSkeleton } from "@/components/skeletons/LargeWeatherTileSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TileId } from "@/types";
import { WeatherData } from "@/types/weather";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiRain,
} from "react-icons/wi";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface LargeWeatherTileProps {
  tileId: TileId;
}

interface DaysWeatherProps {
  weatherData: WeatherData;
  displayInCelsius?: boolean;
}

const convertCelsiusToFahrenheit = (temp: number): number => {
  return Math.floor((temp * 9) / 5 + 32);
};

const fetcher = async (cityName: string) => {
  try {
    const res = await fetch(`/api/weather?city=${cityName}&weekForecast=true`);
    let data = (await res.json()) as WeatherData[];

    if (Object.keys(data).length === 0) {
      throw new Error("That city does not exists");
    }

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const convertDateToWeekday = (date: string) => {
  let d = new Date(date);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[d.getDay()].slice(0, 3);
};

export const DaysWeather: React.FC<DaysWeatherProps> = ({
  weatherData,
  displayInCelsius,
}) => {
  let icon;

  switch (weatherData.condition) {
    case "cloudy":
      icon = <WiCloud size="90" />;
      break;
    case "sunny":
      icon = <WiDaySunny size="90" />;
      break;
    case "partly cloudy":
      icon = <WiDaySunnyOvercast size="90" />;
      break;
    case "rain":
      icon = <WiRain size="90" />;
      break;
  }

  return (
    <Flex flexDir="column">
      <Text>{convertDateToWeekday(weatherData.date)}</Text>
      <IconButton
        height="80px"
        aria-label="Weather icon"
        _hover={{ background: "transparent", cursor: "auto" }}
        _focus={{ border: "0px", cursor: "auto" }}
        _active={{ background: "transparent", cursor: "auto" }}
        backgroundColor={"transparent"}
        icon={icon}
      />
      <Box display="flex" flexDirection="column" mb="4" alignItems="center">
        <Box display="flex" flexDirection="row">
          <Text fontSize="18px" mr="1">
            {displayInCelsius
              ? weatherData.dailyMinTemp
              : convertCelsiusToFahrenheit(weatherData.dailyMinTemp)}
            &#176;
          </Text>
          <Text ml="1" fontSize="18px">
            {displayInCelsius
              ? weatherData.dailyMaxTemp
              : convertCelsiusToFahrenheit(weatherData.dailyMaxTemp)}
            &#176;
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export const LargeWeatherTile: React.FC<LargeWeatherTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;
  const [cityForWeather, setCityForWeather] = useRecoilState(
    cityForWeatherSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];
  const [tempDisplayInCelsius, setTempDisplayInCelsius] = useRecoilState(
    tempDisplayInCelsiusSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];

  const [cityInput, setCityInput] = useState<string>("");
  const [displayInCelsius, setDisplayInCelsius] = useState(
    tempDisplayInCelsius === "true"
  );

  const { data, error, isLoading } = useQuery(
    ["largeWeatherTileData", cityForWeather],
    () => fetcher(cityForWeather!),
    {
      enabled: cityForWeather != undefined && cityForWeather !== "",
    }
  );

  const handleSubmitCityName = (e: React.FormEvent) => {
    e.preventDefault();
    setCityForWeather(cityInput);
  };

  const changeTemperatureDisplayUnits = (celsius: boolean) => {
    setDisplayInCelsius(celsius);
    setTempDisplayInCelsius(celsius ? "true" : "false");
  };

  let toDisplay;

  if (!cityForWeather) {
    toDisplay = (
      <form onSubmit={handleSubmitCityName}>
        <Text pos="absolute" top="4" left="3" fontSize="lg" fontWeight="500">
          Weather Overview
        </Text>
        <InputGroup>
          <InputRightElement
            className="InputRight"
            _hover={{ cursor: "pointer" }}
            onClick={handleSubmitCityName}
          >
            Go
          </InputRightElement>
          <Input
            name="City Name"
            placeholder="City name"
            value={cityInput}
            borderColor={color}
            _placeholder={{ color: color }}
            onChange={(e) => setCityInput(e.target.value)}
          />
        </InputGroup>
      </form>
    );
  } else if (isLoading) {
    toDisplay = (
      <Flex justifyContent={"space-around"} width="90%">
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {cityForWeather}
        </Text>
        <LargeWeatherTileSkeleton />
      </Flex>
    );
  } else if (data && data.length > 0) {
    toDisplay = (
      <Flex justifyContent={"space-around"} width="90%">
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {cityForWeather}
        </Text>
        <DaysWeather
          weatherData={data[0]}
          displayInCelsius={displayInCelsius}
        />
        <DaysWeather
          weatherData={data[1]}
          displayInCelsius={displayInCelsius}
        />
        <DaysWeather
          weatherData={data[2]}
          displayInCelsius={displayInCelsius}
        />
      </Flex>
    );
  } else if (error) {
    toDisplay = <Text>Sorry, I couldn&apos;t find that city 😔</Text>;
  }

  return (
    <Center color={color} height="100%" pos="relative">
      {toDisplay}
      <Box
        pos="absolute"
        right="2"
        bottom="1.5"
        fontSize="11px"
        color={color}
        opacity={0.6}
      >
        <OutlinedButton
          size="xs"
          onClick={() => setCityForWeather(undefined)}
          shadow="none"
        >
          Change city
        </OutlinedButton>
        |&nbsp;
        <OutlinedButton
          size="xxs"
          shadow="none"
          onClick={() => changeTemperatureDisplayUnits(false)}
        >
          °F
        </OutlinedButton>
        &nbsp;
        <OutlinedButton
          size="xxs"
          shadow="none"
          onClick={() => changeTemperatureDisplayUnits(true)}
        >
          °C
        </OutlinedButton>
      </Box>
    </Center>
  );
};
