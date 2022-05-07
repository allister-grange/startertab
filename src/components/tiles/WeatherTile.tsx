import { WeatherData } from "@/types/weather";
import {
  Box,
  Center,
  Heading,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  WiCloud,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiRain,
} from "react-icons/wi";
import React from "react";

interface WeatherTileProps {
  weatherData: WeatherData;
}

export const WeatherTile: React.FC<WeatherTileProps> = ({ weatherData }) => {
  const { toggleColorMode } = useColorMode();
  const color = "var(--text-color-tile8)";

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
    <Center color={color} height="100%">
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
