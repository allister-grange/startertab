import { Option, TileId, TileSettings } from "@/types";
import {
  Box,
  BoxProps,
  Center,
  Collapse,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps extends BoxProps {
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
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
}) => {
  const { title, subTitle, localStorageId } = option;
  const [inputValue, setInputValue] = useState(value);
  const [showingColorPicker, setShowingColorPicker] = useState(false);

  const onColorPickerChange = (color: string) => {
    setInputValue(color);
  };
  const onColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      changeSetting(
        option.localStorageId as keyof TileSettings,
        inputValue,
        option.tileId
      );
    }, 500);

    return () => {
      // this will clear the timeout when the user changes color
      // if the timeout isn't cleared, then the user will persist in the state
      // this is for performance with the color picker
      clearTimeout(timeoutIdentifier);
    };
  }, [changeSetting, inputValue, option.localStorageId, option.tileId, value]);

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
            onChange={onColorInputChange}
            height="8"
            onFocus={() => setShowingColorPicker(true)}
            color={textColor}
          />
          <Center
            height="32px"
            width="50px"
            border="1px solid"
            borderColor="inherit"
            _hover={{ cursor: "pointer" }}
            onClick={() =>
              setShowingColorPicker((showingColor) => !showingColor)
            }
          >
            <Box
              height="20px"
              width="20px"
              borderRadius="4px"
              border="1px solid"
              borderColor="inherit"
              bg={inputValue}
            />
          </Center>
        </Flex>
        <Collapse in={showingColorPicker}>
          <HexColorPicker
            color={inputValue}
            onChange={onColorPickerChange}
            style={{
              width: "auto",
              height: "120px",
              marginTop: "10px",
              marginBottom: "5px",
            }}
          />
        </Collapse>
      </Box>
    </Box>
  );
};
