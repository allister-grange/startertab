import { TileId } from "@/types";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface FavoriteLinksTileProps {
  tileId: TileId;
}

export const FavoriteLinksTile: React.FC<FavoriteLinksTileProps> = ({
  tileId,
}) => {
  return (
    <Box>
      <Heading>Helloo</Heading>
    </Box>
  );
};
