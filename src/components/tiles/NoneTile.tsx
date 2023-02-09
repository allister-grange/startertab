import { Box, Center, Heading, Select, useColorMode } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { TileSize, TileType } from "@/types";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { useRecoilState } from "recoil";
import { deepClone } from "@/helpers/tileHelpers";
import { OptionsForTileTypeSelect } from "@/components/ui/OptionsForTileTypeSelect";
import { getCurrentTheme } from "@/helpers/settingsHelpers";

interface NoneTileProps {
  tileId: number;
  tileSize: TileSize;
}

export const NoneTile: React.FC<NoneTileProps> = ({ tileId, tileSize }) => {
  const { colorMode } = useColorMode();
  const [settings, setSettings] = useRecoilState(userSettingState);
  const color = `var(--text-color-${tileId})`;

  const handleTileTypeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const settingsToEdit = deepClone(settings);
    const themeToEdit = getCurrentTheme(settingsToEdit, colorMode);

    if (!themeToEdit) {
      console.error("Couldn't find the theme");
      return;
    }

    themeToEdit.tiles[tileId].tileType = e.target.value as TileType;
    setSettings(settingsToEdit);
  };

  return (
    <Center
      height="100%"
      p="6"
      flexDir={tileSize === "long" ? "row" : "column"}
      color={color}
    >
      <Heading
        size="md"
        color={`var(--text-color-${tileId})`}
      >{`Give me a tile ✌️`}</Heading>
      <Box>
        <Select
          width="100%"
          marginTop={tileSize === "long" ? "0" : "4"}
          marginLeft={tileSize === "long" ? "4" : "0"}
          onChange={handleTileTypeSelected}
          placeholder="Types of tiles"
        >
          <OptionsForTileTypeSelect tileSize={tileSize} />
        </Select>
      </Box>
    </Center>
  );
};
