import { LargeWeatherTileSkeleton } from "@/components/skeletons/LargeWeatherTileSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettingsContextInterface } from "@/types";
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
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiRain,
} from "react-icons/wi";
import { useRecoilState } from "recoil";
import {
  cityForWeatherSelector,
  redditFeedSelector,
  tempDisplayInCelsiusSelector,
} from "@/components/recoil/UserSettingsSelectors";

interface LargeWeatherTileProps {
  tileId: TileId;
}

interface DaysWeatherProps {
  weatherData: WeatherData;
  displayInCelsius?: boolean;
}

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: WeatherData[];
  error?: string;
  cityNameOfData?: string;
};

const convertCelsiusToFahrenheit = (temp: number): number => {
  return Math.floor((temp * 9) / 5 + 32);
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
  );
  const [tempDisplayInCelsius, setTempDisplayInCelsius] = useRecoilState(
    tempDisplayInCelsiusSelector(tileId)
  );

  const [cityInput, setCityInput] = useState<string>("");
  const [state, setState] = useState<State>({
    status: cityForWeather ? "loading" : "waitingForInput",
  });
  const [displayInCelsius, setDisplayInCelsius] = useState(
    tempDisplayInCelsius === "true"
  );

  const fetchWeatherData = React.useCallback(async (cityName: string) => {
    try {
      setState((state) => ({ ...state, status: "loading" }));
      const res = await fetch(
        `/api/weather?city=${cityName}&weekForecast=true`
      );
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
    // const currentTheme = getCurrentTheme(settings, colorMode);
    // const cityFromSettings = currentTheme[tileId].cityForWeather;

    if (!cityForWeather) {
      setState({ status: "waitingForInput" });
    } else {
      fetchWeatherData(cityForWeather);
    }
  }, [cityForWeather, fetchWeatherData]);

  const handleSubmitCityName = (e: React.FormEvent) => {
    e.preventDefault();
    setCityForWeather(cityInput);
  };

  const changeTemperatureDisplayUnits = (celsius: boolean) => {
    setDisplayInCelsius(celsius);
    setTempDisplayInCelsius(celsius ? "true" : "false");
  };

  let toDisplay;

  if (state.status === "loading") {
    toDisplay = (
      <Flex justifyContent={"space-around"} width="90%">
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {state.cityNameOfData}
        </Text>
        <LargeWeatherTileSkeleton />
      </Flex>
    );
  } else if (state.status === "resolved" && state.data) {
    toDisplay = (
      <Flex justifyContent={"space-around"} width="90%">
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {state.cityNameOfData}
        </Text>
        <DaysWeather
          weatherData={state.data[0]}
          displayInCelsius={displayInCelsius}
        />
        <DaysWeather
          weatherData={state.data[1]}
          displayInCelsius={displayInCelsius}
        />
        <DaysWeather
          weatherData={state.data[2]}
          displayInCelsius={displayInCelsius}
        />
      </Flex>
    );
  } else if (state.status === "waitingForInput") {
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
  } else if (state.status === "rejected") {
    toDisplay = <Text>Sorry, that city doesn&apos;t exist 😔</Text>;
  }

  return (
    <Center color={color} height="100%" pos="relative">
      {toDisplay}
      <Box
        pos="absolute"
        right="2"
        bottom="1.5"
        fontSize={"11px"}
        color={color}
        opacity={0.6}
      >
        <OutlinedButton
          size="xs"
          onClick={() =>
            setState((state) => ({ ...state, status: "waitingForInput" }))
          }
        >
          Change city
        </OutlinedButton>
        |&nbsp;
        <OutlinedButton
          size="xxs"
          onClick={() => changeTemperatureDisplayUnits(false)}
        >
          °F
        </OutlinedButton>
        &nbsp;
        <OutlinedButton
          size="xxs"
          onClick={() => changeTemperatureDisplayUnits(true)}
        >
          °C
        </OutlinedButton>
      </Box>
    </Center>
  );
};
