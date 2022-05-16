import { TileId, Option } from "@/types";
import { Box, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface BorderSelectProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const BorderSelect: React.FC<BorderSelectProps> = ({
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
          <option value="">No border</option>
          <option value="1px solid black">
            Small border
          </option>
          <option value="2px solid black">
            Medium border
          </option>
          <option value="3px solid black">
            Large border
          </option>
        </Select>
      </Box>
    </Box>
  );
};
