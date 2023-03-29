import { AccordionItem } from "@/components/accordion/AccordionItem";
import {
  Footer,
  SideBarTitle,
  ThemeToChangeSelector,
} from "@/components/sidebar";
import { ExportImportButtons } from "@/components/sidebar/ExportImportButtons";
import SettingOptionContainer from "@/components/sidebar/SettingOptionContainer";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { getCurrentTheme, getThemeNames } from "@/helpers/settingsHelpers";
import {
  globalSettingsOptions,
  sideBarLargeTileOptions,
  sideBarLongTileOptions,
  sideBarMediumTileOptions,
  sideBarSmallTileOptions,
} from "@/helpers/sideBarOptions";
import { deepClone } from "@/helpers/tileHelpers";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtoms";
import styles from "@/styles/Home.module.css";
import { Option } from "@/types";
import { TileSettings, UserSettings } from "@/types/settings";
import { Box, Link } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  setOptionHovered: React.Dispatch<SetStateAction<number | undefined>>;
  setTutorialProgress: Dispatch<SetStateAction<number>>;
  setIsEditingTileGrid: Dispatch<SetStateAction<boolean>>;
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
  setIsEditingTileGrid,
  tutorialProgress,
}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const inMemorySettingsRef = useRef(settings);
  const colorMode = useRecoilValue(colorModeState);

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
    setIsEditingTileGrid(false);
  };

  // reset the background, colors etc back to what is in the userSettings before changes
  const onExitHandler = () => {
    // close the sidebar
    setWidth("0px");
    setTimeout(onClose, 500);
    // reset settings
    setSettings(deepClone(settings));
    setIsEditingTileGrid(false);
    setOptionHovered(undefined);
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

    for (const tile of themeToChange.tiles) {
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
    }

    setSettings(newSettings);
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
          onClick={() =>
            setIsEditingTileGrid((isEditingTileGrid) => !isEditingTileGrid)
          }
        >
          Edit Tile Grid
        </OutlinedButton>
        <Box mt="4" />
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
        <ExportImportButtons
          textColor={textColor}
          currentTheme={currentThemeSettings}
          setSettings={setSettings}
          settings={settings}
        />
        <Box mt="4" />

        <Box>
          {/* GLOBAL SETTINGS */}
          <AccordionItem
            key={-1}
            p="0"
            borderColor={borderColor}
            accordionIndex={0}
            title="Global Settings"
            textColor={textColor}
            setTutorialProgress={setTutorialProgress}
            isDisabled={tutorialProgress > 1 && tutorialProgress < 3}
          >
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
                accordionIndex={index + 1}
                title={currentThemeSettings.tiles[tile.tileId].tileType}
                onMouseEnter={() => setOptionHovered(tile.tileId)}
                onFocus={() => setOptionHovered(tile.tileId)}
                onMouseLeave={() => setOptionHovered(undefined)}
                onBlur={() => setOptionHovered(undefined)}
                borderColor={borderColor}
                textColor={textColor}
                setTutorialProgress={setTutorialProgress}
                borderBottom={
                  index === currentThemeSettings.tiles.length - 1
                    ? `1px solid ${borderColor ?? "#E2E8F0"}`
                    : undefined
                }
                isDisabled={tutorialProgress > 1 && tutorialProgress < 3}
              >
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
        </Box>
      </Box>
      <Footer textColor={textColor} />
    </Box>
  );
};

export default SettingsSideBar;
