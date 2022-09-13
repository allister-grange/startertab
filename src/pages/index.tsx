import { TileGrid } from "@/components/grid/TileGrid";
import {
  colorModeState,
  userSettingState,
} from "@/components/recoil/UserSettingsAtom";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { applyTheme, getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId } from "@/types";
import {
  Box,
  Flex,
  useColorMode,
  useDisclosure,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState, useSetRecoilState } from "recoil";

const Home: NextPage = () => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<TileId | undefined>();
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState<number>(-1);

  const [settings] = useRecoilState(userSettingState);
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);
  const { colorMode } = useColorMode();

  const setColorModeState = useSetRecoilState(colorModeState);

  const showNewTabToast = useCallback(() => {
    toast({
      title: "Want this to be your New Tab Page?",
      description: (
        <Text>
          You&apos;ll have to use{" "}
          <Link
            color="coral"
            href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
          >
            this extension
          </Link>{" "}
          or a similar one. This notification will never appear again,
          don&apos;t worry 🙂
        </Text>
      ),
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }, [toast]);

  useEffect(() => {
    if (isMobile) {
      setShowingMobileWarning(true);
    }

    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setShowingTutorial(true);
      setTutorialProgress(0);
      localStorage.setItem("hasVisitedBefore", "true");
      setTimeout(showNewTabToast, 45000);
    }
  }, [showNewTabToast]);

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
