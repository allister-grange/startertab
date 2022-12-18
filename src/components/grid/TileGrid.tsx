import Tile from "@/components/grid/Tile";
import { gridLayout } from "@/helpers/gridLayout";
import { defaultTiles } from "@/helpers/themes";
import { TileId, TileShape } from "@/types";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface TileGridProps {
  optionHovered?: TileId;
  gridGap?: string;
  tutorialProgress: number;
  tiles: TileShape[];
  updateTileOrderInSettings: (newTiles: TileShape[]) => void;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tutorialProgress,
  tiles,
  updateTileOrderInSettings,
}) => {
  if (!tiles) {
    tiles = defaultTiles;
  }

  const currentlyDraggingElement = useRef<EventTarget | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [layout, setLayout] = useState(gridLayout);

  const onDragOverEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (currentlyDraggingElement.current == null) {
      return;
    }
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const target = e.currentTarget;

    const dragEl = currentlyDraggingElement.current;

    if (!(dragEl instanceof HTMLElement)) {
      return;
    }

    if (target && target !== dragEl && target.nodeName == "DIV") {
      if (target.classList.contains("inside")) {
        e.stopPropagation();
      } else {
        //getBoundingClientRect contains location-info about the element (relative to the viewport)
        var targetPos = target.getBoundingClientRect();
        //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
        var overlapping =
          (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) >
            0.5 ||
          (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) >
            0.5;

        const grid = dragEl.parentElement;

        if (!grid) {
          return;
        }

        // this re-orders the DOM, won't help me after a re-fresh....
        // I could keep the tileIds in an array that persists to disk, should I worry about this after fixing?
        grid.insertBefore(
          dragEl,
          (overlapping && target.nextSibling) || target
        );
      }
    }
  };

  const onDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
    currentlyDraggingElement.current = e.target;

    if (!(currentlyDraggingElement.current instanceof HTMLElement)) {
      return;
    }

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "Text",
      currentlyDraggingElement.current.textContent!
    );
  };

  const onDragStopEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!gridRef) {
      return;
    }

    // on the drop of a tile, go through the order of the divs and save them to the settings
    const childrenDivs = gridRef.current?.children;
    const newTileOrder: TileShape[] = [];

    for (const divIndexString in childrenDivs) {
      const divIndex = parseInt(divIndexString);

      if (!divIndex && divIndex !== 0) {
        continue;
      }

      const childRef = childrenDivs.item(divIndex);
      if (childRef) {
        newTileOrder.push({
          tileId: childRef.id as unknown as TileId,
          gridArea: window
            .getComputedStyle(childRef)
            .getPropertyValue("grid-area"),
        });
      }
    }

    updateTileOrderInSettings(newTileOrder);
  };

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
          isDraggable
          isResizable
        >
          {tiles.map((tile, i) => (
            <CustomGridItemComponent key={tile.tileId}>
              <Tile
                optionHovered={optionHovered === tile.tileId}
                tileId={tile.tileId}
                gridArea={tile.gridArea}
                id={tile.tileId}
                key={tile.tileId}
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
      >
        {props.children}
      </div>
    );
  }
);
