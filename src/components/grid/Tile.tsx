import TileContainer from "@/components/grid/TileContainer";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import styles from "@/styles/Home.module.css";
import {
  HackerNewsLinkHolder,
  TileId,
  UserSettings,
  UvGraphData,
} from "@/types";
import { GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface TileProps extends GridItemProps {
  optionHovered: boolean;
  tileId: TileId;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
  inMemorySettings: UserSettings;
}

const Tile: React.FC<TileProps> = ({
  tileId,
  optionHovered,
  hackerNewsData,
  inMemorySettings,
  uvData,
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const [shadow, setShadow] = useState<string | undefined>();
  const [border, setBorder] = useState<string | undefined>();
  const [borderRadius, setBorderRadius] = useState<string | undefined>();
  const theme = getCurrentTheme(inMemorySettings, colorMode);

  useEffect(() => {
    setShadow(theme.globalSettings.dropShadow);
    setBorder(theme.globalSettings.tileBorder);
    setBorderRadius(theme.globalSettings.borderRadius);
  }, [
    colorMode,
    inMemorySettings,
    theme.globalSettings.borderRadius,
    theme.globalSettings.dropShadow,
    theme.globalSettings.tileBorder,
  ]);

  return (
    <GridItem
      borderRadius={borderRadius ?? "15"}
      transition=".3s ease-in-out"
      minW="230px"
      outline={optionHovered ? "2px solid white" : ""}
      shadow={shadow}
      border={border}
      style={optionHovered ? { transform: "scale(1.05)" } : {}}
      background={`var(--bg-color-${tileId})`}
      pos="relative"
      overflowY="scroll"
      className={styles.disableScrollbars}
      {...props}
    >
      <TileContainer
        tileId={tileId}
        hackerNewsData={hackerNewsData}
        cityForWeather={theme[tileId].cityForWeather}
        cityForUv={theme[tileId].cityForUv}
        stockName={theme[tileId].stockName}
        todoList={theme[tileId].todoList}
        tileType={theme[tileId].tileType}
        bonsaiBaseColor={theme[tileId].bonsaiBaseColor}
        bonsaiTrunkColor={theme[tileId].bonsaiTrunkColor}
      />
    </GridItem>
  );
};

export default React.memo(Tile);
