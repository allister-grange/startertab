import { uvCitySelector } from "@/recoil/UserSettingsSelectors";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TileId, UvGraphData } from "@/types";
import {
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface UvGraphProps {
  tileId: TileId;
}

const dummyUvData = () => {
  const dummyData = [] as UvGraphData[];
  for (let i = 0; i < 24; i++) {
    dummyData.push({
      value: 0,
      time: `${i}:00`,
    });
  }

  return dummyData;
};

const fetcher = async (cityName: string) => {
  try {
    const res = await fetch(`/api/weather?city=${cityName}&uv=true`);
    let data = (await res.json()) as UvGraphData[];

    if (Object.keys(data).length === 0) {
      throw new Error(`There's no such city as ${cityName}`);
    }
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const UvGraphTile: React.FC<UvGraphProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const [city, setCity] = useRecoilState(uvCitySelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
  const [cityInput, setCityInput] = useState<string>("");

  const { data, error, isLoading } = useQuery(
    ["uvGraph", city],
    () => fetcher(city!),
    {
      enabled: city !== undefined && city !== "",
    }
  );

  const handleSubmitCityName = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(cityInput);
  };

  let toDisplay;

  if (!city) {
    toDisplay = (
      <form onSubmit={handleSubmitCityName}>
        <InputGroup mt="20" width="60%" mx="auto">
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
      <Box mt="4" ml="-10">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dummyUvData()}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke={color} />
            <YAxis stroke={color} />
            <Line
              dataKey="value"
              stroke={color}
              type="basis"
              strokeWidth={2}
              width={5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  } else if (data) {
    toDisplay = (
      <Box mt="4" ml="-10">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke={color} />
            <YAxis stroke={color} />
            <Line
              dataKey="value"
              stroke={color}
              type="basis"
              strokeWidth={2}
              width={5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  } else if (error) {
    toDisplay = (
      <Center height="80%">
        <Text>Sorry, I couldn&apos;t find that city 😔</Text>
      </Center>
    );
  }

  return (
    <Box p="6" color={color} height="100%">
      <Heading fontSize="2xl">UV Index</Heading>
      {toDisplay}
      <OutlinedButton
        size="xs"
        pos="absolute"
        right="4"
        top="4"
        color={color}
        borderColor={color}
        onClick={() => setCity(undefined)}
      >
        Change city
      </OutlinedButton>
    </Box>
  );
};
