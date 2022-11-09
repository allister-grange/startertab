import { getCurrentTheme } from "@/helpers/settingsHelpers";
import styles from "@/styles/Home.module.css";
import { TileId } from "@/types";
import { GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import dynamic from "next/dynamic";
const TileContainer = dynamic(() => import("@/components/grid/TileContainer"));

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
  const userSettings = useRecoilValue(userSettingState);
  const theme = getCurrentTheme(userSettings, colorMode);

  const borderRadius = theme.globalSettings.borderRadius;
  const shadow = theme.globalSettings.dropShadow;
  const border = theme.globalSettings.tileBorder;
  const borderColor = theme.globalSettings.borderColor;

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
      overflowX="hidden"
      className={styles.disableScrollbars}
      {...props}
    >
      <TileContainer tileId={tileId} tileType={theme[tileId].tileType} />
    </GridItem>
  );
};

export default React.memo(Tile);
