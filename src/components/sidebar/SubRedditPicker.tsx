import { Option, TileId } from "@/types";
import {
  Box,
  BoxProps,
  Center,
  Collapse,
  Flex,
  Input, Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface SubRedditPickerProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const SubRedditPicker: React.FC<SubRedditPickerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
}) => {
  const { title, subTitle, localStorageId } = option;
  const [inputValue, setInputValue] = useState(value);

  const onSubRedditPickerChange = (subReddit: string) => {
    setInputValue(subReddit);
  };

  const onSubRedditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (value === inputValue) {
      return;
    }
    const timeoutIdentifier = setTimeout(() => {
      changeSetting(option.localStorageId, inputValue, option.tileId);
    }, 500);

    return () => {
      // this will clear the timeout when the user changes color
      // if the timeout isn't cleared, then the user will persist in the state
      // this is for performance with the color picker
      clearTimeout(timeoutIdentifier);
    };
  }, [changeSetting, inputValue, option.localStorageId, value]);

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
        <Flex>
          <Input
            marginLeft="auto"
            display="block"
            flex="1 1 70%"
            value={inputValue}
            size="sm"
            onChange={onSubRedditInputChange}
            height="8"
          />
        </Flex>
      </Box>
    </Box>
  );
};
