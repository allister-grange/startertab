import { TileGrid } from "@/components/grid/TileGrid";
import { TileLayoutActions } from "@/components/grid/TileLayoutActions";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { ShowNewTabToast } from "@/components/toasts/ShowNewTabToast";
import { ShowUpdateToast } from "@/components/toasts/ShowUpdateToast";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { applyTheme, getCurrentTheme } from "@/helpers/settingsHelpers";
import { sidebarOpenAtom, tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtoms";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const Home: NextPage = () => {
  // sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<number | undefined>();

  // tutorial related state
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [isEditingTileGrid, setIsEditingTileGrid] = useState(false);

  const [colorMode] = useRecoilState(colorModeState);
  const setSidebarOpenAtom = useSetRecoilState(sidebarOpenAtom);

  useLayoutEffect(() => {
    const themeToChange = getCurrentTheme(settings, colorMode);
    applyTheme(themeToChange);

    const prefersDarkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // update system theme if it's turned on and was changed with the ThemeToChangeSelector
    if (
      settings.systemThemeSettings.usingSystemTheme &&
      prefersDarkTheme &&
      colorMode !== settings.systemThemeSettings.darkTheme
    ) {
      setSettings({
        ...settings,
        systemThemeSettings: {
          ...settings.systemThemeSettings,
          darkTheme: colorMode,
        },
      });
    } else if (
      settings.systemThemeSettings.usingSystemTheme &&
      !prefersDarkTheme &&
      colorMode !== settings.systemThemeSettings.lightTheme
    ) {
      setSettings({
        ...settings,
        systemThemeSettings: {
          ...settings.systemThemeSettings,
          lightTheme: colorMode,
        },
      });
    }
  }, [settings, colorMode, setSettings]);

  // legacy settings need to have the systemThemeSettings object added in
  useEffect(() => {
    if (!settings.systemThemeSettings) {
      setSettings({
        ...settings,
        systemThemeSettings: {
          lightTheme: "",
          darkTheme: "",
          usingSystemTheme: false,
        },
      });
    }
  }, [setSettings, settings]);

  // this is used to change tiles conditionally on the sidebar being open or tiles being edited
  useEffect(() => {
    setSidebarOpenAtom(isOpen || isEditingTileGrid);
  }, [isOpen, setSidebarOpenAtom, isEditingTileGrid]);

  let currentTheme = getCurrentTheme(settings, colorMode);

  const gridGap = currentTheme.globalSettings.gridGap;
  const settingsToggleColor = currentTheme.globalSettings.textColor;

  return (
    <>
      <Box width="100%" display="flex" minH="100%">
        {isOpen && (
          <SettingsSideBar
            onClose={onClose}
            isOpen={isOpen}
            setOptionHovered={setOptionHovered}
            setIsEditingTileGrid={setIsEditingTileGrid}
          />
        )}
        <>
          {showingTutorial && (
            <Tutorial setShowingTutorial={setShowingTutorial} />
          )}
          <Flex
            width="100%"
            overflow="auto"
            height="100%"
            onClick={() => setIsEditingTileGrid(false)}
          >
            <TileGrid
              isEditingTileGrid={isEditingTileGrid}
              setIsEditingTileGrid={setIsEditingTileGrid}
              optionHovered={optionHovered}
              gridGap={gridGap}
              layout={currentTheme.tileLayout}
              tiles={currentTheme.tiles}
            />
          </Flex>
        </>
      </Box>
      {isEditingTileGrid && <TileLayoutActions colorMode={colorMode} />}
      {!isOpen && tutorialProgress !== 0 && (
        <SettingsToggle
          onOpen={() => {
            onOpen();
            if (showingTutorial) {
              setTutorialProgress(tutorialProgress + 1);
            }
          }}
          color={settingsToggleColor}
        />
      )}
      <ShowUpdateToast />
      <ShowNewTabToast setShowingTutorial={setShowingTutorial} />
    </>
  );
};

export default Home;
