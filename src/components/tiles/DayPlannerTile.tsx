import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useLayoutEffect, useRef, useState } from "react";

interface DayPlannerTileProps {
  tileId: string;
}

export const DayPlannerTile: React.FC<DayPlannerTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(containerRef.current!.offsetWidth);
  }, []);

  // I could have a map over each hour of the day, and use position absolute
  // to evenly space things using a multiplier

  // width / 24
  const times = [
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];

  return (
    <Box height="100%" ref={containerRef}>
      <Flex alignItems="flex-end" height="100%" justifyContent="center">
        {times.map((val, idx) => (
          <Flex key={1} width={`${width / 18}px`} height="20px" pos="relative">
            {Array.from(Array(3).keys()).map((idx) => (
              <Box
                key={idx}
                height={idx === 1 ? "15px" : "10px"}
                width="2px"
                background={color}
                mx="auto"
                mt="auto"
              />
            ))}
            <Box width="3px" background={color} height="100%" mx="auto"></Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
