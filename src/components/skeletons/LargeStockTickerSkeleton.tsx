import { Box, Center, Grid, Skeleton } from "@chakra-ui/react";
import React from "react";

interface LargeStockTickerSkeletonProps {}

export const LargeStockTickerSkeleton: React.FC<
  LargeStockTickerSkeletonProps
> = ({}) => {
  return (
    <Center height="100%">
      <Grid
        templateColumns="150px 150px"
        rowGap="150px"
        columnGap="100px"
        mb="80px"
      >
        <Box pos="relative">
          <Skeleton pos="absolute" width="70px" height="25px" />
          <Skeleton pos="absolute" width="55px" height="17px" top="32px" />
          <Skeleton pos="absolute" width="90px" height="17px" top="56px" />
        </Box>
        <Box pos="relative">
          <Skeleton pos="absolute" width="70px" height="25px" />
          <Skeleton pos="absolute" width="55px" height="17px" top="32px" />
          <Skeleton pos="absolute" width="90px" height="17px" top="56px" />
        </Box>
        <Box pos="relative">
          <Skeleton pos="absolute" width="70px" height="25px" />
          <Skeleton pos="absolute" width="55px" height="17px" top="32px" />
          <Skeleton pos="absolute" width="90px" height="17px" top="56px" />
        </Box>
        <Box pos="relative">
          <Skeleton pos="absolute" width="70px" height="25px" />
          <Skeleton pos="absolute" width="55px" height="17px" top="32px" />
          <Skeleton pos="absolute" width="90px" height="17px" top="56px" />
        </Box>
      </Grid>
    </Center>
  );
};
