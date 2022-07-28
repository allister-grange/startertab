import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

export const LargeWeatherTileSkeleton: React.FC = ({}) => {
  return (
    <>
      <Box pos="relative">
        <Skeleton
          pos="absolute"
          top="-35px"
          left="-6px"
          height="20px"
          width="30px"
          borderRadius="5px"
        />
        <Skeleton width="70px" height="70px" borderRadius="10px" />
        <Skeleton
          pos="absolute"
          top="78px"
          height="20px"
          width="70px"
          borderRadius="5px"
        />
      </Box>
      <Box pos="relative">
        <Skeleton
          pos="absolute"
          top="-35px"
          left="-6px"
          height="20px"
          width="30px"
          borderRadius="5px"
        />
        <Skeleton width="70px" height="70px" borderRadius="10px" />
        <Skeleton
          pos="absolute"
          top="78px"
          height="20px"
          width="70px"
          borderRadius="5px"
        />
      </Box>
      <Box pos="relative">
        <Skeleton
          pos="absolute"
          top="-35px"
          left="-6px"
          height="20px"
          width="30px"
          borderRadius="5px"
        />
        <Skeleton width="70px" height="70px" borderRadius="10px" />
        <Skeleton
          pos="absolute"
          top="78px"
          height="20px"
          width="70px"
          borderRadius="5px"
        />
      </Box>
    </>
  );
};
