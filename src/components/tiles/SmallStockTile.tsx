import { stockSelector } from "@/components/recoil/UserSettingsSelectors";
import { SmallStockTickerSkeleton } from "@/components/skeletons/SmallStockTickerSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TileId } from "@/types";
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface SmallStockTileProps {
  tileId: TileId;
}

type Status = "loading" | "resolved" | "waitingForInput" | "rejected";
type State = {
  status: Status;
  data?: StockTickers;
  error?: unknown;
  stockTickerName?: string;
};

export const SmallStockTile: React.FC<SmallStockTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const [stock, setStock] = useRecoilState(stockSelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
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
    setStock(stockInput);
  };

  useEffect(() => {
    if (!stock) {
      setState({ status: "waitingForInput" });
    } else {
      getStocks(stock);
    }
  }, [tileId, getStocks, stock]);

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
        fontSize="11px"
        pos="absolute"
        right="0"
        bottom="-2"
        borderColor={"none"}
        shadow="none"
        borderWidth="0px"
        onClick={() =>
          setState((state) => ({ ...state, status: "waitingForInput" }))
        }
      >
        Change stock
      </OutlinedButton>
    </Center>
  );
};
