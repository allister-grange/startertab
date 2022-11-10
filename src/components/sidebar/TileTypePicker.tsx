import { Option, OptionType, TileId, TileSettings } from "@/types";
import { Box, BoxProps, Select, Text } from "@chakra-ui/react";
import React from "react";

interface TileTypePickerProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (
    key: keyof TileSettings,
    value: string,
    tileId: TileId
  ) => void;
  resetOptionToDefault: (option: Option) => void;
  sizeOfTileForTypes: OptionType;
}

const optionsStyles = {
  color: "white",
  background: "var(--chakra-colors-gray-600)",
};

export const TileTypePicker: React.FC<TileTypePickerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
  sizeOfTileForTypes,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSetting(
      option.localStorageId as keyof TileSettings,
      e.target.value,
      option.tileId
    );
  };

  let options;

  switch (sizeOfTileForTypes) {
    case "SmallTileTypePicker":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Favorite Links Tile">
            Favorite Links
          </option>
          <option style={optionsStyles} value="Small Spotify Tile">
            Spotify
          </option>
          <option style={optionsStyles} value="Small Stock Tile">
            Stock Ticker
          </option>
          <option style={optionsStyles} value="Theme Picker">
            Theme Picker
          </option>
          <option style={optionsStyles} value="Time">
            Time
          </option>
          <option style={optionsStyles} value="Small Weather Tile">
            Weather
          </option>
        </>
      );
      break;
    case "MediumTileTypePicker":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Bonsai">
            Bonsai
          </option>
          <option style={optionsStyles} value="Favorite Links Tile">
            Favorite Links
          </option>
          <option style={optionsStyles} value="Hacker News Feed">
            Hacker News Feed
          </option>
          <option style={optionsStyles} value="Markdown File Tile">
            Markdown File
          </option>
          <option style={optionsStyles} value="Reddit Feed">
            Reddit Feed
          </option>
          <option style={optionsStyles} value="RSS Feed Tile">
            RSS Feed
          </option>
          <option style={optionsStyles} value="Spotify Top Artist Tile">
            Spotify Top Artist List
          </option>
          <option style={optionsStyles} value="Todo List">
            Todo List
          </option>
          <option style={optionsStyles} value="Twitter Feed Tile">
            Twitter Feed
          </option>
        </>
      );
      break;
    case "LargeTileTypePicker":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Bonsai">
            Bonsai
          </option>
          {/* <option style={optionsStyles} value="Javascript Console Tile">
            Javascript Console Tile
          </option> */}
          <option style={optionsStyles} value="Favorite Links Tile">
            Favorite Links
          </option>
          <option style={optionsStyles} value="Hacker News Feed">
            Hacker News Feed
          </option>
          <option style={optionsStyles} value="Markdown File Tile">
            Markdown File
          </option>
          <option style={optionsStyles} value="Reddit Feed">
            Reddit Feed
          </option>
          <option style={optionsStyles} value="RSS Feed Tile">
            RSS Feed
          </option>
          <option style={optionsStyles} value="Large Spotify Tile">
            Spotify Tile
          </option>
          <option style={optionsStyles} value="Large Stock Tile">
            Stock Tile
          </option>
          <option style={optionsStyles} value="Strava Graph">
            Strava Graph
          </option>
          <option style={optionsStyles} value="Twitter Feed Tile">
            Twitter Feed
          </option>
          <option style={optionsStyles} value="UV Graph">
            UV Graph
          </option>
          <option style={optionsStyles} value="Large Weather Tile">
            Weather Forecast
          </option>
        </>
      );
      break;
    case "LongTileTypePicker":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Search Bar">
            Search Bar
          </option>
          <option style={optionsStyles} value="Day Planner">
            Day Planner
          </option>
        </>
      );
      break;

    default:
      options = null;
  }

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => resetOptionToDefault(option)}
        >
          .&nbsp;Reset to default.
        </span>
      </Text>
      <Box display="flex" flexDir="column" mt="1">
        <Select
          size="sm"
          onChange={onTypeSelectChange}
          value={value}
          color={textColor}
        >
          {options}
        </Select>
      </Box>
    </Box>
  );
};
