import { AccordionItem } from "@/components/accordion/AccordionItem";
import {
  Footer,
  SideBarTitle,
  ThemeToChangeSelector,
} from "@/components/sidebar";
import { ExportImportButtons } from "@/components/sidebar/ExportImportButtons";
import SettingOptionContainer from "@/components/sidebar/SettingOptionContainer";
import { UsingSystemThemeToggle } from "@/components/sidebar/UsingSystemThemeToggle";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { getThemeNames } from "@/helpers/settingsHelpers";
import {
  globalSettingsOptions,
  sideBarLargeTileOptions,
  sideBarLongTileOptions,
  sideBarMediumTileOptions,
  sideBarSmallTileOptions,
} from "@/helpers/sideBarOptions";
import { deepClone } from "@/helpers/tileHelpers";
import {
  accordionOpenIndex,
  tutorialProgressAtom,
} from "@/recoil/SidebarAtoms";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import { themeNameSelector } from "@/recoil/UserSettingsSelectors";
import styles from "@/styles/Home.module.css";
import { Option } from "@/types";
import { TileSettings } from "@/types/settings";
import { Box, Link, useDisclosure } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { SaveChangesAlert } from "@/components/sidebar/SaveChangesAlert";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  setOptionHovered: React.Dispatch<SetStateAction<number | undefined>>;
  setIsEditingTileGrid: Dispatch<SetStateAction<boolean>>;
}

const randomHexValue = (): string => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  onClose,
  isOpen,
  setOptionHovered,
  setIsEditingTileGrid,
}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const inMemorySettingsRef = useRef(settings);
  const tutorialProgress = useRecoilValue(tutorialProgressAtom);
  const themeName = useRecoilValue(themeNameSelector);
  const setAccordionIndexes = useSetRecoilState(accordionOpenIndex);
  // used to animate the width of the sidebar
  const [width, setWidth] = useState("0px");
  // used to track if changes have been made to the state to ensure you don't lose changes closing the sidebar
  const changesMadeRef = useRef(false);
  const {
    isOpen: isSaveChangesPromptOpen,
    onOpen: onSaveChangesPromptOpen,
    onClose: onSaveChangesClosePrompt,
  } = useDisclosure();
  const cancelSaveChangesRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      setWidth("320px");
    }
  }, [isOpen]);

  const currentThemeSettings = React.useMemo(() => {
    let currentTheme = settings.themes.find(
      (theme) => theme.themeName === themeName
    );
    if (!currentTheme) {
      currentTheme = settings.themes[0];
    }
    return currentTheme;
  }, [settings.themes, themeName]);

  // apply the in memory settings into localStorage
  const onSaveHandler = (shouldCloseSidebar: boolean) => {
    const permanentSettings = deepClone(settings);
    setSettings(permanentSettings);
    inMemorySettingsRef.current = permanentSettings;
    setIsEditingTileGrid(false);
    // reset the changes made flag - the changes are already saved
    changesMadeRef.current = false;
    if (shouldCloseSidebar) {
      exitSidebar();
    }
  };

  const onDiscardChangesHandler = () => {
    setSettings(inMemorySettingsRef.current);
    exitSidebar();
  };

  const exitSidebar = () => {
    // close the sidebar
    setWidth("0px");
    setTimeout(onClose, 500);
    setTimeout(() => setAccordionIndexes([]), 300);
    // reset settings
    setIsEditingTileGrid(false);
    setOptionHovered(undefined);
  };

  const onExitHandler = () => {
    // if the user has made changes without hitting save,
    // bring up a prompt to ensure you don't lose changes if you don't want to
    if (
      changesMadeRef.current === true ||
      currentThemeSettings.themeName !==
        inMemorySettingsRef.current.systemThemeSettings.currentThemeName
    ) {
      onSaveChangesPromptOpen();
    } else {
      exitSidebar();
    }
  };

  const changeSetting = React.useCallback(
    <K extends keyof TileSettings>(
      key: K,
      value: TileSettings[K],
      tileId: number
    ) => {
      const userSettings = deepClone(settings);
      const themeToEdit = userSettings.themes.find(
        (theme) => theme.themeName === themeName
      );

      if (!themeToEdit) {
        console.error("Couldn't find the theme");
        return;
      }

      if (tileId >= 0) {
        themeToEdit.tiles[tileId][key] = value;
      } else {
        themeToEdit.globalSettings[key] = value;
      }

      changesMadeRef.current = true;
      setSettings(userSettings);
    },
    [setSettings, settings, themeName]
  );

  const randomizeAllColorValues = <K extends keyof TileSettings>() => {
    let newSettings = deepClone(settings);
    const themeToEdit = newSettings.themes.find(
      (theme) => theme.themeName === themeName
    );

    if (!themeToEdit) {
      console.error("Couldn't find the theme");
      return;
    }

    for (const tile of themeToEdit.tiles) {
      for (const item in tile) {
        if (item.toLowerCase().includes("color")) {
          const newColorSetting = randomHexValue();

          if (tile.tileId === -1) {
            themeToEdit.globalSettings[item as K] =
              newColorSetting as TileSettings[K];
          } else {
            themeToEdit.tiles[tile.tileId][item as K] =
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
  const themeNames = getThemeNames(settings);

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
        <ThemeToChangeSelector textColor={textColor} themeNames={themeNames} />

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
        <UsingSystemThemeToggle
          textColor={textColor}
          subTextColor={subTextColor}
          themeNames={themeNames}
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
      <SaveChangesAlert
        isOpen={isSaveChangesPromptOpen}
        onOpen={onSaveChangesPromptOpen}
        onClose={onSaveChangesClosePrompt}
        cancelRef={cancelSaveChangesRef}
        discardChanges={onDiscardChangesHandler}
        saveChanges={onSaveHandler}
      />
      <Footer textColor={textColor} />
    </Box>
  );
};

export default SettingsSideBar;
