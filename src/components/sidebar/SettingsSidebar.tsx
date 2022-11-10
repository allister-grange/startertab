import { userSettingState } from "@/recoil/UserSettingsAtom";
import {
  Footer,
  SideBarTitle,
  ThemeToChangeSelector,
} from "@/components/sidebar";
import SettingOptionContainer from "@/components/sidebar/SettingOptionContainer";
import {
  getCurrentTheme,
  getDefaultSettingForOption,
  getThemeNames,
  sortOptionsIntoTileGroups,
} from "@/helpers/settingsHelpers";
import { sideBarOptions } from "@/helpers/sideBarOptions";
import styles from "@/styles/Home.module.css";
import { Option } from "@/types";
import {
  ThemeSettings,
  TileId,
  TileSettings,
  UserSettings,
} from "@/types/settings";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  ExpandedIndex,
  useColorMode,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { deepClone } from "@/helpers/tileHelpers";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  setOptionHovered: React.Dispatch<SetStateAction<TileId | undefined>>;
  setTutorialProgress: Dispatch<SetStateAction<number>>;
  tutorialProgress: number;
}

const randomHexValue = (): string => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  onClose,
  isOpen,
  setOptionHovered,
  setTutorialProgress,
  tutorialProgress,
}) => {
  const { colorMode } = useColorMode();
  const [settings, setSettings] = useRecoilState(userSettingState);
  const inMemorySettingsRef = useRef(settings);
  const [accordionIndex, setAccordionIndex] = useState<ExpandedIndex>([]);

  // used to animate the width of the sidebar
  const [width, setWidth] = useState("0px");
  const sortedOptions = React.useMemo(
    () => sortOptionsIntoTileGroups(sideBarOptions),
    []
  );

  React.useEffect(() => {
    if (isOpen) {
      setWidth("320px");
    }
  }, [isOpen]);

  const currentThemeSettings = React.useMemo(
    () => settings.themes.find((theme) => theme.themeName === colorMode),
    [colorMode, settings.themes]
  );

  // apply the in memory settings into localStorage
  const onSaveHandler = () => {
    const permanentSettings = deepClone(settings);
    setSettings(permanentSettings);
    inMemorySettingsRef.current = permanentSettings;
  };

  // reset the background, colors etc back to what is in the userSettings before changes
  const onExitHandler = () => {
    // close the sidebar
    setWidth("0px");
    setTimeout(onClose, 500);
    // reset settings
    setSettings(deepClone(settings));
    setOptionHovered(undefined);
    setAccordionIndex([]);
    setSettings(inMemorySettingsRef.current);
  };

  const changeSetting = React.useCallback(
    (key: keyof TileSettings, value: any, tileId: TileId) => {
      const userSettings = JSON.parse(JSON.stringify(settings)) as UserSettings;
      const themeToChange = getCurrentTheme(userSettings, colorMode);

      themeToChange[tileId][key] = value;

      setSettings(userSettings);
    },
    [colorMode, setSettings, settings]
  );

  const resetOptionToDefault = React.useCallback(
    (option: Option) => {
      const defaultSetting = getDefaultSettingForOption(option, colorMode);
      changeSetting(
        option.localStorageId as keyof TileSettings,
        defaultSetting,
        option.tileId
      );
    },
    [changeSetting, colorMode]
  );

  const resetAllColorsToDefault = () => {
    let newSettings = deepClone(settings);
    const themeToChange = getCurrentTheme(newSettings, colorMode);

    sideBarOptions.forEach((option) => {
      if (
        !option.optionType.toLowerCase().includes("color") &&
        option.tileId !== "globalSettings"
      ) {
        return;
      }
      const defaultSetting = getDefaultSettingForOption(option, colorMode);
      themeToChange[option.tileId][
        option.localStorageId as keyof TileSettings
      ] = defaultSetting as any;
    });

    setSettings(newSettings);
  };

  const randomizeAllColorValues = () => {
    let newSettings = deepClone(settings);
    const themeToChange = getCurrentTheme(newSettings, colorMode);

    sideBarOptions.forEach((option) => {
      if (option.localStorageId.toLowerCase().includes("color")) {
        const newColorSetting = randomHexValue();
        themeToChange[option.tileId][
          option.localStorageId as keyof TileSettings
        ] = newColorSetting as any;
      }
    });

    setSettings(newSettings);
  };

  const onAccordionChange = (expandedIndex: ExpandedIndex) => {
    setAccordionIndex(expandedIndex);

    // for the tutorial, if we open the dropdown we want to progress the tutorial
    setTutorialProgress((prevState) => (prevState === 3 ? 4 : prevState));
  };

  const getOptionTitle = (tileId: keyof ThemeSettings): string => {
    const tileToSearch = tileId
      .toLowerCase()
      .replace(" ", "") as keyof ThemeSettings;

    if (currentThemeSettings === undefined) {
      return tileId;
    }

    const optionTitle = currentThemeSettings[tileToSearch] as TileSettings;

    if (optionTitle) {
      if (optionTitle.tileType === "None") {
        return "No type";
      }
      return optionTitle.tileType ? optionTitle.tileType : "No Tile Type";
    }

    // catch here for the settings with no tile associated with them
    return "Global Settings";
  };

  if (!currentThemeSettings) {
    return <></>;
  }

  const backgroundColor =
    currentThemeSettings?.globalSettings.sidebarBackgroundColor!;
  const textColor = currentThemeSettings?.globalSettings.textColor;
  const subTextColor = currentThemeSettings?.globalSettings.subTextColor!;
  const borderColor = currentThemeSettings?.globalSettings.sidebarBorderColor!;

  return (
    <Box
      minWidth={width}
      width={width}
      height="100vh"
      transition="all 0.4s ease-in-out"
      zIndex="10"
      bg={backgroundColor}
      overflowY="auto"
      className={styles.disableScrollbars}
      display="flex"
      flexDirection="column"
      position="sticky"
      left="0"
    >
      <SideBarTitle
        textColor={textColor}
        backgroundColor={backgroundColor}
        onSaveHandler={onSaveHandler}
        onExitHandler={onExitHandler}
        tutorialProgress={tutorialProgress}
      />
      <Box p="3">
        <ThemeToChangeSelector
          textColor={textColor}
          tutorialProgress={tutorialProgress}
          setTutorialProgress={setTutorialProgress}
          themes={getThemeNames(settings)}
        />
        <Box mt="4" />
        <Accordion
          allowMultiple
          onChange={onAccordionChange}
          index={accordionIndex}
        >
          {Object.entries(sortedOptions).map((tileGroup, index) => {
            return (
              <AccordionItem
                key={tileGroup[0]}
                p="0"
                onMouseEnter={() => setOptionHovered(tileGroup[0] as TileId)}
                onFocus={() => setOptionHovered(tileGroup[0] as TileId)}
                onMouseLeave={() => setOptionHovered(undefined)}
                onBlur={() => setOptionHovered(undefined)}
                borderColor={borderColor}
                isDisabled={
                  tutorialProgress > 1 && tutorialProgress < 4 && index !== 2
                }
              >
                <h2>
                  <AccordionButton
                    _expanded={{ backdropFilter: "brightness(0.90)" }}
                    color={textColor}
                  >
                    <Box flex="1" textAlign="left">
                      {getOptionTitle(tileGroup[0] as keyof ThemeSettings)}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {tileGroup[1].map((option: Option) => {
                  return (
                    <SettingOptionContainer
                      key={option.localStorageId}
                      option={option}
                      tileType={currentThemeSettings![option.tileId].tileType}
                      changeSetting={changeSetting}
                      textColor={textColor}
                      subTextColor={subTextColor}
                      resetOptionToDefault={resetOptionToDefault}
                      randomizeAllColorValues={randomizeAllColorValues}
                      resetAllColorsToDefault={resetAllColorsToDefault}
                      value={
                        currentThemeSettings![option.tileId!][
                          option.localStorageId as keyof TileSettings
                        ]
                      }
                    />
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
      <Footer textColor={textColor} />
    </Box>
  );
};

export default React.memo(SettingsSideBar);
