import Tile from "@/components/grid/Tile";
import { TileId, UserSettings, UvGraphData } from "@/types";
import { Grid } from "@chakra-ui/react";
import React from "react";

interface TileGridProps {
  uvData: UvGraphData[];
  inMemorySettings: UserSettings;
  optionHovered?: TileId;
  gridGap?: string;
  tutorialProgress: number;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  inMemorySettings,
  uvData,
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
      p="4"
      py="8"
      maxWidth={{ "2xl": "1500px", xl: "1320px" }}
      filter={
        tutorialProgress >= 0 && tutorialProgress < 4
          ? "blur(4.5px)"
          : undefined
      }
    >
      <Tile
        rowSpan={5}
        colSpan={1}
        tileId={"tile1"}
        minW="285px"
        optionHovered={optionHovered === "tile1"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      />
      <Tile
        rowSpan={4}
        colSpan={2}
        minH="300px"
        maxH="330px"
        minW="530px"
        tileId={"tile2"}
        optionHovered={optionHovered === "tile2"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
        overflow="hidden"
      />
      <Tile
        colSpan={1}
        rowSpan={4}
        tileId={"tile3"}
        optionHovered={optionHovered === "tile3"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      />
      <Tile
        colSpan={1}
        rowSpan={5}
        tileId={"tile4"}
        optionHovered={optionHovered === "tile4"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        colSpan={3}
        rowSpan={1}
        minH="60px"
        tileId={"tile5"}
        optionHovered={optionHovered === "tile5"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={4}
        pos="relative"
        overflow="hidden"
        maxH="380px"
        tileId={"tile6"}
        optionHovered={optionHovered === "tile6"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        rowSpan={2}
        colSpan={1}
        tileId={"tile7"}
        optionHovered={optionHovered === "tile7"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        colSpan={2}
        rowSpan={4}
        overflow="hidden"
        minH="310px"
        maxH="330px"
        optionHovered={optionHovered === "tile9"}
        tileId={"tile9"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        pos="relative"
        tileId={"tile10"}
        optionHovered={optionHovered === "tile10"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        tileId={"tile8"}
        optionHovered={optionHovered === "tile8"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        tileId={"tile11"}
        optionHovered={optionHovered === "tile11"}
        inMemorySettings={inMemorySettings}
        uvData={uvData}
      ></Tile>
    </Grid>
  );
};
