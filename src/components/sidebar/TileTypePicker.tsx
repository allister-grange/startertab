import { Option, OptionType, TileSettings, TileSize } from "@/types";
import { Box, BoxProps, Select, Text } from "@chakra-ui/react";
import React from "react";
import { OptionsForTileTypeSelect } from "../ui/OptionsForTileTypeSelect";

interface TileTypePickerProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  tileId: number;
  value: string;
  changeSetting: (
    key: keyof TileSettings,
    value: string,
    tileId: number
  ) => void;
  sizeOfTileForTypes: OptionType;
}

export const TileTypePicker: React.FC<TileTypePickerProps> = ({
  option,
  textColor,
  subTextColor,
  tileId,
  changeSetting,
  value,
  sizeOfTileForTypes,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSetting(
      option.localStorageId as keyof TileSettings,
      e.target.value,
      tileId
    );
  };

  let tileSize;

  switch (sizeOfTileForTypes) {
    case "SmallTileTypePicker":
      tileSize = "small";
      break;
    case "MediumTileTypePicker":
      tileSize = "medium";
      break;
    case "LargeTileTypePicker":
      tileSize = "large";
      break;
    case "LongTileTypePicker":
      tileSize = "long";
      break;
  }

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
          <OptionsForTileTypeSelect tileSize={tileSize as TileSize} />
        </Select>
      </Box>
    </Box>
  );
};
