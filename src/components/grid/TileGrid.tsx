import Tile from "@/components/grid/Tile";
import { TileId } from "@/types";
import { Grid } from "@chakra-ui/react";
import React from "react";

interface TileGridProps {
  optionHovered?: TileId;
  gridGap?: string;
  tutorialProgress: number;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tutorialProgress,
}) => {
  return (
    <Grid
      h="100%"
      templateRows="repeat(9, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={gridGap ?? 4}
      maxH="760px"
      marginX="auto"
      marginY="auto"
      p="4"
      py="8"
      maxWidth={{ "2xl": "1500px", xl: "1320px" }}
      filter={
        tutorialProgress >= 0 && tutorialProgress < 4 ? "blur(8px)" : undefined
      }
    >
      {/* <Tile
        rowSpan={5}
        colSpan={1}
        tileId={"tile1"}
        minW="285px"
        optionHovered={optionHovered === "tile1"}
      />
      <Tile
        rowSpan={4}
        colSpan={2}
        minH="300px"
        maxH="330px"
        minW="480px"
        tileId={"tile2"}
        optionHovered={optionHovered === "tile2"}
        overflow="hidden"
      />
      <Tile
        colSpan={1}
        rowSpan={4}
        tileId={"tile3"}
        optionHovered={optionHovered === "tile3"}
      /> */}
      <Tile
        colSpan={1}
        rowSpan={5}
        tileId={"tile4"}
        optionHovered={optionHovered === "tile4"}
      ></Tile>
      {/* <Tile
        colSpan={3}
        rowSpan={1}
        minH="60px"
        tileId={"tile5"}
        optionHovered={optionHovered === "tile5"}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={4}
        pos="relative"
        overflow="hidden"
        maxH="380px"
        tileId={"tile6"}
        optionHovered={optionHovered === "tile6"}
      ></Tile>
      <Tile
        rowSpan={2}
        colSpan={1}
        tileId={"tile7"}
        optionHovered={optionHovered === "tile7"}
      ></Tile>
      <Tile
        colSpan={2}
        rowSpan={4}
        overflow="hidden"
        minH="310px"
        maxH="330px"
        optionHovered={optionHovered === "tile9"}
        tileId={"tile9"}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        pos="relative"
        tileId={"tile10"}
        optionHovered={optionHovered === "tile10"}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        tileId={"tile8"}
        optionHovered={optionHovered === "tile8"}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        tileId={"tile11"}
        optionHovered={optionHovered === "tile11"}
      ></Tile> */}
    </Grid>
  );
};
