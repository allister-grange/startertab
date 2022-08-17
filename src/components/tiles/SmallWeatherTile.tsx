import {
  cityForWeatherSelector,
  tempDisplayInCelsiusSelector,
} from "@/components/recoil/UserSettingsSelectors";
import { SmallWeatherTileSkeleton } from "@/components/skeletons/SmallWeatherTileSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TileId } from "@/types";
import { WeatherData } from "@/types/weather";
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
import React, { useEffect, useState } from "react";
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

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: WeatherData;
  error?: string;
  cityNameOfData?: string;
};

const convertCelsiusToFahrenheit = (temp: number): number => {
  return Math.floor((temp * 9) / 5 + 32);
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

  const color = `var(--text-color-${tileId})`;
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
    setCityForWeather(cityInput);
  };

  let toDisplay;

  if (state.status === "loading") {
    toDisplay = (
      <Center height="100%" color={color}>
        <Text size="xs" opacity="0.4" pos="absolute" bottom="2" left="3">
          {state.cityNameOfData}
        </Text>
        <SmallWeatherTileSkeleton />
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
          <Heading bg="transparent">
            {displayInCelsius
              ? state.data.currentTemp
              : convertCelsiusToFahrenheit(state.data.currentTemp!)}
            &#176;
          </Heading>
          <Box display="flex" flexDirection="row">
            <Text>
              {displayInCelsius
                ? state.data.dailyMinTemp
                : convertCelsiusToFahrenheit(state.data.dailyMinTemp)}
              &#176;
            </Text>
            <Text ml="1">
              {displayInCelsius
                ? state.data.dailyMaxTemp
                : convertCelsiusToFahrenheit(state.data.dailyMaxTemp)}
              &#176;
            </Text>
          </Box>
        </Box>
      </>
    );
  } else if (state.status === "waitingForInput") {
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
  } else if (state.status === "rejected") {
    toDisplay = <Text>Sorry, that city doesn&apos;t exist 😔</Text>;
  }

  return (
    <Center color={color} height="100%" pos="relative" p="4">
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
          shadow="none"
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
