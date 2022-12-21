import Tile from "@/components/grid/Tile";
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
  tiles: TileSettings[];
  isEditingTiles: boolean;
  setIsEditingTiles: Dispatch<SetStateAction<boolean>>;
  updateTileLayoutInSettings: (newLayout: Layouts) => void;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tutorialProgress,
  tiles,
  layout,
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
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 5, md: 10, sm: 6, xs: 4, xxs: 2 }}
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
        >
          {tiles.map((tile, i) => (
            <CustomGridItemComponent key={tile.tileId}>
              <Tile
                optionHovered={optionHovered === tile.tileId}
                tileId={tile.tileId}
                id={tile.tileId.toString()}
                key={tile.tileId}
                isEditingTiles={isEditingTiles}
                setIsEditingTiles={setIsEditingTiles}
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
