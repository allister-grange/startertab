import { SideBarTitle } from "@/components/sidebar/SideBarTitle";
import { sideBarOptions } from "@/helpers/settingsHelpers";
import { useLocalStorage } from "@/helpers/useLocalStorage";
import {
  Box,
  BoxProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ColorSettingOption } from "@/components/sidebar/ColorSettingOption";
import { ThemeToChangeSelector } from "@/components/sidebar/ThemeToChangeSelector";
import { ThemeSettings } from "@/types/settings";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useLocalStorage("userSettings");
  const [settingsToSave, setSettingsToSave] = useState(settings);
  const { colorMode } = useColorMode();

  const backgroundColor = useColorModeValue("gray.100", "#33393D");
  const textColor = useColorModeValue("#303030", "#fff");
  const subTextColor = useColorModeValue("#606060", "#ddd");

  const changeSetting = (key: string, value: string) => {
    let newSettings = {...settings};
    const themeToChange = newSettings.themes.find(
      (theme) => theme.themeName === colorMode
    );
    themeToChange![key as keyof ThemeSettings] = value;
    setSettingsToSave(newSettings);
  };

  const onSaveHandler = () => {
    setSettings(settingsToSave);
  };

  const onExitHandler = () => {
    onClose();
    // reset the background, colors etc back to what is in the userSettings
  };

  const currentThemeSettings = settings.themes.find((theme) => theme.themeName === colorMode);

  return isOpen ? (
    <Box
      minWidth={300}
      width={300}
      height="100%"
      transition={"width 0.3s ease-in-out"}
      zIndex="10"
      bg={backgroundColor}
    >
      <Box
        height="100%"
        width="100%"
        bg={backgroundColor}
        onClose={() => onClose}
      >
        <SideBarTitle
          textColor={textColor}
          onSaveHandler={onSaveHandler}
          onExitHandler={onExitHandler}
        />
        <Box p="3">
          <ThemeToChangeSelector />
          <hr />
          <ul>
            {sideBarOptions.map((option) => (
              <li key={option.localStorageId}>
                <ColorSettingOption
                  option={option}
                  changeSetting={changeSetting}
                  textColor={textColor}
                  subTextColor={subTextColor}
                  initialValue={currentThemeSettings?.backgroundColor!}
                />
                <hr />
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  ) : null;
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
