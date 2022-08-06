import { SmallStockTickerSkeleton } from "@/components/skeletons/SmallStockTickerSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettingsContextInterface } from "@/types";
import { StockTickers } from "@/types/stocks";
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, { useContext, useEffect, useState } from "react";

interface SmallStockTileProps {
  tileId: TileId;
  stockNameFromSettings?: string;
}

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: StockTickers;
  error?: unknown;
  stockTickerName?: string;
};

export const SmallStockTile: React.FC<SmallStockTileProps> = ({
  tileId,
  stockNameFromSettings,
}) => {
  const color = `var(--text-color-${tileId})`;
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const [stockInput, setStockInput] = useState<string>("");
  const [state, setState] = useState<State>({
    status: "waitingForInput",
  });

  const getStocks = React.useCallback(async (stockName: string) => {
    setState((state) => ({
      ...state,
      status: "loading",
    }));

    try {
      const res = await fetch(`/api/stocks?stocks=${stockName}`);
      const data = (await res.json()) as StockTickers;

      setState((state) => ({
        ...state,
        status: "resolved",
        data,
        stockTickerName: stockName,
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
    theme[tileId].stockName = stockInput;

    setSettings(newSettings);
  };

  useEffect(() => {
    const currentTheme = getCurrentTheme(settings, colorMode);
    const stockFromSettings = currentTheme[tileId].stockName;

    if (!stockFromSettings) {
      setState({ status: "waitingForInput" });
    } else if (
      stockFromSettings !== state.stockTickerName &&
      stockFromSettings
    ) {
      getStocks(stockFromSettings);
    }
  }, [
    colorMode,
    stockNameFromSettings,
    settings,
    tileId,
    state.stockTickerName,
    getStocks,
  ]);

  let toDisplay;

  if (state.status === "loading") {
    toDisplay = <SmallStockTickerSkeleton />;
  } else if (state.status === "resolved") {
    toDisplay = state.data?.map((stockTicker) => (
      <Flex
        flexDir="column"
        key={stockTicker?.ticker}
        borderRadius="10px"
        mb="4"
        mr="2"
      >
        <Heading size="lg">{stockTicker?.ticker.toUpperCase()}</Heading>
        <Text fontSize="lg" opacity="0.9">{`$${stockTicker?.c}`}</Text>
        <Box>
          <Text color={stockTicker?.dp! > 0 ? "green" : "#F1676D"}>
            {stockTicker?.d} ({stockTicker?.dp}%)
          </Text>
        </Box>
      </Flex>
    ));
  } else if (state.status === "waitingForInput") {
    toDisplay = (
      <form onSubmit={handleSubmitStockName}>
        <Text pos="absolute" top="4" left="3" fontSize="lg" fontWeight="500">
          Stock Display
        </Text>
        <InputGroup>
          <InputRightElement
            className="InputRight"
            _hover={{ cursor: "pointer" }}
            onClick={handleSubmitStockName}
          >
            Go
          </InputRightElement>
          <Input
            name="Stock Name"
            placeholder="Stock name"
            value={stockInput}
            borderColor={color}
            _placeholder={{ color: color }}
            onChange={(e) => setStockInput(e.target.value)}
          />
        </InputGroup>
      </form>
    );
  } else if (state.status === "rejected") {
    toDisplay = <Text>Sorry, that stock doesn&apos;t exist 😔&nbsp;</Text>;
  }

  return (
    <Center height="100%" color={color} p="4">
      {toDisplay}
      <OutlinedButton
        size="xs"
        pos="absolute"
        right="2"
        bottom="2"
        borderColor={"none"}
        shadow="none"
        borderWidth="1px"
        onClick={() =>
          setState((state) => ({ ...state, status: "waitingForInput" }))
        }
      >
        Change stock
      </OutlinedButton>
    </Center>
  );
};
