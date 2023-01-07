import { TileGrid } from "@/components/grid/TileGrid";
import { TileLayoutActions } from "@/components/grid/TileLayoutActions";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import {
  applyTheme,
  findNewTileId,
  getCurrentTheme,
  getNewSettingsFromLegacyTheme,
} from "@/helpers/settingsHelpers";
import { deepClone } from "@/helpers/tileHelpers";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtom";
import { TileSettings, TileSize, UserSettings } from "@/types";
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
import { Layouts } from "react-grid-layout";
import { useRecoilState, useSetRecoilState } from "recoil";

const Home: NextPage = () => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<number | undefined>();
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState<number>(-1);
  const [isMobileView, setIsMobileView] = useState<boolean>(() => isMobile);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);
  const [isEditingTiles, setIsEditingTiles] = useState(false);
  const { colorMode } = useColorMode();

  const setColorModeState = useSetRecoilState(colorModeState);

  const updateTileLayoutInSettings = (newLayout: Layouts) => {
    const settingsToChange = deepClone(settings) as UserSettings;
    const themeToChange = getCurrentTheme(settingsToChange, colorMode);

    themeToChange.tileLayout = newLayout;
    setSettings(settingsToChange);
  };

  const addNewTileIntoGrid = (size: TileSize) => {
    const settingsToChange = deepClone(settings) as UserSettings;
    const themeToChange = getCurrentTheme(settingsToChange, colorMode);

    const newTileId = findNewTileId(themeToChange.tiles);

    const newTile: TileSettings = {
      tileId: newTileId,
      tileType: "None",
      tileSize: size,
      backgroundColor: themeToChange.tiles[0]
        ? themeToChange.tiles[0].backgroundColor
        : "white",
      textColor: themeToChange.tiles[0]
        ? themeToChange.tiles[0].textColor
        : "black",
    };

    // add tile to tiles and layout on themeToChange
    themeToChange.tiles.push(newTile);

    let width = 1,
      height = 1,
      minH = 1,
      minW = 1;

    if (size === "small") {
      width = 1;
      height = 2;
      minH = 2;
      minW = 1;
    } else if (size === "medium") {
      width = 1;
      height = 4;
      minH = 3;
      minW = 1;
    } else if (size === "large") {
      width = 2;
      height = 4;
      minH = 4;
      minW = 2;
    } else if (size === "long") {
      width = 3;
      height = 1;
      minH = 1;
      minW = 2;
    }

    for (const key in themeToChange.tileLayout) {
      themeToChange.tileLayout[key].push({
        // depending on the size, I can change the layout size
        w: width,
        h: height,
        x: 0,
        y: 0,
        i: newTile.tileId.toString(),
        minH,
        minW,
      });
    }
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
      title: "I've made another update! v2.10",
      description: (
        <Text>
          This is a another{" "}
          <span style={{ textDecoration: "underline" }}>huge</span> update. You
          can now drag, drop, delete and add tiles into your grid. Check it out{" "}
          <Link color="coral" href="/updates">
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

  const removeTileFromLayout = (tileId: number) => {
    const newSettings = deepClone(settings);
    const themeToEdit = newSettings.themes.find(
      (theme) => theme.themeName === currentTheme.themeName
    );

    if (!themeToEdit) {
      return;
    }

    // remove tile from the theme
    const themeIndexToRemove = themeToEdit.tiles.findIndex(
      (tile) => tile.tileId === tileId
    );
    themeToEdit.tiles.splice(themeIndexToRemove, 1);
    // shift all the tileId's down one index from the index above the one deleted
    for (let i = themeIndexToRemove; i < themeToEdit.tiles.length; i++) {
      themeToEdit.tiles[i].tileId--;
    }

    // remove tile from all of the layouts
    for (const layout in themeToEdit.tileLayout) {
      const layoutToEdit = themeToEdit.tileLayout[layout];
      const layoutIndexToRemove = layoutToEdit.findIndex(
        (tile) => tile.i === tileId.toString()
      );
      layoutToEdit.splice(layoutIndexToRemove, 1);
      for (let i = layoutIndexToRemove; i < layoutToEdit.length; i++) {
        layoutToEdit[i].i = (parseInt(layoutToEdit[i].i) - 1).toString();
      }
    }

    setSettings(newSettings);
  };

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
        localStorage.removeItem("hasSeenNewUpdate2.00Counter");
        const hasSeenNewUpdate = localStorage.getItem(
          "hasSeenNewUpdate2.10Counter"
        );
        if (!hasSeenNewUpdate) {
          localStorage.setItem("hasSeenNewUpdate2.10Counter", "1");
        } else {
          localStorage.setItem(
            "hasSeenNewUpdate2.10Counter",
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
    setColorModeState(colorMode);
    const themeToChange = getCurrentTheme(settings, colorMode);
    applyTheme(themeToChange);
  }, [settings, colorMode, setColorModeState]);

  const currentTheme = getCurrentTheme(settings, colorMode);
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
        {isOpen ? (
          <SettingsSideBar
            onClose={onClose}
            isOpen={isOpen}
            setOptionHovered={setOptionHovered}
            setTutorialProgress={setTutorialProgress}
            tutorialProgress={tutorialProgress}
            setIsEditingTiles={setIsEditingTiles}
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
              updateTileLayoutInSettings={updateTileLayoutInSettings}
              tiles={currentTheme.tiles}
              removeTileFromLayout={removeTileFromLayout}
            />
          </Flex>
        </>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {isEditingTiles ? (
        <TileLayoutActions
          setIsEditingTiles={setIsEditingTiles}
          addNewTileIntoGrid={addNewTileIntoGrid}
        />
      ) : null}
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
