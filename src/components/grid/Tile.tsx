import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileId,
  UserSettings,
  UvGraphData,
  WeatherData
} from "@/types";
import { GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TileContainer } from "./TileContainer";

interface TileProps extends GridItemProps {
  optionHovered: TileId | undefined;
  tileId: TileId;
  stravaData: StravaGraphData;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
  inMemorySettings: UserSettings;
}

export const Tile: React.FC<TileProps> = ({
  tileId,
  optionHovered,
  hackerNewsData,
  inMemorySettings,
  stravaData,
  uvData,
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const [shadow, setShadow] = useState<string | undefined>();

  useEffect(() => {
    const theme = getCurrentTheme(inMemorySettings, colorMode);
    setShadow(theme.globalSettings.dropShadow);
  }, [colorMode, inMemorySettings]);

  return (
    <GridItem
      borderRadius="15"
      transition=".3s ease-in-out"
      minW="230px"
      outline={optionHovered === tileId ? "2px solid white" : ""}
      shadow={shadow}
      style={optionHovered === tileId ? { transform: "scale(1.05)" } : {}}
      bg={`var(--bg-color-${tileId})`}
      {...props}
    >
      <TileContainer
        tileId={tileId}
        hackerNewsData={hackerNewsData}
        settings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
      />
    </GridItem>
  );
};
