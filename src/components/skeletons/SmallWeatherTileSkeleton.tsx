import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

export const SmallWeatherTileSkeleton: React.FC = ({}) => {
  return (
    <Box pos="relative" ml="8" mb="2">
      <Skeleton
        width="50px"
        height="38px"
        pos="absolute"
        top="-30px"
        left="-2"
      />
      <Skeleton width="50px" height="15px" pos="absolute" top="4" left="-2" />
      <Skeleton
        width="55px"
        height="60px"
        pos="absolute"
        top="-30px"
        left="-70px"
      />
    </Box>
  );
};
