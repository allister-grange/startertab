import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileId,
  UserSettings,
  UvGraphData,
  WeatherData
} from "@/types";
import styles from "@/styles/Home.module.css";
import { GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TileContainer } from "./TileContainer";

interface TileProps extends GridItemProps {
  optionHovered: boolean;
  tileId: TileId;
  stravaData: StravaGraphData;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
  inMemorySettings: UserSettings;
}

const Tile: React.FC<TileProps> = ({
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
  const [border, setBorder] = useState<string | undefined>();

  useEffect(() => {
    const theme = getCurrentTheme(inMemorySettings, colorMode);
    setShadow(theme.globalSettings.dropShadow);
    setBorder(theme.globalSettings.tileBorder);
  }, [colorMode, inMemorySettings]);

  return (
    <GridItem
      borderRadius="15"
      transition=".3s ease-in-out"
      minW="230px"
      outline={optionHovered ? "2px solid white" : ""}
      shadow={shadow}
      border={border}
      style={optionHovered ? { transform: "scale(1.05)" } : {}}
      bg={`var(--bg-color-${tileId})`}
      pos="relative"
      overflowY="scroll"
      className={styles.disableScrollbars}
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

export default React.memo(Tile);
