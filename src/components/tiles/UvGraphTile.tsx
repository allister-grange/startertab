import { uvCitySelector } from "@/components/recoil/UserSettingsSelectors";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TileId, UvGraphData } from "@/types";
import {
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface UvGraphProps {
  tileId: TileId;
}

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: UvGraphData[];
  error?: string;
  cityNameOfData?: string;
};

export const UvGraphTile: React.FC<UvGraphProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const [city, setCity] = useRecoilState(uvCitySelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
  const [cityInput, setCityInput] = useState<string>("");
  const [state, setState] = useState<State>({
    status: city ? "loading" : "waitingForInput",
  });

  const fetchUVData = React.useCallback(async (cityName: string) => {
    try {
      setState((state) => ({ ...state, status: "loading" }));
      const res = await fetch(`/api/weather?city=${cityName}&uv=true`);
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
    if (!city) {
      setState({ status: "waitingForInput" });
    } else {
      fetchUVData(city);
    }
  }, [city, fetchUVData, tileId]);

  const handleSubmitCityName = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(cityInput);
  };

  let toDisplay;

  if (state.status === "loading") {
    toDisplay = (
      <Center height="80%" color={color}>
        <Spinner size="lg" />
      </Center>
    );
  } else if (state.status === "resolved" && state.data) {
    toDisplay = (
      <Box mt="4" ml="-10">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={state.data}>
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
  } else if (state.status === "waitingForInput") {
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
  } else if (state.status === "rejected") {
    toDisplay = (
      <Center height="80%">
        <Text>Sorry, that city doesn&apos;t exist 😔</Text>
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
        onClick={() =>
          setState((state) => ({ ...state, status: "waitingForInput" }))
        }
      >
        Change city
      </OutlinedButton>
    </Box>
  );
};
