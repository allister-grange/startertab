import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface ClockProps extends BoxProps {
  digit: number;
}

// Will represent one mini-clock that will fill in the clock grid
export const Clock: React.FC<ClockProps> = ({ digit, key }) => {
  return <Box key={key}>{digit}</Box>;
};
