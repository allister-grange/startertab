import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Option, UserSettings } from "@/types";
import { useLocalStorage } from "@/helpers/useLocalStorage";

interface ColorSettingOptionProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  initialValue: string;
  changeSetting: (key: string, value: string) => void;
}

export const ColorSettingOption: React.FC<ColorSettingOptionProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  initialValue
}) => {
  const { title, subTitle, localStorageId } = option;

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.body.style.backgroundColor = e.target.value;
    changeSetting(option.localStorageId, e.target.value);
  };

  // TODO reset an option back to it's default
  const resetToDefault = () => {
    // changeSetting(option.localStorageId, option.default);
    // document.body.style.backgroundColor = option.default;
  };

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
        <span onClick={resetToDefault}>&nbsp;reset to default</span>
      </Text>
      <Flex dir="row" mt="1">
        <Input
          marginLeft="auto"
          display="block"
          flex="1 0 80%"
          value={initialValue}
          size="sm"
          onChange={onColorChange}
        />
        <Input
          size="sm"
          type="color"
          value={initialValue}
          onChange={onColorChange}
        />
      </Flex>
    </Box>
  );
};
