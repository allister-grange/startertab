import { ColorSettingOption } from "@/components/sidebar/ColorSettingOption";
import { SideBarTitle } from "@/components/sidebar/SideBarTitle";
import { ThemeToChangeSelector } from "@/components/sidebar/ThemeToChangeSelector";
import { sideBarOptions } from "@/helpers/settingsHelpers";
import { useLocalStorage } from "@/helpers/useLocalStorage";
import { Option } from "@/types";
import { ThemeSettings } from "@/types/settings";
import {
  Box,
  BoxProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import cloneDeep from "lodash.clonedeep";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useLocalStorage("userSettings");
  const [settingsToSave, setSettingsToSave] = useState(() =>
    cloneDeep(settings)
  );
  const { colorMode } = useColorMode();

  const backgroundColor = useColorModeValue("gray.100", "#33393D");
  const textColor = useColorModeValue("#303030", "#fff");
  const subTextColor = useColorModeValue("#606060", "#ddd");

  // will change the appearance of the site, but not what's stored in localStorage
  const changeSetting = (key: string, value: string) => {
    let newSettings = cloneDeep(settingsToSave);
    const themeToChange = newSettings.themes.find(
      (theme) => theme.themeName === colorMode
    );
    if (!themeToChange) {
      throw new Error("No change named " + colorMode);
    }
    themeToChange[key as keyof ThemeSettings] = value;
    applyTheme(themeToChange);
    setSettingsToSave(newSettings);
  };

  // apply the in memory settings into localStorage
  const onSaveHandler = () => {
    const permanentSettings = cloneDeep(settingsToSave);
    setSettings(permanentSettings);
  };

  // reset the background, colors etc back to what is in the userSettings before changes
  const onExitHandler = () => {
    onClose();
    const theme = settings.themes.find(
      (theme) => theme.themeName === colorMode
    );
    if (!theme) {
      throw new Error("No change named " + colorMode);
    }
    // reset settings
    setSettingsToSave(cloneDeep(settings));
    applyTheme(theme);
  };

  const resetOptionToDefault = (option: Option) => {
    let newSettings = cloneDeep(settingsToSave);
    const themeToChange = newSettings.themes.find(
      (theme) => theme.themeName === colorMode
    );
    if (colorMode !== "dark" && colorMode !== "light") {
      throw new Error(
        "You have only coded two themes Allister, you'll have to handle this a different way if you're adding more in"
      );
    }
    if (!themeToChange) {
      throw new Error("No change named " + colorMode);
    }
    const defaultSetting =
      colorMode === "dark" ? option.darkDefault : option.lightDefault;
    themeToChange[option.localStorageId as keyof ThemeSettings] =
      defaultSetting;
    setSettingsToSave(newSettings);
    applyTheme(themeToChange);
  };

  const applyTheme = (theme: ThemeSettings) => {
    document.body.style.backgroundColor = theme.backgroundColor;
    // document.body.style.color = theme.textColor;
  };

  const currentThemeSettings = settingsToSave.themes.find(
    (theme) => theme.themeName === colorMode
  );

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
                  value={currentThemeSettings?.backgroundColor!}
                  resetOptionToDefault={resetOptionToDefault}
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
