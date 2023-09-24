import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import {
  graphStockSelector,
  stockSelector,
} from "@/recoil/UserSettingsSelectors";
import {
  Box,
  Center,
  color,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue, useRecoilState, SetterOrUpdater } from "recoil";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SmallStockTickerSkeleton } from "../skeletons/SmallStockTickerSkeleton";
import { useQuery } from "@tanstack/react-query";
import { StockTickers } from "@/types/stocks";

interface StockGraphTileProps {
  tileId: number;
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

export const StockGraphTile: React.FC<StockGraphTileProps> = ({ tileId }) => {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const textColor = `var(--text-color-${tileId})`;
  const [stock, setStock] = useRecoilState(graphStockSelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
  const [stockInput, setStockInput] = useState<string>("");

  const { data, error, isLoading } = useQuery(
    ["graphStockTile", stock],
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
      <form onSubmit={handleSubmitStockName} style={{ marginBottom: "2rem" }}>
        <Text mb="4" fontSize="lg" fontWeight="500" mt="2" textAlign="center">
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
            borderColor={textColor}
            _placeholder={{ color: textColor }}
            onChange={(e) => setStockInput(e.target.value)}
          />
        </InputGroup>
      </form>
    );
  } else if (isLoading) {
    toDisplay = <SmallStockTickerSkeleton />;
  } else if (data && Array.isArray(data)) {
    toDisplay = data.map((stockTicker) => (
      <Flex flexDir="column" key={stockTicker?.ticker} borderRadius="10px">
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

  console.log(sidebarOpen);

  return (
    <Center height="100%" color={textColor} p="4">
      {toDisplay}
      {sidebarOpen && (
        <OutlinedButton
          fontSize="xs"
          pos="absolute"
          right="0"
          bottom="-1"
          shadow="none"
          borderWidth="0px"
          opacity={0.6}
          onClick={() => setStock(undefined)}
        >
          Change stock
        </OutlinedButton>
      )}
    </Center>
  );
};
