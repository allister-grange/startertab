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
import { ThemeSettings, TileGroup } from "@/types/settings";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorMode,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  setOptionHovered: React.Dispatch<SetStateAction<TileGroup | undefined>>;
}

const openStyle = {
  opacity: 1,
  minWidth: "320px",
  transform: "translateX(0px)",
};

const closedStyle = {
  opacity: 0,
  minWidth: 0,
  transform: "translateX(-200px)",
};

export const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  isOpen,
  onClose,
  setOptionHovered,
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
      setSettingsToSave((settingsToSave) => {
        let newSettings = cloneDeep(settingsToSave);
        const themeToChange = newSettings.themes.find(
          (theme) => theme.themeName === colorMode
        );
        if (!themeToChange) {
          throw new Error("No change named " + colorMode);
        }
        themeToChange[key as keyof ThemeSettings] = value;
        return newSettings;
      });
    },
    [colorMode]
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
    setOptionHovered(undefined);
  };

  const resetOptionToDefault = (option: Option) => {
    const defaultSetting =
      colorMode === "dark" ? option.darkDefault : option.lightDefault;
    changeSetting(option.localStorageId, defaultSetting);
  };

  const resetAllSettingsToDefault = () => {
    const currentTheme = settings.themes.find(
      (theme) => theme.themeName === colorMode
    );

    if (!currentTheme) {
      throw new Error("No theme found for " + colorMode);
    }

    sideBarOptions.forEach((option) => {
      const defaultSetting =
        currentTheme.themeName === "dark"
          ? option.darkDefault
          : option.lightDefault;

      changeSetting(option.localStorageId, defaultSetting);
    });
  };

  const currentThemeSettings = settingsToSave.themes.find(
    (theme) => theme.themeName === colorMode
  );

  const sortedOptions = sortOptionsIntoTileGroups(sideBarOptions);

  return (
    <Box
      minWidth={300}
      width={300}
      height="100%"
      transition={"all 0.3s ease-in-out"}
      zIndex="10"
      bg={backgroundColor}
      overflowY="auto"
      style={isOpen ? openStyle : closedStyle}
    >
      <SideBarTitle
        textColor={textColor}
        onSaveHandler={onSaveHandler}
        onExitHandler={onExitHandler}
      />
      <Box p="3">
        <ThemeToChangeSelector />
        <Box mb="4">
          <Button display="block" onClick={resetAllSettingsToDefault}>
            <Text fontSize="sm" color={textColor}>
              Reset all colors back to default
            </Text>
          </Button>
        </Box>

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

        <Box mt="4" />
        <Accordion allowMultiple>
          {Object.entries(sortedOptions).map((tileGroup) => {
            return (
              <AccordionItem
                key={tileGroup[0]}
                p="0"
                onMouseEnter={() => setOptionHovered(tileGroup[0] as TileGroup)}
                onMouseLeave={() => setOptionHovered(undefined)}
              >
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
  );
};
