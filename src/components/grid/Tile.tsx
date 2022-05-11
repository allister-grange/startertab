import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileId,
  UserSettings,
  UvGraphData,
  WeatherData,
} from "@/types";
import { GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React from "react";
import { TileContainer } from "./TileContainer";

interface TileProps extends GridItemProps {
  optionHovered: TileId | undefined;
  tileId: TileId;
  stravaData: StravaGraphData;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
  weatherData: WeatherData;
  inMemorySettings: UserSettings;
}

export const Tile: React.FC<TileProps> = ({
  tileId,
  optionHovered,
  hackerNewsData,
  inMemorySettings,
  stravaData,
  weatherData,
  uvData,
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const theme = getCurrentTheme(inMemorySettings, colorMode);
  
  return (
    <GridItem
      borderRadius="15"
      transition=".3s ease-in-out"
      minW="230px"
      outline={optionHovered === tileId ? "2px solid white" : ""}
      // border="2px solid black"
      shadow={theme.globalSettings.dropShadow}
      style={optionHovered === tileId ? { transform: "scale(1.05)" } : {}}
      bg={`var(--bg-color-${tileId})`}
      {...props}
    >
      <TileContainer
        tileId={tileId}
        hackerNewsData={hackerNewsData}
        settings={inMemorySettings}
        stravaData={stravaData}
        weatherData={weatherData}
        uvData={uvData}
      />
    </GridItem>
  );
};
