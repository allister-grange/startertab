import { ThemeSettings, TileId } from "@/types";
import { Box, Grid } from "@chakra-ui/react";
import React from "react";

interface ThemePreviewProps {
  theme: ThemeSettings;
}

const xlArea = `"tall1 wide1 wide1 tall2 tall3"
"tall1 wide1 wide1 tall2 tall3"
"tall1 wide2 wide2 wide2 tall3"
"tall4 small1 wide3 wide3 small3"
"tall4 small2 wide3 wide3 small4"`;
const xlColumns = "65px 65px 65px 65px 65px";
const xlRows = "33px 33px 22px 33px 33px";

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  const borderRadius = parseInt(theme.globalSettings.borderRadius ?? "1") / 5;
  const shadow = theme.globalSettings.dropShadow;
  const border = theme.globalSettings.tileBorder;
  const borderColor = theme.globalSettings.borderColor;

  return (
    <Box
      maxW="420px"
      minW="420px"
      maxH="250px"
      minH="250px"
      background={theme.globalSettings.backgroundColor}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Grid
        marginX="auto"
        marginY="auto"
        templateAreas={xlArea}
        templateColumns={xlColumns}
        templateRows={xlRows}
        gap={theme.globalSettings.gridGap ?? 4}
        p="4"
      >
        <Box
          background={`${theme["tile1" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="tall1"
        />
        <Box
          background={`${theme["tile2" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="wide1"
        />
        <Box
          background={`${theme["tile3" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="tall2"
        />
        <Box
          background={`${theme["tile4" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="tall3"
        />
        <Box
          background={`${theme["tile5" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="wide2"
        />
        <Box
          background={`${theme["tile6" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="tall4"
        />
        <Box
          background={`${theme["tile7" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="small1"
        />
        <Box
          background={`${theme["tile8" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="small2"
        />
        <Box
          background={`${theme["tile9" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="wide3"
        />
        <Box
          background={`${theme["tile10" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="small3"
        />
        <Box
          background={`${theme["tile11" as TileId].backgroundColor}`}
          shadow={shadow}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          gridArea="small4"
        />
      </Grid>
    </Box>
  );
};
