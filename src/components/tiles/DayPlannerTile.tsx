import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
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
    "6:00am",
    "7:00am",
    "8:00am",
    "9:00am",
    "10:00am",
    "11:00am",
    "12:00pm",
    "13:00pm",
    "14:00pm",
    "15:00pm",
    "16:00pm",
    "17:00pm",
    "18:00pm",
    "19:00pm",
    "20:00pm",
  ];

  return (
    <Box height="100%" ref={containerRef}>
      <Flex alignItems="flex-end" height="100%" justifyContent="center">
        {times.map((val, idx) => (
          <Flex key={1} width={`${width / 18}px`} height="24px" pos="relative">
            <Tooltip label={val}>
              <Box
                width="3px"
                background={color}
                height="90%"
                mx="auto"
                mt="auto"
                transition="all .2s"
                _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
              />
            </Tooltip>
            {Array.from(Array(3).keys()).map((idx) => (
              <Tooltip
                // ugly code to get the 15 minute intervals between hours
                label={`${val.split(":00")[0]}:${15 * (idx + 1)}${
                  val.split(":00")[1]
                }`}
                key={idx}
              >
                <Box
                  height={idx === 1 ? "15px" : "10px"}
                  width="2px"
                  background={color}
                  mx="auto"
                  mt="auto"
                  transition="all .2s"
                  _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                />
              </Tooltip>
            ))}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
