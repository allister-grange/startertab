import TileContainer from "@/components/grid/TileContainer";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import styles from "@/styles/Home.module.css";
import { TileId, UserSettingsContextInterface } from "@/types";
import { GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

interface TileProps extends GridItemProps {
  optionHovered: boolean;
  tileId: TileId;
}

const Tile: React.FC<TileProps> = ({
  tileId,
  optionHovered,
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const [shadow, setShadow] = useState<string | undefined>();
  const [border, setBorder] = useState<string | undefined>();
  const [borderRadius, setBorderRadius] = useState<string | undefined>();
  const [borderColor, setBorderColor] = useState<string | undefined>();
  const { inMemorySettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;

  const theme = getCurrentTheme(inMemorySettings, colorMode);

  React.useLayoutEffect(() => {
    setShadow(theme.globalSettings.dropShadow);
    setBorder(theme.globalSettings.tileBorder);
    setBorderRadius(theme.globalSettings.borderRadius);
    setBorderColor(theme.globalSettings.borderColor);
  }, [
    colorMode,
    inMemorySettings,
    theme.globalSettings.borderColor,
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
      borderColor={borderColor}
      style={optionHovered ? { transform: "scale(1.05)" } : {}}
      background={`var(--bg-color-${tileId})`}
      pos="relative"
      overflowY="scroll"
      className={styles.disableScrollbars}
      {...props}
    >
      <TileContainer
        tileId={tileId}
        cityForWeather={theme[tileId].cityForWeather}
        cityForUv={theme[tileId].cityForUv}
        stockName={theme[tileId].stockName}
        todoList={theme[tileId].todoList}
        tileType={theme[tileId].tileType}
        bonsaiBaseColor={theme[tileId].bonsaiBaseColor}
        bonsaiTrunkColor={theme[tileId].bonsaiTrunkColor}
        tempDisplayInCelsius={theme[tileId].tempDisplayInCelsius}
      />
    </GridItem>
  );
};

export default React.memo(Tile);
