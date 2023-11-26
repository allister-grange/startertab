import { OptionsForTileTypeSelect } from "@/components/ui/OptionsForTileTypeSelect";
import { deepClone } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import { themeSelector } from "@/recoil/UserSettingsSelectors";
import { TileSize, TileType } from "@/types";
import { Box, Center, Heading, Select } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface NoneTileProps {
  tileId: number;
  tileSize: TileSize;
}

export const NoneTile: React.FC<NoneTileProps> = ({ tileId, tileSize }) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const color = `var(--text-color-${tileId})`;
  const theme = useRecoilValue(themeSelector);

  const handleTileTypeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const settingsToEdit = deepClone(settings);
    const themeToEdit = deepClone(theme);

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
