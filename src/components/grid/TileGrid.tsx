import Tile from "@/components/grid/Tile";
import { defaultTiles } from "@/helpers/themes";
import { deepClone } from "@/helpers/tileHelpers";
import { TileId, TileShape } from "@/types";
import { Grid, useEditable } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";

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
  const currentlyDraggingElement = useRef<EventTarget | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  if (!tiles) {
    tiles = defaultTiles;
  }

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
    <Grid
      marginX="auto"
      marginY="auto"
      templateColumns={"repeat(5, 1fr)"}
      gridTemplateRows={"150px 150px 70px 150px 150px"}
      gap={gridGap ?? 4}
      filter={
        tutorialProgress >= 0 && tutorialProgress < 4 ? "blur(8px)" : undefined
      }
      p="4"
      px="8"
      id="grid"
      ref={gridRef}
    >
      {tiles.map((tile) => (
        <Tile
          key={tile.tileId}
          optionHovered={optionHovered === tile.tileId}
          tileId={tile.tileId}
          gridArea={tile.gridArea}
          onDragOver={onDragOverEvent}
          onDragStart={onDragStartEvent}
          onDragEnd={onDragStopEvent}
          id={tile.tileId}
        />
      ))}
    </Grid>
  );
};
