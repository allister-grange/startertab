import { TileSize } from "@/types";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TileLayoutActionsProps {
  setIsEditingTiles: Dispatch<SetStateAction<boolean>>;
  addNewTileIntoGrid: (size: TileSize) => void;
}

export const TileLayoutActions: React.FC<TileLayoutActionsProps> = ({
  addNewTileIntoGrid,
}) => {
  const [addButtonHovered, setAddButtonHovered] = useState(false);

  return (
    <Flex position="fixed" top="3" right="3" flexDir="column">
      <Menu>
        <MenuButton
          background={addButtonHovered ? "white" : "rgba(255,255,255,0.8)"}
          shadow="2xl"
          color="gray.900"
          overflow="hidden"
          fontSize="2xl"
          onMouseEnter={() => setAddButtonHovered(true)}
          onMouseLeave={() => setAddButtonHovered(false)}
          zIndex={100}
          whiteSpace="nowrap"
          borderRadius={addButtonHovered ? "25%/50%" : "50%"}
          height="64px"
          width={addButtonHovered ? "128px" : "64px"}
          display="flex"
          transition={"all 200ms"}
          _hover={{}}
        >
          {addButtonHovered ? "add tile" : <SmallAddIcon fontSize={"36"} />}
        </MenuButton>
        <MenuList color="black">
          <MenuItem onClick={() => addNewTileIntoGrid("small")}>small</MenuItem>
          <MenuItem onClick={() => addNewTileIntoGrid("medium")}>
            medium
          </MenuItem>
          <MenuItem onClick={() => addNewTileIntoGrid("large")}>large</MenuItem>
          <MenuItem onClick={() => addNewTileIntoGrid("long")}>long</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
