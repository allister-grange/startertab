import React, { useEffect, useState } from "react";
import { Option } from "@/types";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

interface ColorSettingOptionProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const ColorSettingOption: React.FC<ColorSettingOptionProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
}) => {
  const { title, subTitle, localStorageId } = option;
  const [inputValue, setInputValue] = useState(() => value);

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if(value === inputValue) {
      return;
    }
    const timeoutIdentifier = setTimeout(() => {
      console.log("Calling change setting");
      changeSetting(option.localStorageId, inputValue);
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
      <Flex dir="row" mt="1">
        <Input
          marginLeft="auto"
          display="block"
          flex="1 0 80%"
          value={inputValue}
          size="sm"
          onChange={onColorChange}
        />
        <Input
          size="sm"
          type="color"
          value={inputValue}
          onChange={onColorChange}
        />
      </Flex>
    </Box>
  );
};
