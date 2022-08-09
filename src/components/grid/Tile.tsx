import TileContainer from "@/components/grid/TileContainer";
// import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import styles from "@/styles/Home.module.css";
import { TileId, UserSettingsContextInterface } from "@/types";
import { color, GridItem, GridItemProps, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import { userSettingState } from "../recoil/UserSettingsAtom";

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
  // const { settings } = useContext(
  //   SettingsContext
  // ) as UserSettingsContextInterface;

  // const theme = getCurrentTheme(settings, colorMode);

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
        bookings={theme[tileId].bookings}
      />
    </GridItem>
  );
};

export default React.memo(Tile);
