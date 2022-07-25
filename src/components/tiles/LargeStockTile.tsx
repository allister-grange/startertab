import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettingsContextInterface } from "@/types";
import { FinnhubStockResponse, StockTickers } from "@/types/stocks";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, { useContext, useEffect, useState } from "react";

interface LargeStockTileProps {
  tileId: TileId;
}

interface StockDisplayProps {
  stockTicker?: FinnhubStockResponse;
}

interface InputDisplayProps {
  setStockInputs: React.Dispatch<React.SetStateAction<string[]>>;
  color: string;
  stockInputs: string[];
  index: number;
}

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: StockTickers;
  error?: unknown;
  stockTickerNames?: string[];
};

const StockDisplay: React.FC<StockDisplayProps> = ({ stockTicker }) => {
  let textDisplay;

  // bung stock name, it's an error on the users behalf
  if (stockTicker?.c === 0) {
    textDisplay = (
      <Box>
        <Text color="#F1676D" fontSize="xs">
          Sorry, that stock doesn&apos;t exist 😔
        </Text>
      </Box>
    );
  } else {
    textDisplay = (
      <Box>
        <Text color={stockTicker?.dp! > 0 ? "green" : "#F1676D"}>
          {stockTicker?.d} ({stockTicker?.dp}%)
        </Text>
      </Box>
    );
  }

  return (
    <Flex
      flexDir="column"
      key={stockTicker?.ticker}
      borderRadius="10px"
      mb="4"
      mr="2"
    >
      <Heading size="lg">{stockTicker?.ticker.toUpperCase()}</Heading>
      <Text fontSize="md" opacity="0.9">{`$${stockTicker?.c}`}</Text>
      {textDisplay}
    </Flex>
  );
};

const InputDisplay: React.FC<InputDisplayProps> = ({
  setStockInputs,
  color,
  stockInputs,
  index,
}) => {
  const changeStockInputs = (newInputValue: string) => {
    const inputsToChange = [...stockInputs];
    inputsToChange[index] = newInputValue;

    setStockInputs(inputsToChange);
  };

  return (
    <InputGroup mt="4">
      <Input
        name="Stock Name"
        placeholder="Stock name"
        value={stockInputs[index]}
        borderColor={color}
        _placeholder={{ color: color }}
        onChange={(e) => changeStockInputs(e.target.value)}
      />
    </InputGroup>
  );
};

export const LargeStockTile: React.FC<LargeStockTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const [stockInputs, setStockInputs] = useState<string[]>([]);
  const [state, setState] = useState<State>({
    status: "waitingForInput",
  });

  const getStocks = React.useCallback(async (stockNames: string) => {
    setState((state) => ({
      ...state,
      status: "loading",
    }));

    try {
      const res = await fetch(`/api/stocks?stocks=${stockNames}`);
      const data = (await res.json()) as StockTickers;

      setState((state) => ({
        ...state,
        status: "resolved",
        data: data,
      }));
    } catch {
      setState((state) => ({
        ...state,
        error: "Couldn't fetch stock data",
        status: "rejected",
      }));
    }
  }, []);

  const handleSubmitStockName = (e: React.FormEvent) => {
    e.preventDefault();
    let newSettings = cloneDeep(settings);
    const theme = getCurrentTheme(newSettings, colorMode);
    theme[tileId].stockName = stockInputs.join(",");

    setState((state) => ({ ...state, stockTickerNames: stockInputs }));
    setSettings(newSettings);
    getStocks(stockInputs.join(","));
  };

  useEffect(() => {
    const currentTheme = getCurrentTheme(settings, colorMode);
    const stocksFromSettings = currentTheme[tileId].stockName;

    if (!stocksFromSettings) {
      setState({ status: "waitingForInput" });
    } else if (
      stocksFromSettings !== state.stockTickerNames?.join(",") &&
      stocksFromSettings
    ) {
      getStocks(stocksFromSettings);
      setStockInputs(stocksFromSettings.split(","));
    }
  }, [colorMode, settings, tileId, state.stockTickerNames, getStocks]);

  let toDisplay;

  if (state.status === "loading") {
    toDisplay = (
      <Center height="100%" color={color}>
        <Grid templateColumns="150px 150px" rowGap="80px" columnGap="100px">
          <Skeleton width="60px" height="60px" borderRadius="10px" />
          <Skeleton width="60px" height="60px" borderRadius="10px" />
          <Skeleton width="60px" height="60px" borderRadius="10px" />
          <Skeleton width="60px" height="60px" borderRadius="10px" />
        </Grid>
      </Center>
    );
  } else if (state.status === "resolved") {
    toDisplay = (
      <Grid templateColumns={"150px 150px"} rowGap="30px" columnGap={"100px"}>
        {state.data?.map((stockTicker) => (
          <StockDisplay key={stockTicker?.ticker} stockTicker={stockTicker} />
        ))}
      </Grid>
    );
  } else if (state.status === "rejected") {
    toDisplay = <Text size="xs">Sorry, that stock doesn&apos;t exist 😔</Text>;
  }

  return (
    <Center height="100%" width="100%" color={color} p="8">
      {toDisplay}
      {state.status === "waitingForInput" && (
        <form onSubmit={handleSubmitStockName}>
          <Flex justifyContent={"center"} alignItems="center">
            <Box>
              <InputDisplay
                color={color}
                setStockInputs={setStockInputs}
                stockInputs={stockInputs}
                index={0}
              />
              <InputDisplay
                color={color}
                setStockInputs={setStockInputs}
                stockInputs={stockInputs}
                index={1}
              />
              <InputDisplay
                color={color}
                setStockInputs={setStockInputs}
                stockInputs={stockInputs}
                index={2}
              />
              <InputDisplay
                color={color}
                setStockInputs={setStockInputs}
                stockInputs={stockInputs}
                index={3}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                ml="4"
                background="transparent"
                border={`1px solid ${color}`}
              >
                Load stocks
              </Button>
            </Box>
          </Flex>
        </form>
      )}
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
        Change stocks
      </Button>
    </Center>
  );
};
