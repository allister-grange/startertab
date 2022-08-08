import { Option, TileId, TileSettings } from "@/types";
import { Box, Select, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface GenericSelectProps {
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
  options: ReactElement;
}

export const GenericSelect: React.FC<GenericSelectProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
  options,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSetting(
      option.localStorageId as keyof TileSettings,
      e.target.value,
      option.tileId
    );
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
          &nbsp;Reset to default.
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
