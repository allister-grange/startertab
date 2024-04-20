import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import { graphStockSelector } from "@/recoil/UserSettingsSelectors";
import { CandleGraphPoint, FinnhubCandleResponse } from "@/types/stocks";
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface StockGraphTileProps {
  tileId: number;
}

const dummyData: CandleGraphPoint[] = [
  {
    date: "0/0/2000",
    amount: 0,
  },
  {
    date: "1/0/2000",
    amount: 0,
  },
  {
    date: "2/0/2000",
    amount: 0,
  },
  {
    date: "3/0/2000",
    amount: 0,
  },
  {
    date: "4/0/2000",
    amount: 0,
  },
];

const fetcher = async (stockName: string) => {
  try {
    const res = await fetch(`/api/stocks/candle?stock=${stockName}`);
    if (res.status >= 400) {
      throw new Error("Failed request");
    }

    const data = (await res.json()) as FinnhubCandleResponse;

    // format the data for x,y points on a graph
    const graphPoints: CandleGraphPoint[] = [];
    for (let i = 0; i < data.c.length; i++) {
      graphPoints.push({
        amount: data.o[i],
        date: new Date(data.t[i] * 1000).toLocaleDateString(),
      });
    }

    return graphPoints;
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
      <Center h="90%">
        <form onSubmit={handleSubmitStockName} style={{ marginBottom: "2rem" }}>
          <Text mb="4" fontSize="lg" fontWeight="500" mt="2" textAlign="center">
            Stock Graph Display
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
              placeholder="Stock symbol"
              value={stockInput}
              borderColor={textColor}
              _placeholder={{ color: textColor }}
              onChange={(e) => setStockInput(e.target.value)}
            />
          </InputGroup>
        </form>
      </Center>
    );
  } else if (error) {
    toDisplay = (
      <Center h="70%">
        <Text fontSize="lg">
          Sorry, I couldn&apos;t find the stock {stock} 😔
        </Text>
      </Center>
    );
  } else {
    toDisplay = (
      <Box mt="6" ml="-8">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data ? data : dummyData}>
            <XAxis dataKey="date" tick={{ fontSize: 8 }} stroke={textColor} />
            <YAxis
              stroke={textColor}
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fontSize: 8 }}
              tickFormatter={(number) => `$${number}`}
            />
            <Line
              dataKey="amount"
              stroke={textColor}
              type="monotone"
              strokeWidth={2}
              width={5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  }

  return (
    <Box height="100%" color={textColor} p="4" textAlign="center">
      {/* <Text fontSize="2xl" lineHeight="1.2" fontWeight="700">{stock?.toLocaleUpperCase()}</Text> */}
      {/* {toDisplay} */}
      <Center height="95%" flexDir="column" p="20">
        <Text fontSize="xl" fontWeight="700" lineHeight="1.2">
          Sorry, this is now a paid feature on the API this site uses 😔
        </Text>
        <Text mt="4">
          Consider{" "}
          <Link
            href="https://www.buymeacoffee.com/startertab"
            style={{ textDecoration: "underline" }}
          >
            buying me a coffee
          </Link>
          &nbsp;so that I can afford to get off the free tier
        </Text>
      </Center>
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
    </Box>
  );
};
