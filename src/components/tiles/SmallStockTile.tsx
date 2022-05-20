import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettingsContextInterface } from "@/types";
import { StockTickers } from "@/types/stocks";
import {
  Box,
  Center,
  Heading,
  useColorMode,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

interface SmallStockTileProps {
  tileId: TileId;
}

type Status = "loading" | "resolved" | "reload" | "waitingForInput";
type State = {
  status: Status;
  data?: StockTickers;
  error?: unknown;
  inputSubreddit?: string;
};

export const SmallStockTile: React.FC<SmallStockTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const [stockNames, setStockNames] = useState<string | undefined>(() => {
    return "MSFT";
    // const theme = getCurrentTheme(settings, colorMode);
    // return theme[tileId].subReddit;
  });
  const [state, setState] = useState<State>({
    status: "waitingForInput",
  });

  useEffect(() => {
    const getStocks = async () => {
      setState((state) => ({
        ...state,
        status: "loading",
      }));

      try {
        const res = await fetch(`/api/stocks?stocks=${stockNames}`);
        const data = (await res.json()) as StockTickers;

        setState((state) => ({ ...state, status: "resolved", data }));
      } catch {
        setState((state) => ({ ...state, error: "Couldn't fetch stock data" }));
      }
    };

    getStocks();
  }, [stockNames]);

  return (
    <Center height="100%" color={color}>
      {state.data?.map((stockTicker) => (
        <Flex flexDir="column" key={stockTicker?.ticker} borderRadius="10px">
          <Heading size="lg">{stockTicker?.ticker}</Heading>
          <Text fontSize="lg" opacity="0.9">{`$${stockTicker?.c}`}</Text>
          <Box ml="2">
            <Text color={stockTicker?.dp! > 0 ? "green" : "#F1676D"}>
              {stockTicker?.d} ({stockTicker?.dp}%)
            </Text>
          </Box>
        </Flex>
      ))}
    </Center>
  );
};
