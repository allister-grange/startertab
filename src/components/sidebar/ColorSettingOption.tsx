import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Option, UserSettings } from "@/types";
import { useLocalStorage } from "@/helpers/useLocalStorage";

interface ColorSettingOptionProps {
  option: Option;
  textColor: string;
  subTextColor: string;
}

export const ColorSettingOption: React.FC<ColorSettingOptionProps> = ({
  option,
  textColor,
  subTextColor,
}) => {
  const { title, subTitle, localStorageId } = option;

  // get from storage in the future
  const [settings, setSettings] = useLocalStorage(
    "userSettings",
    {} as UserSettings
  );
  const [colorForStorage, setColorForStorage] = useState("");

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorForStorage(e.target.value);
    document.body.style.backgroundColor = e.target.value;
  };

  // only want to set the color in localStorage after .5 seconds of no input
  useEffect(() => {
    if (!colorForStorage) {
      return;
    }

    const timeoutIdentifier = setTimeout(() => {
      let newSettings = { ...settings, [localStorageId]: colorForStorage };
      setSettings(newSettings as UserSettings);
    }, 500);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [colorForStorage, localStorageId, setSettings, settings]);

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
        <span>&nbsp;reset to default</span>
      </Text>
      <Flex dir="row" mt="1">
        <Input
          marginLeft="auto"
          display="block"
          flex="1 0 80%"
          value={settings[localStorageId]}
          size="sm"
          onChange={onColorChange}
        />
        <Input
          size="sm"
          type="color"
          value={settings[localStorageId]}
          onChange={onColorChange}
        />
      </Flex>
    </Box>
  );
};
