import { useLongPress } from "@/hooks/useLongPress";
import { themeSelector } from "@/recoil/UserSettingsSelectors";
import styles from "@/styles/Home.module.css";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, BoxProps, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
const TileContainer = dynamic(() => import("@/components/grid/TileContainer"));

export interface TileProps extends BoxProps {
  optionHovered: boolean;
  tileId: number;
  isEditingTileGrid: boolean;
  setIsEditingTileGrid: Dispatch<SetStateAction<boolean>>;
  removeTileFromLayout: (tileId: number) => void;
}

const animationKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(.5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-.5deg); }
  100% { transform: rotate(0deg); }
`;

const Tile: React.FC<TileProps> = ({
  tileId,
  optionHovered,
  isEditingTileGrid,
  setIsEditingTileGrid,
  removeTileFromLayout,
  children,
  ...props
}) => {
  const theme = useRecoilValue(themeSelector);

  const borderRadius = theme.globalSettings.borderRadius;
  const shadow = theme.globalSettings.dropShadow;
  const border = theme.globalSettings.tileBorder;
  const borderColor = theme.globalSettings.borderColor;

  const animation = `${animationKeyframes} ${
    Math.random() * 400 + 300
  }ms infinite`;

  const longPress = useLongPress(() => setIsEditingTileGrid(true), 500);

  return (
    <Box
      as={motion.div}
      animation={isEditingTileGrid ? animation : undefined}
      height="100%"
      borderRadius={borderRadius ?? "15"}
      transition=".3s ease-in-out"
      minW="230px"
      outline={optionHovered ? "2px solid white" : ""}
      shadow={shadow}
      border={border}
      borderColor={borderColor ? borderColor : theme.tiles[tileId].textColor}
      style={optionHovered ? { transform: "scale(1.05)" } : {}}
      background={`var(--bg-color-${tileId})`}
      pos="relative"
      overflowY="scroll"
      overflowX="hidden"
      cursor={isEditingTileGrid ? "move" : undefined}
      className={styles.disableScrollbars}
      {...props}
      {...longPress}
    >
      {isEditingTileGrid && (
        <SmallCloseIcon
          pos="absolute"
          top="1"
          right="1"
          cursor="pointer"
          boxSize="6"
          color={theme.tiles[tileId].textColor}
          opacity="0.6"
          ml="auto"
          onClick={() => removeTileFromLayout(tileId)}
          zIndex="100"
        />
      )}
      <TileContainer
        tileId={tileId}
        tileType={theme.tiles[tileId].tileType}
        tileSize={theme.tiles[tileId].tileSize}
      />
    </Box>
  );
};

export default React.memo(Tile);
