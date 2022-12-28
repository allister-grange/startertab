import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TileLayoutActionsProps {
  setIsEditingTiles: Dispatch<SetStateAction<boolean>>;
  addNewTileIntoGrid: () => void;
}

export const TileLayoutActions: React.FC<TileLayoutActionsProps> = ({
  addNewTileIntoGrid,
}) => {
  const [addButtonHovered, setAddButtonHovered] = useState(false);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    addNewTileIntoGrid();
  };

  return (
    <Flex position="absolute" top="3" right="3" flexDir="column">
      <OutlinedButton
        background="white"
        shadow="2xl"
        color="gray.900"
        fontSize="2xl"
        onClick={onClickHandler}
        onMouseEnter={() => setAddButtonHovered(true)}
        onMouseLeave={() => setAddButtonHovered(false)}
        zIndex={100}
        borderRadius={addButtonHovered ? "25%/50%" : "50%"}
        height="64px"
        width={addButtonHovered ? "128px" : "64px"}
        display="flex"
        transition={"all .2s"}
      >
        {addButtonHovered ? "add tile" : <SmallAddIcon fontSize={"36"} />}
      </OutlinedButton>
    </Flex>
  );
};
