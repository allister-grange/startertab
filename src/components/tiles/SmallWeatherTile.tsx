import { SmallWeatherTileSkeleton } from "@/components/skeletons/SmallWeatherTileSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { isEditingTileGridAtom } from "@/recoil/SidebarAtoms";
import {
  cityForWeatherSelector,
  tempDisplayInCelsiusSelector,
} from "@/recoil/UserSettingsSelectors";
import { WeatherData } from "@/types";
import {
  Box,
  Center,
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
  WiNightAltPartlyCloudy,
  WiNightAltRain,
  WiNightClear,
  WiNightCloudy,
  WiRain,
} from "react-icons/wi";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface SmallWeatherTileProps {
  tileId: number;
}

const getReadableWeatherTemp = (
  temp: number,
  tempDisplayInCelsius: boolean
) => {
  if (tempDisplayInCelsius) {
    return Math.floor(temp);
  } else {
    return Math.floor((temp * 9) / 5 + 32);
  }
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
  const isEditing = useRecoilValue(isEditingTileGridAtom);
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
    const currentTime = new Date().getHours();

    if (currentTime >= 19 || currentTime < 6) {
      switch (data.condition) {
        case "cloudy":
          icon = <WiNightCloudy size="70" color={color} />;
          break;
        case "sunny":
          icon = <WiNightClear size="70" color={color} />;
          break;
        case "partly cloudy":
          icon = <WiNightAltPartlyCloudy size="70" color={color} />;
          break;
        case "rain":
          icon = <WiNightAltRain size="70" color={color} />;
          break;
      }
    } else {
      switch (data.condition) {
        case "cloudy":
          icon = <WiCloud size="70" color={color} />;
          break;
        case "sunny":
          icon = <WiDaySunny size="70" color={color} />;
          break;
        case "partly cloudy":
          icon = <WiDaySunnyOvercast size="70" color={color} />;
          break;
        case "rain":
          icon = <WiRain size="70" color={color} />;
          break;
      }
    }
    toDisplay = (
      <>
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
          <Text fontWeight="700" fontSize="4xl" lineHeight="1.2">
            {getReadableWeatherTemp(data.currentTemp!, displayInCelsius)}
            &#176;
          </Text>
          <Box display="flex" flexDirection="row">
            <Text>
              {getReadableWeatherTemp(data.dailyMinTemp, displayInCelsius)}
              &#176;
            </Text>
            <Text ml="1">
              {getReadableWeatherTemp(data.dailyMaxTemp, displayInCelsius)}
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
      {isEditing && (
        <>
          <Text size="xs" opacity="0.5" pos="absolute" bottom="2" left="3">
            {cityForWeather}
          </Text>

          <Box
            pos="absolute"
            right="4"
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
        </>
      )}
    </Center>
  );
};
