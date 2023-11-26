import Tile from "@/components/grid/Tile";
import { deepClone } from "@/helpers/tileHelpers";
import { tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import { themeSelector } from "@/recoil/UserSettingsSelectors";
import { TileSettings } from "@/types";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useRecoilState, useRecoilValue } from "recoil";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface TileGridProps {
  optionHovered?: number;
  gridGap?: string;
  layout: Layouts;
  tiles?: TileSettings[];
  isEditingTileGrid: boolean;
  setIsEditingTileGrid: Dispatch<SetStateAction<boolean>>;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tiles,
  layout,
  isEditingTileGrid,
  setIsEditingTileGrid,
}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const theme = useRecoilValue(themeSelector);

  const tutorialProgress = useRecoilValue(tutorialProgressAtom);

  const filter =
    tutorialProgress >= 0 && tutorialProgress < 4 ? "blur(8px)" : undefined;

  const updateTileLayoutInSettings = (newLayout: Layouts) => {
    const settingsToChange = deepClone(settings);
    const themeClone = deepClone(theme);
    themeClone.tileLayout = newLayout;
    setSettings(settingsToChange);
  };

  const removeTileFromLayout = (tileId: number) => {
    const newSettings = deepClone(settings);
    const themeToEdit = newSettings.themes.find(
      (theme) => theme.themeName === theme.themeName
    );

    if (!themeToEdit) {
      return;
    }

    // remove tile from the theme
    const themeIndexToRemove = themeToEdit.tiles.findIndex(
      (tile) => tile.tileId === tileId
    );
    themeToEdit.tiles.splice(themeIndexToRemove, 1);
    // shift all the tileId's down one index from the index above the one deleted
    for (let i = themeIndexToRemove; i < themeToEdit.tiles.length; i++) {
      themeToEdit.tiles[i].tileId--;
    }

    // remove tile from all of the layouts
    for (const layout in themeToEdit.tileLayout) {
      const layoutToEdit = themeToEdit.tileLayout[layout];
      const layoutIndexToRemove = layoutToEdit.findIndex(
        (tile) => tile.i === tileId.toString()
      );
      layoutToEdit.splice(layoutIndexToRemove, 1);
      for (let i = layoutIndexToRemove; i < layoutToEdit.length; i++) {
        layoutToEdit[i].i = (parseInt(layoutToEdit[i].i) - 1).toString();
      }
    }

    setSettings(newSettings);
  };

  return (
    <Flex minH="100vh" w="100%" maxW="1370px" mx="auto" alignItems="center">
      <Box w="100%">
        <ResponsiveGridLayout
          className="layout"
          layouts={layout}
          breakpoints={{ lg: 1280, md: 1050, sm: 850, xs: 590, xxs: 0 }}
          cols={{ lg: 5, md: 3, sm: 3, xs: 2, xxs: 2 }}
          rowHeight={68}
          margin={[
            gridGap ? parseInt(gridGap) : 16,
            gridGap ? parseInt(gridGap) : 16,
          ]}
          onLayoutChange={(currentLayout, allLayouts) =>
            updateTileLayoutInSettings(allLayouts)
          }
          style={{
            filter,
          }}
          isDraggable={isEditingTileGrid}
          isResizable={isEditingTileGrid}
          containerPadding={{
            lg: [20, 10],
            md: [160, 55],
            sm: [60, 55],
            xs: [60, 55],
          }}
          compactType={"vertical"}
        >
          {tiles &&
            tiles.map((tile, i) => (
              <CustomGridItemComponent key={tile.tileId}>
                <Tile
                  optionHovered={optionHovered === tile.tileId}
                  tileId={tile.tileId}
                  id={tile.tileId.toString()}
                  key={tile.tileId}
                  isEditingTileGrid={isEditingTileGrid}
                  setIsEditingTileGrid={setIsEditingTileGrid}
                  removeTileFromLayout={removeTileFromLayout}
                />
              </CustomGridItemComponent>
            ))}
        </ResponsiveGridLayout>
      </Box>
    </Flex>
  );
};

const CustomGridItemComponent = React.forwardRef(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      ...props
    }: BoxProps,
    ref
  ) => {
    CustomGridItemComponent.displayName = "CustomGridItemComponent";
    return (
      <div
        style={{ ...style }}
        className={className}
        ref={ref as any}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    );
  }
);
