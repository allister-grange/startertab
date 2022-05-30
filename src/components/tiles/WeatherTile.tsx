import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettingsContextInterface } from "@/types";
import { WeatherData } from "@/types/weather";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, { useContext, useEffect, useState } from "react";
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

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: WeatherData;
  error?: string;
  cityNameOfData?: string;
};

export const WeatherTile: React.FC<WeatherTileProps> = ({ city, tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const [cityInput, setCityInput] = useState<string>("");
  const [state, setState] = useState<State>({
    status: city ? "loading" : "waitingForInput",
  });

  const fetchWeatherData = React.useCallback(async (cityName: string) => {
    try {
      const res = await fetch(`/api/weather?city=${cityName}`);
      let data = await res.json();

      if (Object.keys(data).length === 0) {
        setState((state) => ({
          ...state,
          error: `There's no such city as "${cityName}"`,
          status: "rejected",
        }));
        return;
      }

      setState((state) => ({
        ...state,
        data,
        error: undefined,
        status: "resolved",
        cityNameOfData: cityName,
      }));
    } catch (error) {
      console.error(error);
      setState((state) => ({
        ...state,
        error: `Failed to retrieve data from API`,
        status: "rejected",
      }));
    }
  }, []);

  useEffect(() => {
    const currentTheme = getCurrentTheme(settings, colorMode);
    const cityFromSettings = currentTheme[tileId].cityForWeather;

    if (!cityFromSettings) {
      setState({ status: "waitingForInput" });
    } else if (cityFromSettings !== state.cityNameOfData && cityFromSettings) {
      fetchWeatherData(cityFromSettings);
    }
  }, [colorMode, fetchWeatherData, settings, state.cityNameOfData, tileId]);

  const handleSubmitCityName = (e: React.FormEvent) => {
    e.preventDefault();
    let newSettings = cloneDeep(settings);
    const theme = getCurrentTheme(newSettings, colorMode);
    theme[tileId].cityForWeather = cityInput;

    setSettings(newSettings);
  };

  let toDisplay;

  if (state.status === "loading") {
    toDisplay = (
      <Center height="100%" color={color}>
        <Spinner size="lg" />
      </Center>
    );
  } else if (state.status === "resolved" && state.data) {
    let icon;

    switch (state.data.condition) {
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
          {state.cityNameOfData}
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
          <Heading bg="transparent">{state.data.current}&#176;</Heading>
          <Box display="flex" flexDirection="row">
            <Text>{state.data.dailyMin}&#176;</Text>
            <Text ml="1">{state.data.dailyMax}&#176;</Text>
          </Box>
        </Box>
      </>
    );
  } else if (state.status === "waitingForInput") {
    toDisplay = (
      <form onSubmit={handleSubmitCityName}>
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
  } else if (state.status === "rejected") {
    toDisplay = <Text>Sorry, that city doesn&apos;t exist 😔</Text>;
  }

  return (
    <Center color={color} height="100%" pos="relative">
      {toDisplay}
      <Button
        size="xs"
        pos="absolute"
        right="2"
        bottom="2"
        color={color}
        backgroundColor="transparent"
        _focus={{
          backgroundColor: "transparent",
          outline: `1px solid ${color}`,
        }}
        _hover={{
          backgroundColor: "transparent",
          outline: `1px solid ${color}`,
        }}
        onClick={() =>
          setState((state) => ({ ...state, status: "waitingForInput" }))
        }
      >
        Change city
      </Button>
    </Center>
  );
};
