import Tile from "@/components/grid/Tile";
import { TileId } from "@/types";
import { Grid } from "@chakra-ui/react";
import React, { useRef } from "react";

interface TileGridProps {
  optionHovered?: TileId;
  gridGap?: string;
  tutorialProgress: number;
  tileOrder: number[];
  updateTileOrder: (id: number, idx: number) => void;
}

const xlArea = `"tall1 wide1 wide1 tall2 tall3"
"tall1 wide1 wide1 tall2 tall3"
"tall1 wide2 wide2 wide2 tall3"
"tall4 small1 wide3 wide3 small3"
"tall4 small2 wide3 wide3 small4"`;

const lArea = `"tall4 wide1 wide1 "
"tall4 wide1 wide1"
"wide2 wide2 wide2"
"tall2 small1 tall3"
"tall2 small2 tall3"
"wide3 wide3 tall1"
"wide3 wide3 tall1"
"small3 small4 tall1" `;

const baseArea = `"tall1 small1"
"tall1 small2"
"wide1 wide1"
"wide1 wide1"
"tall2 small3"
"tall2 small4"
"wide2 wide2"
"wide3 wide3"
"wide3 wide3"
"tall3 tall4"
"tall3 tall4"
`;

const xlColumns = "270px 250px 250px 250px 250px";
const xlRows = "150px 150px 70px 150px 150px";

const lColumns = "250px 250px 250px";
const lRows = "150px 150px 70px 160px 160px 150px 150px 150px";

const baseColumns = "230px 230px";
const baseRows =
  "160px 160px 150px 150px 160px 160px 70px 150px 150px 160px 160px";

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  gridGap,
  tutorialProgress,
  tileOrder,
  updateTileOrder,
}) => {
  // const
  const currentlyDraggingElement = useRef<EventTarget | null>(null);

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
  };

  return (
    <Grid
      marginX="auto"
      marginY="auto"
      // templateAreas={{ base: baseArea, lg: lArea, xl: xlArea }}
      // templateColumns={{ base: baseColumns, lg: lColumns, xl: xlColumns }}
      // templateRows={{ base: baseRows, lg: lRows, xl: xlRows }}
      templateColumns={"repeat(5, 1fr)"}
      gridTemplateRows={"150px 150px 70px 150px 150px"}
      gap={gridGap ?? 4}
      filter={
        tutorialProgress >= 0 && tutorialProgress < 4 ? "blur(8px)" : undefined
      }
      p="4"
      px="8"
      id="grid"
    >
      <Tile
        optionHovered={optionHovered === "tile1"}
        tileId={"tile1"}
        // gridArea="tall1"
        gridArea="span 3 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="1"
      />
      <Tile
        tileId={"tile2"}
        optionHovered={optionHovered === "tile2"}
        // gridArea="wide1"
        gridArea="span 2 / span 2"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="2"
      />
      <Tile
        tileId={"tile3"}
        optionHovered={optionHovered === "tile3"}
        // gridArea="tall2"
        gridArea="span 2 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="3"
      />
      <Tile
        tileId={"tile4"}
        optionHovered={optionHovered === "tile4"}
        // gridArea="tall3"
        gridArea="span 3 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="4"
      />
      <Tile
        tileId={"tile5"}
        optionHovered={optionHovered === "tile5"}
        // gridArea="wide2"
        gridArea="span 1 / span 3"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="5"
      />
      <Tile
        tileId={"tile6"}
        optionHovered={optionHovered === "tile6"}
        // gridArea="tall4"
        gridArea="span 2 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="6"
      />
      <Tile
        tileId={"tile7"}
        optionHovered={optionHovered === "tile7"}
        // gridArea="small1"
        gridArea="span 1 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="7"
      />
      <Tile
        tileId={"tile8"}
        optionHovered={optionHovered === "tile8"}
        // gridArea="small2"
        gridArea="span 1 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="8"
      />
      <Tile
        optionHovered={optionHovered === "tile9"}
        tileId={"tile9"}
        // gridArea="wide3"
        gridArea="span 2 / span 2"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="9"
      />
      <Tile
        tileId={"tile10"}
        optionHovered={optionHovered === "tile10"}
        // gridArea="small3"
        gridArea="span 1 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="10"
      />
      <Tile
        tileId={"tile11"}
        optionHovered={optionHovered === "tile11"}
        // gridArea="small4"
        gridArea="span 1 / span 1"
        cursor="move"
        onDragOver={onDragOverEvent}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragStopEvent}
        draggable="true"
        id="11"
      />
    </Grid>
  );
};

/* still in progress */

// function sortable(section, onUpdate){
//   var dragEl, nextEl, newPos, dragGhost;

//   let oldPos = [...section.children].map(item => {
//     item.draggable = true
//     let pos = document.getElementById(item.id).getBoundingClientRect();
//     return pos;
//   });

// function _onDragOver(e){
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';

//     var target = e.target;
//     if( target && target !== dragEl && target.nodeName == 'DIV' ){
//       if(target.classList.contains('inside')) {
//         e.stopPropagation();
//       } else {
//   //getBoundinClientRect contains location-info about the element (relative to the viewport)
//       var targetPos = target.getBoundingClientRect();
//        //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
//       var next = (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5;
//         section.insertBefore(dragEl, next && target.nextSibling || target);

//         /*  console.log("oldPos:" + JSON.stringify(oldPos));
//          console.log("newPos:" + JSON.stringify(newPos)); */
//          /* console.log(newPos.top === oldPos.top ? 'They are the same' : 'Not the same'); */
//        console.log(oldPos);
//         }
//     }
// }

// function _onDragEnd(evt){
//     evt.preventDefault();
//     newPos = [...section.children].map(child => {
//          let pos = document.getElementById(child.id).getBoundingClientRect();
//          return pos;
//        });
//     console.log(newPos);
//     dragEl.classList.remove('ghost');
//     section.removeEventListener('dragover', _onDragOver, false);
//     section.removeEventListener('dragend', _onDragEnd, false);

//     nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
// }

//     section.addEventListener('dragstart', function(e){
//       dragEl = e.target;
//       nextEl = dragEl.nextSibling;
//       /* dragGhost = dragEl.cloneNode(true);
//       dragGhost.classList.add('hidden-drag-ghost'); */

//      /*  document.body.appendChild(dragGhost);
//       e.dataTransfer.setDragImage(dragGhost, 0, 0); */

//       e.dataTransfer.effectAllowed = 'move';
//       e.dataTransfer.setData('Text', dragEl.textContent);

//       section.addEventListener('dragover', _onDragOver, false);
//       section.addEventListener('dragend', _onDragEnd, false);

//       setTimeout(function (){
//           dragEl.classList.add('ghost');
//       }, 0)

//   });
// }

// // sortable( document.getElementById('list'), function (item){
// //   /* console.log(item); */
// // });

// /* The setData() method is used to add an item to the drag data, as shown in the following example.

// function dragstart_handler(ev) {
// // Add the drag data
// ev.dataTransfer.setData("text/plain", ev.target.id);
// ev.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
// ev.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org"); */

// /* you may succeed this a hacky solution. The native draggability doesn't allow CSS styles like: opacity:0;, visibility:hidden or display:none.
// But you can do it using: transform:translateX(-9999px).
// I've updated your JSFiddle with the solution. */
