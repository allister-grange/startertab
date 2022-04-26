import { ColorSettingOption } from "@/components/sidebar/ColorSettingOption";
import { SideBarTitle } from "@/components/sidebar/SideBarTitle";
import { ThemeToChangeSelector } from "@/components/sidebar/ThemeToChangeSelector";
import {
  applyTheme,
  sideBarOptions,
  sortOptionsIntoTileGroups,
} from "@/helpers/settingsHelpers";
import { useLocalStorage } from "@/helpers/useLocalStorage";
import { Option } from "@/types";
import { ThemeSettings } from "@/types/settings";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    const themeToChange = settingsToSave.themes.find(
      (theme) => theme.themeName === colorMode
    );

    if (!themeToChange) {
      throw new Error("No change named " + colorMode);
    }

    applyTheme(themeToChange);
  }, [settingsToSave, colorMode]);

  // // will change the appearance of the site, but not what's stored in localStorage
  const changeSetting = useCallback(
    (key: string, value: string) => {
      console.log(`changeSettings ${key}:${value}`);
      let newSettings = cloneDeep(settingsToSave);
      const themeToChange = newSettings.themes.find(
        (theme) => theme.themeName === colorMode
      );
      if (!themeToChange) {
        throw new Error("No change named " + colorMode);
      }
      themeToChange[key as keyof ThemeSettings] = value;
      setSettingsToSave(newSettings);
    },
    [colorMode, settingsToSave]
  );

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
  };

  const resetOptionToDefault = (option: Option) => {
    const defaultSetting =
      colorMode === "dark" ? option.darkDefault : option.lightDefault;
    changeSetting(option.localStorageId, defaultSetting);
  };

  const currentThemeSettings = settingsToSave.themes.find(
    (theme) => theme.themeName === colorMode
  );

  const sortedOptions = sortOptionsIntoTileGroups(sideBarOptions);

  return isOpen ? (
    <Box
      minWidth={300}
      width={300}
      height="100%"
      transition={"width 0.3s ease-in-out"}
      zIndex="10"
      bg={backgroundColor}
      overflowY="scroll"
    >
      <SideBarTitle
        textColor={textColor}
        onSaveHandler={onSaveHandler}
        onExitHandler={onExitHandler}
      />
      <Box p="3">
        <ThemeToChangeSelector />
        <hr />

        <ColorSettingOption
          option={sideBarOptions[0]}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={
            currentThemeSettings![
              sideBarOptions[0].localStorageId as keyof ThemeSettings
            ]
          }
          resetOptionToDefault={resetOptionToDefault}
        />
        <hr />
        <Box mt="4" />
        <Accordion allowMultiple>
          {Object.entries(sortedOptions).map((tileGroup) => {
            return (
              <AccordionItem key={tileGroup[0]} p="0">
                <h2>
                  <AccordionButton
                    _expanded={{ backdropFilter: "brightness(0.95)" }}
                  >
                    <Box flex="1" textAlign="left">
                      {tileGroup[0]}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {tileGroup[1].map((option: Option) => {
                  return (
                    <AccordionPanel pb={4} p="2" key={option.localStorageId}>
                      <ColorSettingOption
                        option={option}
                        changeSetting={changeSetting}
                        textColor={textColor}
                        subTextColor={subTextColor}
                        value={
                          currentThemeSettings![
                            option.localStorageId as keyof ThemeSettings
                          ]
                        }
                        resetOptionToDefault={resetOptionToDefault}
                      />
                      <hr />
                    </AccordionPanel>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </Box>
  ) : null;
};
