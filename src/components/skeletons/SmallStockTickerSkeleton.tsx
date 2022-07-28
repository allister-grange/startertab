import { Center, Skeleton } from "@chakra-ui/react";
import React from "react";

export const SmallStockTickerSkeleton: React.FC = ({}) => {
  return (
    <Center height="100%" pos="relative" mr="10" mb="2">
      <Skeleton pos="absolute" width="70px" height="25px" top="18px" />
      <Skeleton
        pos="absolute"
        width="55px"
        height="15px"
        top="50px"
        left="-35px"
      />
      <Skeleton
        pos="absolute"
        width="90px"
        height="15px"
        top="70px"
        left="-35px"
      />
    </Center>
  );
};
