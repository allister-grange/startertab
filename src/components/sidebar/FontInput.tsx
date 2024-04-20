import { defaultFont } from "@/helpers/defaultFont";
import { Option, TileSettings } from "@/types";
import { Box, BoxProps, Button, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface FontInputPros extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  tileId: number;
  isNumber?: boolean;
  changeSetting: (
    key: keyof TileSettings,
    value: string,
    tileId: number
  ) => void;
}

export const FontInput: React.FC<FontInputPros> = ({
  option,
  textColor,
  subTextColor,
  tileId,
  isNumber,
  changeSetting,
  value,
}) => {
  const { title, subTitle, localStorageId } = option;
  const [inputValue, setInputValue] = useState(value);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!value) {
      setInputValue(defaultFont);
    } else {
      setInputValue(value);
    }
  }, [value]);

  // will set the subreddit in the in memory copy of the settings
  // to then be staged into the localStorage, need the timeout for
  // performance reasons (only refresh every half a second)
  useEffect(() => {
    if (value === inputValue) {
      return;
    }
    const timeoutIdentifier = setTimeout(() => {
      changeSetting(
        option.localStorageId as keyof TileSettings,
        inputValue,
        tileId
      );
    }, 800);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [changeSetting, inputValue, option.localStorageId, tileId, value]);

  const resetFont = () => {
    setInputValue(defaultFont);
  };

  return (
    <Box key={localStorageId}>
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
      </Text>
      <Box display="flex" flexDir="column" mt="1">
        <Input
          color={textColor}
          marginLeft="auto"
          display="block"
          value={inputValue}
          size="sm"
          onChange={onInputChange}
          height="8"
          placeholder={title}
          type={isNumber ? "number" : undefined}
        />
      </Box>
      <Button
        background="transparent"
        m="0"
        p="0"
        mb="-4"
        fontSize="xs"
        color={subTextColor}
        _hover={{ background: "none", transform: "translateY(-1.5px)" }}
        _active={{ transform: "translateY(0)" }}
        onClick={resetFont}
      >
        Reset back to default font
      </Button>
    </Box>
  );
};
