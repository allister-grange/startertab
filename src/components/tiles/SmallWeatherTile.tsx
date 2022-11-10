import {
  cityForWeatherSelector,
  tempDisplayInCelsiusSelector,
} from "@/recoil/UserSettingsSelectors";
import { SmallWeatherTileSkeleton } from "@/components/skeletons/SmallWeatherTileSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TileId, WeatherData } from "@/types";
import {
  Box,
  Center,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiRain,
} from "react-icons/wi";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface SmallWeatherTileProps {
  tileId: TileId;
}

const convertCelsiusToFahrenheit = (temp: number): number => {
  return Math.floor((temp * 9) / 5 + 32);
};

const fetcher = async (cityName: string) => {
  try {
    const res = await fetch(`/api/weather?city=${cityName}`);
    let data = (await res.json()) as WeatherData;

    if (Object.keys(data).length === 0) {
      throw new Error("That city does not exists");
    }

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const SmallWeatherTile: React.FC<SmallWeatherTileProps> = ({
  tileId,
}) => {
  const [cityForWeather, setCityForWeather] = useRecoilState(
    cityForWeatherSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];
  const [tempDisplayInCelsius, setTempDisplayInCelsius] = useRecoilState(
    tempDisplayInCelsiusSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];

  const { data, error, isLoading } = useQuery(
    ["smallWeatherTileData", cityForWeather],
    () => fetcher(cityForWeather!),
    {
      enabled: cityForWeather !== undefined && cityForWeather !== "",
    }
  );

  const color = `var(--text-color-${tileId})`;
  const [cityInput, setCityInput] = useState<string>("");
  const [displayInCelsius, setDisplayInCelsius] = useState(
    tempDisplayInCelsius === "true"
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
          Today&apos;s Weather
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
      <Center height="100%" color={color}>
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {cityForWeather}
        </Text>
        <SmallWeatherTileSkeleton />
      </Center>
    );
  } else if (data) {
    let icon;

    switch (data.condition) {
      case "cloudy":
        icon = <WiCloud size="70" />;
        break;
      case "sunny":
        icon = <WiDaySunny size="70" />;
        break;
      case "partly cloudy":
        icon = <WiDaySunnyOvercast size="70" />;
        break;
      case "rain":
        icon = <WiRain size="70" />;
        break;
    }
    toDisplay = (
      <>
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {cityForWeather}
        </Text>
        <IconButton
          mb="4"
          aria-label="Weather icon"
          _hover={{ background: "transparent", cursor: "auto" }}
          _focus={{ border: "0px", cursor: "auto" }}
          _active={{ background: "transparent", cursor: "auto" }}
          backgroundColor={"transparent"}
          icon={icon}
        />
        <Box display="flex" flexDirection="column" mt="2" mb="4">
          <Heading bg="transparent">
            {displayInCelsius
              ? data.currentTemp
              : convertCelsiusToFahrenheit(data.currentTemp!)}
            &#176;
          </Heading>
          <Box display="flex" flexDirection="row">
            <Text>
              {displayInCelsius
                ? data.dailyMinTemp
                : convertCelsiusToFahrenheit(data.dailyMinTemp)}
              &#176;
            </Text>
            <Text ml="1">
              {displayInCelsius
                ? data.dailyMaxTemp
                : convertCelsiusToFahrenheit(data.dailyMaxTemp)}
              &#176;
            </Text>
          </Box>
        </Box>
      </>
    );
  } else if (error) {
    toDisplay = <Text>Sorry, I couldn&apos;t find that city 😔</Text>;
  }

  return (
    <Center color={color} height="100%" pos="relative" p="4">
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
