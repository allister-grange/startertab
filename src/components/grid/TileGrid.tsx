import Tile from "@/components/grid/Tile";
import { TileId } from "@/types";
import { Grid } from "@chakra-ui/react";
import React from "react";

interface TileGridProps {
  optionHovered?: TileId;
  gridGap?: string;
  tutorialProgress: number;
}

const xlArea = `"tall1 wide1 wide1 tall2 tall3"
"tall1 wide1 wide1 tall2 tall3"
"tall1 wide2 wide2 wide2 tall3"
"tall4 small1 wide3 wide3 small3"
"tall4 small2 wide3 wide3 small4"`;

const lArea = `"tall4 wide1 wide1 "
"tall4 wide1 wide1"
"wide2 wide2 wide2"
"tall2 small1 tall3"
"tall2 small2 tall3"
"wide3 wide3 tall1"
"wide3 wide3 tall1"
"small3 small4 tall1" `;

const baseArea = `"tall1 small1"
"tall1 small2"
"wide1 wide1"
"wide1 wide1"
"tall2 small3"
"tall2 small4"
"wide2 wide2"
"wide3 wide3"
"wide3 wide3"
"tall3 tall4"
"tall3 tall4"
`;

const xlColumns = "270px 250px 250px 250px 250px";
const xlRows = "150px 150px 70px 150px 150px";

const lColumns = "250px 250px 250px";
const lRows = "150px 150px 70px 160px 160px 150px 150px 150px";

const baseColumns = "230px 230px";
const baseRows =
  "160px 160px 150px 150px 160px 160px 70px 150px 150px 160px 160px";

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tutorialProgress,
}) => {
  return (
    <Grid
      marginX="auto"
      marginY="auto"
      templateAreas={{ base: baseArea, lg: lArea, xl: xlArea }}
      templateColumns={{ base: baseColumns, lg: lColumns, xl: xlColumns }}
      templateRows={{ base: baseRows, lg: lRows, xl: xlRows }}
      gap={gridGap ?? 4}
      filter={
        tutorialProgress >= 0 && tutorialProgress < 4 ? "blur(8px)" : undefined
      }
      p="4"
    >
      <Tile
        optionHovered={optionHovered === "tile1"}
        tileId={"tile1"}
        gridArea="tall1"
      />
      <Tile
        tileId={"tile2"}
        optionHovered={optionHovered === "tile2"}
        gridArea="wide1"
      />
      <Tile
        tileId={"tile3"}
        optionHovered={optionHovered === "tile3"}
        gridArea="tall2"
      />
      <Tile
        tileId={"tile4"}
        optionHovered={optionHovered === "tile4"}
        gridArea="tall3"
      />
      <Tile
        tileId={"tile5"}
        optionHovered={optionHovered === "tile5"}
        gridArea="wide2"
      />
      <Tile
        tileId={"tile6"}
        optionHovered={optionHovered === "tile6"}
        gridArea="tall4"
      />
      <Tile
        tileId={"tile7"}
        optionHovered={optionHovered === "tile7"}
        gridArea="small1"
      />
      <Tile
        tileId={"tile8"}
        optionHovered={optionHovered === "tile8"}
        gridArea="small2"
      />
      <Tile
        optionHovered={optionHovered === "tile9"}
        tileId={"tile9"}
        gridArea="wide3"
      />
      <Tile
        tileId={"tile10"}
        optionHovered={optionHovered === "tile10"}
        gridArea="small3"
      />
      <Tile
        tileId={"tile11"}
        optionHovered={optionHovered === "tile11"}
        gridArea="small4"
      />
    </Grid>
  );
};
