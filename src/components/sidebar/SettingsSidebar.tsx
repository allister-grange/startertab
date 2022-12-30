import {
  Footer,
  SideBarTitle,
  ThemeToChangeSelector,
} from "@/components/sidebar";
import SettingOptionContainer from "@/components/sidebar/SettingOptionContainer";
import { getCurrentTheme, getThemeNames } from "@/helpers/settingsHelpers";
import {
  globalSettingsOptions,
  sideBarLargeTileOptions,
  sideBarLongTileOptions,
  sideBarMediumTileOptions,
  sideBarSmallTileOptions,
} from "@/helpers/sideBarOptions";
import { deepClone } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import styles from "@/styles/Home.module.css";
import { Option } from "@/types";
import { TileSettings, UserSettings } from "@/types/settings";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  ExpandedIndex,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { OutlinedButton } from "../ui/OutlinedButton";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  setOptionHovered: React.Dispatch<SetStateAction<number | undefined>>;
  setTutorialProgress: Dispatch<SetStateAction<number>>;
  setIsEditingTiles: Dispatch<SetStateAction<boolean>>;
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
  setIsEditingTiles,
  tutorialProgress,
}) => {
  const { colorMode } = useColorMode();
  const [settings, setSettings] = useRecoilState(userSettingState);
  const inMemorySettingsRef = useRef(settings);
  const [accordionIndex, setAccordionIndex] = useState<ExpandedIndex>([]);

  // used to animate the width of the sidebar
  const [width, setWidth] = useState("0px");

  React.useEffect(() => {
    if (isOpen) {
      setWidth("320px");
    }
  }, [isOpen]);

  const currentThemeSettings = React.useMemo(() => {
    let currentTheme = settings.themes.find(
      (theme) => theme.themeName === colorMode
    );
    if (!currentTheme) {
      currentTheme = settings.themes[0];
    }
    return currentTheme;
  }, [colorMode, settings.themes]);

  // apply the in memory settings into localStorage
  const onSaveHandler = () => {
    const permanentSettings = deepClone(settings);
    setSettings(permanentSettings);
    inMemorySettingsRef.current = permanentSettings;
    setIsEditingTiles(false);
  };

  // reset the background, colors etc back to what is in the userSettings before changes
  const onExitHandler = () => {
    // close the sidebar
    setWidth("0px");
    setTimeout(onClose, 500);
    // reset settings
    setSettings(deepClone(settings));
    setIsEditingTiles(false);
    setOptionHovered(undefined);
    setAccordionIndex([]);
    setSettings(inMemorySettingsRef.current);
  };

  const changeSetting = React.useCallback(
    <K extends keyof TileSettings>(
      key: K,
      value: TileSettings[K],
      tileId: number
    ) => {
      const userSettings = JSON.parse(JSON.stringify(settings)) as UserSettings;
      const themeToChange = getCurrentTheme(userSettings, colorMode);

      if (tileId >= 0) {
        themeToChange.tiles[tileId][key] = value;
      } else {
        themeToChange.globalSettings[key] = value;
      }

      setSettings(userSettings);
    },
    [colorMode, setSettings, settings]
  );

  const randomizeAllColorValues = <K extends keyof TileSettings>() => {
    let newSettings = deepClone(settings);
    const themeToChange = getCurrentTheme(newSettings, colorMode);

    themeToChange.tiles.forEach((tile) => {
      for (const item in tile) {
        if (item.toLowerCase().includes("color")) {
          const newColorSetting = randomHexValue();

          if (tile.tileId === -1) {
            themeToChange.globalSettings[item as K] =
              newColorSetting as TileSettings[K];
          } else {
            themeToChange.tiles[tile.tileId][item as K] =
              newColorSetting as TileSettings[K];
          }
        }
      }
    });

    setSettings(newSettings);
  };

  const onAccordionChange = (expandedIndex: ExpandedIndex) => {
    setAccordionIndex(expandedIndex);

    // for the tutorial, if we open the dropdown we want to progress the tutorial
    setTutorialProgress((prevState) => (prevState === 3 ? 4 : prevState));
  };

  if (!currentThemeSettings) {
    return <></>;
  }

  const backgroundColor =
    currentThemeSettings?.globalSettings.sidebarBackgroundColor!;
  const textColor = currentThemeSettings?.globalSettings.textColor;
  const subTextColor = currentThemeSettings?.globalSettings.subTextColor!;
  const borderColor = currentThemeSettings?.globalSettings.sidebarBorderColor!;
  // const optionGroups = Object.entries(sortedOptions);

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
      top="0"
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
        <Link
          href="/themes"
          color={textColor}
          border={`1px solid ${textColor}`}
          borderRadius="md"
          py="2"
          display="block"
          textAlign="center"
          transition="all .2s"
          _hover={{
            transform: "translateY(-2px)",
          }}
          _focus={{
            border: `2px solid ${textColor}`,
            transform: "translateY(-2px)",
          }}
        >
          Manage Themes
        </Link>
        <Box mt="4" />
        <OutlinedButton
          color={textColor}
          border={`1px solid ${textColor}`}
          borderRadius="md"
          py="2"
          display="block"
          textAlign="center"
          transition="all .2s"
          width="100%"
          fontWeight="400"
          _hover={{
            transform: "translateY(-2px)",
          }}
          _focus={{
            border: `2px solid ${textColor}`,
            transform: "translateY(-2px)",
          }}
          onClick={() => setIsEditingTiles((isEditing) => !isEditing)}
        >
          Edit Tile Grid
        </OutlinedButton>
        <Box mt="4" />
        <Accordion
          allowMultiple
          onChange={onAccordionChange}
          index={accordionIndex}
        >
          {/* GLOBAL SETTINGS */}
          <AccordionItem
            key={-1}
            p="0"
            borderColor={borderColor}
            isDisabled={tutorialProgress > 1 && tutorialProgress < 4}
          >
            <h2>
              <AccordionButton
                _expanded={{ backdropFilter: "brightness(0.90)" }}
                color={textColor}
              >
                <Box flex="1" textAlign="left">
                  {"Global Settings"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {globalSettingsOptions.map((option: Option) => {
              const tileType = currentThemeSettings.globalSettings.tileType;
              const value =
                currentThemeSettings.globalSettings[
                  option.localStorageId as keyof TileSettings
                ];
              return (
                <SettingOptionContainer
                  key={option.localStorageId}
                  option={option}
                  tileId={-1}
                  tileType={tileType}
                  changeSetting={changeSetting}
                  textColor={textColor}
                  subTextColor={subTextColor}
                  randomizeAllColorValues={randomizeAllColorValues}
                  value={value}
                />
              );
            })}
          </AccordionItem>

          {/* TILE SETTINGS */}
          {currentThemeSettings.tiles.map((tile, index) => {
            let optionsForTile;

            switch (tile.tileSize) {
              case "small":
                optionsForTile = sideBarSmallTileOptions;
                break;
              case "medium":
                optionsForTile = sideBarMediumTileOptions;
                break;
              case "large":
                optionsForTile = sideBarLargeTileOptions;
                break;
              case "long":
                optionsForTile = sideBarLongTileOptions;
                break;
            }

            return (
              <AccordionItem
                key={tile.tileId}
                p="0"
                onMouseEnter={() => setOptionHovered(tile.tileId)}
                onFocus={() => setOptionHovered(tile.tileId)}
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
                      {currentThemeSettings.tiles[tile.tileId].tileType}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {optionsForTile.map((option: Option) => {
                  const tileType =
                    currentThemeSettings!.tiles[tile.tileId].tileType;
                  const value =
                    currentThemeSettings!.tiles[tile.tileId][
                      option.localStorageId as keyof TileSettings
                    ];

                  return (
                    <SettingOptionContainer
                      key={option.localStorageId}
                      option={option}
                      tileType={tileType}
                      tileId={tile.tileId}
                      changeSetting={changeSetting}
                      textColor={textColor}
                      subTextColor={subTextColor}
                      randomizeAllColorValues={randomizeAllColorValues}
                      value={value}
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
