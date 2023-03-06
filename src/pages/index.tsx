import { TileGrid } from "@/components/grid/TileGrid";
import { TileLayoutActions } from "@/components/grid/TileLayoutActions";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { ShowNewTabToast } from "@/components/toasts/ShowNewTabToast";
import { ShowUpdateToast } from "@/components/toasts/ShowUpdateToast";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import {
  applyTheme,
  getCurrentTheme,
  getNewSettingsFromLegacyTheme,
} from "@/helpers/settingsHelpers";
import {
  colorModeState,
  settingsSidebarSate,
  userSettingState,
} from "@/recoil/UserSettingsAtom";
import { Box, Flex, useColorMode, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState, useSetRecoilState } from "recoil";

const Home: NextPage = () => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<number | undefined>();

  // tutorial related state
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState<number>(-1);

  // need two states for mobile view because people can ignore the warning and continue
  const [isMobileView, setIsMobileView] = useState<boolean>(() => isMobile);
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [isEditingTiles, setIsEditingTiles] = useState(false);
  const { colorMode, setColorMode } = useColorMode();

  const setColorModeState = useSetRecoilState(colorModeState);
  const setSettingsSidebarSate = useSetRecoilState(settingsSidebarSate);

  useEffect(() => {
    if (isMobile) {
      const isMobileView = localStorage.getItem("isMobileView");
      setShowingMobileWarning(isMobileView == null);
    }
  }, [isMobileView]);

  useEffect(() => {
    setColorModeState(colorMode);
    const themeToChange = getCurrentTheme(settings, colorMode);
    applyTheme(themeToChange);
  }, [settings, colorMode, setColorModeState]);

  // this is used to change tiles conditionally on the sidebar being open
  useEffect(() => {
    setSettingsSidebarSate(isOpen);
  }, [isOpen, setSettingsSidebarSate]);

  const currentTheme = getCurrentTheme(settings, colorMode);

  // if there's no color mode set in the cookies/local storage
  if (!colorMode) {
    setColorMode(currentTheme.themeName);
  }

  // legacy settings need to be switched over to new format
  if ((currentTheme as any).tile1) {
    const newSettingsFormat = getNewSettingsFromLegacyTheme(settings);
    setSettings(newSettingsFormat);
  }
  const gridGap = currentTheme.globalSettings.gridGap;
  const settingsToggleColor = currentTheme.globalSettings.textColor;
  let toDisplay;

  if (showingMobileWarning) {
    toDisplay = <MobileWarning setIsMobileView={setIsMobileView} />;
  } else {
    toDisplay = (
      <Box width="100%" display="flex" minH="100%">
        {isOpen && (
          <SettingsSideBar
            onClose={onClose}
            isOpen={isOpen}
            setOptionHovered={setOptionHovered}
            setTutorialProgress={setTutorialProgress}
            tutorialProgress={tutorialProgress}
            setIsEditingTiles={setIsEditingTiles}
          />
        )}
        <>
          {showingTutorial && (
            <Tutorial
              setShowingTutorial={setShowingTutorial}
              tutorialProgress={tutorialProgress}
              setTutorialProgress={setTutorialProgress}
            />
          )}
          <Flex
            width="100%"
            overflow="auto"
            height="100%"
            onClick={() => setIsEditingTiles(false)}
          >
            <TileGrid
              tutorialProgress={tutorialProgress}
              isEditingTiles={isEditingTiles}
              setIsEditingTiles={setIsEditingTiles}
              optionHovered={optionHovered}
              gridGap={gridGap}
              layout={currentTheme.tileLayout}
              tiles={currentTheme.tiles}
            />
          </Flex>
        </>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {isEditingTiles && <TileLayoutActions colorMode={colorMode} />}
      {!isOpen && !showingMobileWarning && (
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
      <ShowNewTabToast
        setShowingTutorial={setShowingTutorial}
        setTutorialProgress={setTutorialProgress}
      />
    </>
  );
};

export default Home;
