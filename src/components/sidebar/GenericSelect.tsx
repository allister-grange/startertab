import { Option, TileSettings } from "@/types";
import { Box, Select, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface GenericSelectProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  tileId: number;
  changeSetting: (
    key: keyof TileSettings,
    value: string,
    tileId: number
  ) => void;
  options: ReactElement;
}

export const GenericSelect: React.FC<GenericSelectProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  tileId,
  options,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSetting(
      option.localStorageId as keyof TileSettings,
      JSON.parse(e.target.value),
      tileId
    );
  };

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
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
