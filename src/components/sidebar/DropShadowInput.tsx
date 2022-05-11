import { TileId, Option } from "@/types";
import { Box, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface DropShadowInputProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const DropShadowInput: React.FC<DropShadowInputProps> = ({
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
          <option value="">No shadow</option>
          <option value="2px 2px 6px rgba(0,0,0,.3)">Small blurred shadow</option>
          <option value="3px 3px 10px rgba(0,0,0,.3)">Medium blurred shadow</option>
          <option value="4px 4px 10px rgba(0,0,0,.3)">Large blurred shadow</option>
          <option value="4px 4px 0 rgba(0,0,0,.3)">Small block shadow</option>
          <option value="6px 6px 0 rgba(0,0,0,.3)">Medium block shadow</option>
          <option value="8px 8px 0 rgba(0,0,0,.3)">Large block shadow</option>
        </Select>
      </Box>
    </Box>
  );
};
