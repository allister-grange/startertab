import { TileId } from "@/types";
import { WeatherData } from "@/types/weather";
import {
  Box,
  Center,
  Heading,
  IconButton,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiRain,
} from "react-icons/wi";

interface WeatherTileProps {
  tileId: TileId;
  city?: string;
}

export const WeatherTile: React.FC<WeatherTileProps> = ({ city, tileId }) => {
  const { toggleColorMode } = useColorMode();
  const color = `var(--text-color-${tileId})`;
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/weather?city=${city}`);
        let data = (await res.json());

        if(Object.keys(data).length === 0) {
          setError(`There's no such city as "${city}"`);
          return;
        }
        

        setWeatherData(data);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Couldn't get the weather from the API");
      }
    };

    fetchWeatherData();
  }, [city]);

  if (error) {
    return (
      <Center height="100%" p="8">
        <Heading size="sm" color={color}>
          {error}
        </Heading>
      </Center>
    );
  }
  
  if (!weatherData) {
    return (
      <Center height="100%">
        <Spinner size="md" color={color} />
      </Center>
    );
  } else if (!city || city === "") {
    return (
      <Center height="100%" p="8">
        <Heading size="sm" color={color}>
          Check your city name in the settings
        </Heading>
      </Center>
    );
  }

  let icon;

  switch (weatherData.condition) {
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

  return (
    <Center color={color} height="100%" pos="relative">
      <Text size="xs" opacity="0.4" pos="absolute" bottom="2" right="2">
        {city}
      </Text>
      <IconButton
        aria-label={`Switch color themes`}
        _hover={{ background: "transparent" }}
        _focus={{ border: "0px" }}
        _active={{ background: "transparent" }}
        backgroundColor={"transparent"}
        onClick={toggleColorMode}
        icon={icon}
      />
      <Box display="flex" flexDirection="column" mt="2">
        <Heading bg="transparent">{weatherData.current}&#176;</Heading>
        <Box display="flex" flexDirection="row">
          <Text>{weatherData.dailyMin}&#176;</Text>
          <Text ml="1">{weatherData.dailyMax}&#176;</Text>
        </Box>
      </Box>
    </Center>
  );
};
