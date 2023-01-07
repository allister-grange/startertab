import { Box, Center, Heading, Select, useColorMode } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { TileSize, TileType } from "@/types";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { useRecoilState } from "recoil";
import { deepClone } from "@/helpers/tileHelpers";

interface NoneTileProps {
  tileId: number;
  tileSize: TileSize;
}

export const NoneTile: React.FC<NoneTileProps> = ({ tileId, tileSize }) => {
  let options;
  const { colorMode } = useColorMode();
  const [settings, setSettings] = useRecoilState(userSettingState);
  const color = `var(--text-color-${tileId})`;

  switch (tileSize) {
    case "small":
      options = (
        <>
          <option value="Blank Tile">Blank</option>
          <option value="Favorite Links Tile">Favorite Links</option>
          <option value="Small Spotify Tile">Spotify</option>
          <option value="Small Stock Tile">Stock Ticker</option>
          <option value="Theme Picker">Theme Picker</option>
          <option value="Time">Time</option>
          <option value="Small Weather Tile">Weather</option>
        </>
      );
      break;
    case "medium":
      options = (
        <>
          <option value="Blank Tile">Blank</option>
          <option value="Bonsai">Bonsai</option>
          <option value="Favorite Links Tile">Favorite Links</option>
          <option value="Hacker News Feed">Hacker News Feed</option>
          <option value="Markdown File Tile">Markdown File</option>
          <option value="Reddit Feed">Reddit Feed</option>
          <option value="RSS Feed Tile">RSS Feed</option>
          <option value="Spotify Top Artist Tile">
            Spotify Top Artist List
          </option>
          <option value="Todo List">Todo List</option>
          <option value="Twitter Feed Tile">Twitter Feed</option>
        </>
      );
      break;
    case "large":
      options = (
        <>
          <option value="Blank Tile">Blank</option>
          <option value="Bonsai">Bonsai</option>
          <option value="Favorite Links Tile">Favorite Links</option>
          <option value="Hacker News Feed">Hacker News Feed</option>
          <option value="Markdown File Tile">Markdown File</option>
          <option value="Reddit Feed">Reddit Feed</option>
          <option value="RSS Feed Tile">RSS Feed</option>
          <option value="Large Spotify Tile">Spotify Tile</option>
          <option value="Large Stock Tile">Stock Tile</option>
          <option value="Strava Graph">Strava Graph</option>
          <option value="Twitter Feed Tile">Twitter Feed</option>
          <option value="UV Graph">UV Graph</option>
          <option value="Large Weather Tile">Weather Forecast</option>
        </>
      );
      break;
    case "long":
      options = (
        <>
          <option value="Blank Tile">Blank</option>
          <option value="Search Bar">Search Bar</option>
          <option value="Day Planner">Day Planner</option>
        </>
      );
      break;
  }

  const handleTileTypeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const settingsToEdit = deepClone(settings);
    const currentTheme = settingsToEdit.themes.find(
      (theme) => theme.themeName === colorMode
    );

    if (!currentTheme) {
      console.error("Couldn't find the theme");
      return;
    }

    const tileToEdit = currentTheme?.tiles.find(
      (tile) => tileId === tile.tileId
    );

    if (!tileToEdit) {
      console.error("Couldn't find the tile");
      return;
    }

    tileToEdit.tileType = e.target.value as TileType;
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
          {options}
        </Select>
      </Box>
    </Center>
  );
};
