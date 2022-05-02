import { Option, TileId } from "@/types";
import { Box, BoxProps, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface TypePickerProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const TypePicker: React.FC<TypePickerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
}) => {
  const { title, subTitle, localStorageId } = option;
  const [inputValue, setInputValue] = useState(value);

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    changeSetting(option.localStorageId, inputValue, option.tileId);
  }, [changeSetting, inputValue, option.localStorageId, option.tileId]);

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
          value={inputValue}
        >
          <option value="Reddit Feed">Reddit Feed</option>
          <option value="Hacker News Feed">Hacker News Feed</option>
        </Select>
      </Box>
    </Box>
  );
};
