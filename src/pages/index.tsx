import { TileGrid } from "@/components/grid/TileGrid";
import {
  colorModeState,
  userSettingState,
} from "@/components/recoil/UserSettingsAtom";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsContext } from "@/context/UserSettingsContext";
import { applyTheme, getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, UserSettingsContextInterface } from "@/types";
import { Box, Flex, useColorMode, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
const SettingsSideBar = dynamic(
  () => import("@/components/sidebar/SettingsSidebar")
);
import { useSetRecoilState } from "recoil";

const Home: NextPage = () => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<TileId | undefined>();
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState<number>(-1);
  const { settings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);
  const { colorMode } = useColorMode();

  const setColorModeState = useSetRecoilState(colorModeState);

  useEffect(() => {
    if (isMobile) {
      setShowingMobileWarning(true);
    }

    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setShowingTutorial(true);
      setTutorialProgress(0);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  useEffect(() => {
    const themeToChange = getCurrentTheme(settings, colorMode);
    setColorModeState(colorMode);
    applyTheme(themeToChange);
  }, [settings, colorMode, setColorModeState]);

  const currentTheme = getCurrentTheme(settings, colorMode);
  const gridGap = currentTheme.globalSettings.gridGap;
  const settingsToggleColor = currentTheme.globalSettings.textColor;
  let toDisplay;

  if (showingMobileWarning) {
    toDisplay = <MobileWarning />;
  } else {
    toDisplay = (
      <Box
        height="100vh"
        width="100%"
        position="fixed"
        display="flex"
        alignItems="center"
      >
        {isOpen ? (
          <SettingsSideBar
            onClose={onClose}
            isOpen={isOpen}
            setOptionHovered={setOptionHovered}
            setTutorialProgress={setTutorialProgress}
            tutorialProgress={tutorialProgress}
          />
        ) : null}
        <>
          {showingTutorial ? (
            <Tutorial
              setShowingTutorial={setShowingTutorial}
              tutorialProgress={tutorialProgress}
              setTutorialProgress={setTutorialProgress}
            />
          ) : null}
          <Flex width="100%" height="100%" overflow="auto">
            <TileGrid
              tutorialProgress={tutorialProgress}
              optionHovered={optionHovered}
              gridGap={gridGap}
            />
          </Flex>
        </>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {!isOpen && (
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
    </>
  );
};

export default Home;
