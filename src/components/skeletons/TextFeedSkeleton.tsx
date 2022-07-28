import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

export const TextFeedSkeleton: React.FC = ({}) => {
  return (
    <Box height="100%" p="2">
      <Skeleton height="15px" mt="3" width="90%" />
      <Skeleton height="15px" mt="3" />
      <Skeleton height="15px" mt="3" width="75%" />
      <Skeleton height="15px" mt="3" width="65%" />
      <Skeleton height="15px" mt="3" width="85%" />
      <Skeleton height="15px" mt="3" width="95%" />
      <Skeleton height="15px" mt="3" width="75%" />
      <Skeleton height="15px" mt="3" />
      <Skeleton height="15px" mt="3" width="70%" />
      <Skeleton height="15px" mt="3" width="85%" />
      <Skeleton height="15px" mt="3" width="95%" />
    </Box>
  );
};
