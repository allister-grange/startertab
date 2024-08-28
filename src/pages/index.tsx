import { TileGrid } from "@/components/grid/TileGrid";
import { TileLayoutActions } from "@/components/grid/TileLayoutActions";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { ShowNewTabToast } from "@/components/toasts/ShowNewTabToast";
import { ShowUpdateToast } from "@/components/toasts/ShowUpdateToast";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { applyTheme } from "@/helpers/settingsHelpers";
import {
  isEditingTileGridAtom,
  tutorialProgressAtom,
} from "@/recoil/SidebarAtoms";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import {
  themeNameSelector,
  themeSelector,
} from "@/recoil/UserSettingsSelectors";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { Container, IOptions } from "@tsparticles/engine";
import React from "react";

const Home: NextPage = () => {
  // sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<number | undefined>();

  const [init, setInit] = useState(false);

  const router = useRouter();
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [isEditingTileGrid, setIsEditingTileGrid] = useState(false);

  const setIsEditingTileGridAtom = useSetRecoilState(isEditingTileGridAtom);

  const currentTheme = useRecoilValue(themeSelector);
  const setThemeName = useSetRecoilState(themeNameSelector);

  // if this is the preview window on the landing page, skip the tutorial
  if (router.query.preview) {
    setTutorialProgress(-1);
  }

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

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // used to change tiles conditionally on the sidebar being open or tiles being edited
  useEffect(() => {
    setIsEditingTileGridAtom(isOpen || isEditingTileGrid);
  }, [isOpen, setIsEditingTileGridAtom, isEditingTileGrid]);

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

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  console.log(init);

  return (
    <>
      {init && currentTheme.globalSettings.backgroundEffectsOptions && (
        <Particles
          id="tsparticles"
          options={
            JSON.parse(
              currentTheme.globalSettings.backgroundEffectsOptions
            ) as IOptions
          }
          particlesLoaded={particlesLoaded}
        />
      )}
      {/* <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
      /> */}
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
