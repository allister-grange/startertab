import Tile from "@/components/grid/Tile";
import { defaultGridLayout } from "@/helpers/gridLayout";
import { TileSettings } from "@/types";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface TileGridProps {
  optionHovered?: number;
  gridGap?: string;
  tutorialProgress: number;
  layout: Layouts;
  tiles?: TileSettings[];
  isEditingTiles: boolean;
  setIsEditingTiles: Dispatch<SetStateAction<boolean>>;
  updateTileLayoutInSettings: (newLayout: Layouts) => void;
  removeTileFromLayout: (tileId: number) => void;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tutorialProgress,
  tiles,
  layout,
  removeTileFromLayout,
  isEditingTiles,
  updateTileLayoutInSettings,
  setIsEditingTiles,
}) => {
  const filter =
    tutorialProgress >= 0 && tutorialProgress < 4 ? "blur(8px)" : undefined;
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
          isDraggable={isEditingTiles}
          isResizable={isEditingTiles}
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
                  isEditingTiles={isEditingTiles}
                  setIsEditingTiles={setIsEditingTiles}
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
