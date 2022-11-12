import { ThemeSettings, TileId } from "@/types";
import { Box, Grid, Skeleton } from "@chakra-ui/react";
import React from "react";

const xlArea = `"tall1 wide1 wide1 tall2 tall3"
"tall1 wide1 wide1 tall2 tall3"
"tall1 wide2 wide2 wide2 tall3"
"tall4 small1 wide3 wide3 small3"
"tall4 small2 wide3 wide3 small4"`;
const xlColumns = "65px 65px 65px 65px 65px";
const xlRows = "33px 33px 22px 33px 33px";

export const PreviewTileSkeleton: React.FC = () => {
  return (
    <Box
      maxW="420px"
      minW="450px"
      maxH="400px"
      minH="400px"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box bg="white" w="100%" minH="420px"></Box>
    </Box>
  );
};
