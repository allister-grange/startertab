import { Option, TileId } from "@/types";
import { Box, BoxProps, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface LargeTileTypePickerProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const LargeTileTypePicker: React.FC<LargeTileTypePickerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSetting(option.localStorageId, e.target.value, option.tileId);
  };

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
          placeholder="Select option"
          size="sm"
          onChange={onTypeSelectChange}
          value={value}
        >
          <option value="UV Graph">UV Graph</option>
          <option value="Large Spotify Tile">Large Spotify Tile</option>
        </Select>
      </Box>
    </Box>
  );
};
