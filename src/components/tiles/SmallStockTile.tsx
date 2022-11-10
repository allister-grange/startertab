import { stockSelector } from "@/recoil/UserSettingsSelectors";
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
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface SmallStockTileProps {
  tileId: TileId;
}
const fetcher = async (stockName: string) => {
  try {
    const res = await fetch(`/api/stocks?stocks=${stockName}`);
    if (res.status >= 400) {
      throw new Error("Failed request");
    }

    const data = (await res.json()) as StockTickers;
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const SmallStockTile: React.FC<SmallStockTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const [stock, setStock] = useRecoilState(stockSelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
  const [stockInput, setStockInput] = useState<string>("");

  const { data, error, isLoading } = useQuery(
    ["smallStockTile", stock],
    () => fetcher(stock!),
    {
      enabled: stock !== undefined && stock !== "",
      retry: 2,
    }
  );

  const handleSubmitStockName = (e: React.FormEvent) => {
    e.preventDefault();
    setStock(stockInput);
  };

  let toDisplay;

  if (!stock) {
    toDisplay = (
      <form onSubmit={handleSubmitStockName} style={{ height: "100%" }}>
        <Text mb="4" fontSize="lg" fontWeight="500" mt="2">
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
  } else if (isLoading) {
    toDisplay = <SmallStockTickerSkeleton />;
  } else if (data && Array.isArray(data)) {
    toDisplay = data.map((stockTicker) => (
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
  } else if (error) {
    toDisplay = <Text>Sorry, I couldn&apos;t find that stock 😔</Text>;
  }

  return (
    <Center height="100%" color={color} p="4">
      {toDisplay}
      <OutlinedButton
        fontSize="11px"
        pos="absolute"
        right="0"
        bottom="0"
        borderColor={"none"}
        shadow="none"
        borderWidth="0px"
        onClick={() => setStock(undefined)}
      >
        Change stock
      </OutlinedButton>
    </Center>
  );
};
