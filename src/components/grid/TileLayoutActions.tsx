import {
  createNewTile,
  getCurrentTheme,
  getTileLayoutForNewTile,
} from "@/helpers/settingsHelpers";
import { deepClone } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import { TileSize, UserSettings } from "@/types";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

interface TileLayoutActionsProps {
  colorMode: string;
}

export const TileLayoutActions: React.FC<TileLayoutActionsProps> = ({
  colorMode,
}) => {
  const [addButtonHovered, setAddButtonHovered] = useState(false);
  const [settings, setSettings] = useRecoilState(userSettingState);

  const addNewTileIntoGrid = (size: TileSize) => {
    const settingsToChange = deepClone(settings) as UserSettings;
    const themeToChange = getCurrentTheme(settingsToChange, colorMode);
    const newTile = createNewTile(themeToChange, size);
    const newTileLayout = getTileLayoutForNewTile(size);

    // add new tile to tiles and the new layout to the current theme
    themeToChange.tiles.push(newTile);
    for (const key in themeToChange.tileLayout) {
      themeToChange.tileLayout[key].push({
        w: newTileLayout.width,
        h: newTileLayout.height,
        x: 0,
        y: 8,
        i: newTile.tileId.toString(),
        minH: newTileLayout.minH,
        minW: newTileLayout.minW,
      });
    }

    setSettings(settingsToChange);
  };

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
