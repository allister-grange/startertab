import { TileGrid } from "@/components/grid/TileGrid";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtom";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { applyTheme, getCurrentTheme } from "@/helpers/settingsHelpers";
import { TileId, TileShape, UserSettings } from "@/types";
import {
  Box,
  Flex,
  Link,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState, useSetRecoilState } from "recoil";
import { deepClone } from "@/helpers/tileHelpers";

const Home: NextPage = () => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<TileId | undefined>();
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState<number>(-1);
  const [isMobileView, setIsMobileView] = useState<boolean>(() => isMobile);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);
  const { colorMode } = useColorMode();

  const setColorModeState = useSetRecoilState(colorModeState);

  const updateTileOrderInSettings = (newTiles: TileShape[]) => {
    const settingsToChange = deepClone(settings) as UserSettings;
    const themeToChange = getCurrentTheme(settingsToChange, colorMode);

    themeToChange.tileOrder = newTiles;
    setSettings(settingsToChange);
  };

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

  const showUpdateToast = useCallback(() => {
    toast({
      title: "I've made another update! v2.00",
      description: (
        <Text>
          This is a <span style={{ textDecoration: "underline" }}>huge</span>{" "}
          update. You can now download other people&apos;s themes. Check them
          out{" "}
          <Link color="coral" href="/themes#public">
            here
          </Link>
          .
        </Text>
      ),
      status: "info",
      duration: 10000,
      isClosable: true,
      position: "top",
    });
  }, [toast]);

  useEffect(() => {
    if (isMobile) {
      const isMobileView = localStorage.getItem("isMobileView");
      setShowingMobileWarning(isMobileView == null);
    } else {
      const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
      if (!hasVisitedBefore) {
        setShowingTutorial(true);
        setTutorialProgress(0);
        localStorage.setItem("hasVisitedBefore", "true");
        setTimeout(showNewTabToast, 45000);
      } else {
        localStorage.removeItem("hasSeenNewUpdate1.10");
        localStorage.removeItem("hasSeenNewUpdate1.20");
        const hasSeenNewUpdate = localStorage.getItem(
          "hasSeenNewUpdate2.00Counter"
        );
        if (!hasSeenNewUpdate) {
          localStorage.setItem("hasSeenNewUpdate2.00Counter", "1");
        } else {
          localStorage.setItem(
            "hasSeenNewUpdate2.00Counter",
            (parseInt(hasSeenNewUpdate) + 1).toString()
          );
          // only on the sixth visit since the update do we want to show the toast
          // I don't want to spam people who just finished the tutorial with toasts
          if (hasSeenNewUpdate === "6") {
            showUpdateToast();
          }
        }
      }
    }
  }, [isMobileView, showNewTabToast, showUpdateToast]);

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
    toDisplay = <MobileWarning setIsMobileView={setIsMobileView} />;
  } else {
    toDisplay = (
      <Box width="100%" display="flex" minH="100%">
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
          <Flex width="100%" overflow="auto" height="100%">
            <TileGrid
              tutorialProgress={tutorialProgress}
              optionHovered={optionHovered}
              gridGap={gridGap}
              tiles={currentTheme.tileOrder}
              updateTileOrderInSettings={updateTileOrderInSettings}
            />
          </Flex>
        </>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
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
    </>
  );
};

export default Home;
