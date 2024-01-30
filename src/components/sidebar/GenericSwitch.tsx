import { Option, TileSettings } from "@/types";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";

interface GenericSwitchProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: boolean;
  tileId: number;
  changeSetting: (
    key: keyof TileSettings,
    value: boolean,
    tileId: number
  ) => void;
  disabledLabel?: string;
  enabledLabel?: string;
}

export const GenericSwitch: React.FC<GenericSwitchProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  tileId,
  disabledLabel,
  enabledLabel,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = () => {
    changeSetting(option.localStorageId as keyof TileSettings, !value, tileId);
  };

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
      </Text>
      <Flex flexDir="row" mt="1" alignItems="center">
        <span style={{ marginTop: "auto", marginBottom: "auto" }}>
          {disabledLabel}
        </span>
        <Switch
          size="md"
          onChange={onTypeSelectChange}
          isChecked={value}
          color={textColor}
          px="2"
        />
        <span style={{ marginTop: "auto", marginBottom: "auto" }}>
          {enabledLabel}
        </span>
      </Flex>
    </Box>
  );
};
