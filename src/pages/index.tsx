import { TileGrid } from "@/components/grid/TileGrid";
import { TileLayoutActions } from "@/components/grid/TileLayoutActions";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { ShowNewTabToast } from "@/components/toasts/ShowNewTabToast";
import { ShowUpdateToast } from "@/components/toasts/ShowUpdateToast";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { applyTheme } from "@/helpers/settingsHelpers";
import { sidebarOpenAtom, tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import {
  themeNameSelector,
  themeSelector,
} from "@/recoil/UserSettingsSelectors";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Home: NextPage = () => {
  // sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<number | undefined>();

  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [isEditingTileGrid, setIsEditingTileGrid] = useState(false);

  const setSidebarOpenAtom = useSetRecoilState(sidebarOpenAtom);

  const currentTheme = useRecoilValue(themeSelector);
  const setThemeName = useSetRecoilState(themeNameSelector);

  // legacy settings need to have the systemThemeSettings object added in
  useLayoutEffect(() => {
    if (!settings.systemThemeSettings) {
      setSettings({
        ...settings,
        systemThemeSettings: {
          lightTheme: "",
          darkTheme: "",
          usingSystemTheme: false,
          currentThemeName: window.localStorage
            .getItem("themeName")
            ?.replaceAll('"', "") as string,
        },
      });
    }
  }, [setSettings, settings]);

  useLayoutEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // used to change tiles conditionally on the sidebar being open or tiles being edited
  useEffect(() => {
    setSidebarOpenAtom(isOpen || isEditingTileGrid);
  }, [isOpen, setSidebarOpenAtom, isEditingTileGrid]);

  // sets the theme based whether the user wants to use the system theme settings
  useEffect(() => {
    if (
      !settings.systemThemeSettings ||
      !settings.systemThemeSettings.usingSystemTheme
    ) {
      return;
    }

    const prefersDarkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    console.log("Setting theme name in the useEffect");
    if (prefersDarkTheme && settings.systemThemeSettings.darkTheme) {
      setThemeName(settings.systemThemeSettings.darkTheme);
    } else if (!prefersDarkTheme && settings.systemThemeSettings.lightTheme) {
      setThemeName(settings.systemThemeSettings.lightTheme);
    }
    // only time this is skipped in the project, has to be because
    // settings.systemThemeSettings might be undefined in the older clients
    // using the app, and including it in the array will cause infinite renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setThemeName]);

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
      {isEditingTileGrid && <TileLayoutActions />}
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
