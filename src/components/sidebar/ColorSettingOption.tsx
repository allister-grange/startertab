import React from "react";
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

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSetting(option.localStorageId, e.target.value);
  };

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
        <span style={{cursor: "pointer"}} onClick={() => resetOptionToDefault(option)}>
          .&nbsp;Reset to default.
        </span>
      </Text>
      <Flex dir="row" mt="1">
        <Input
          marginLeft="auto"
          display="block"
          flex="1 0 80%"
          value={value}
          size="sm"
          onChange={onColorChange}
        />
        <Input
          size="sm"
          type="color"
          value={value}
          onChange={onColorChange}
        />
      </Flex>
    </Box>
  );
};
