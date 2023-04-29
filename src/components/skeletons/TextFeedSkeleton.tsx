import { Box, Skeleton } from "@chakra-ui/react";
import { getRandomNumber } from "@/helpers/tileHelpers";
import React from "react";

export const TextFeedSkeleton: React.FC = ({}) => {
  return (
    <Box height="100%" p="2">
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(70, 95)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(70, 95)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(60, 80)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(80, 95)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(60, 75)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(60, 80)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(50, 90)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(70, 95)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(60, 80)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(65, 85)}%`} />
      <Skeleton height="15px" mt="3" width={`${getRandomNumber(90, 95)}%`} />
    </Box>
  );
};
