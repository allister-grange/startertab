import { TileGrid } from "@/components/grid/TileGrid";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getUVData } from "@/pages/api/weather";
import {
  HackerNewsLinkHolder,
  TileId,
  UserSettingsContextInterface,
  UvGraphData,
} from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import NoSSR from "react-no-ssr";
const SettingsSideBar = dynamic(
  () => import("@/components/sidebar/SettingsSidebar")
);

type PageProps = {
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
};

const Home: NextPage<PageProps> = ({ uvData, hackerNewsData }) => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<undefined | TileId>();
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const [showTutorial, setShowTutorial] = useState(false);
  const [inMemorySettings, setInMemorySettings] = useState(() =>
    cloneDeep(settings)
  );
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (isMobile) {
      setShowingMobileWarning(true);
    }

    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    if (!hasVisitedBefore) {
      setShowTutorial(true);
      document.body.style.background = "white";
    }
  }, []);

  const currentTheme = getCurrentTheme(settings, colorMode);
  const gridGap = currentTheme.globalSettings.gridGap;
  const settingsToggleColor = currentTheme.globalSettings.textColor;
  let toDisplay;

  if (showingMobileWarning) {
    toDisplay = (
      <MobileWarning />
    );
  } else if (showTutorial) {
    toDisplay = <Tutorial setShowTutorial={setShowTutorial} />;
  } else {
    toDisplay = (
      <Box h="100vh" display="flex" alignItems="center">
        <SettingsSideBar
          onClose={onClose}
          isOpen={isOpen}
          setOptionHovered={setOptionHovered}
          settings={settings}
          inMemorySettings={inMemorySettings}
          setSettings={setSettings}
          setInMemorySettings={setInMemorySettings}
        />
        <NoSSR>
          <TileGrid
            optionHovered={optionHovered}
            inMemorySettings={inMemorySettings}
            uvData={uvData}
            hackerNewsData={hackerNewsData}
            gridGap={gridGap}
          />
        </NoSSR>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {!isOpen && !showTutorial && (
        <SettingsToggle onOpen={onOpen} color={settingsToggleColor} />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [uvData, hackerNewsData] = await Promise.all([
    getUVData('Wellington'),
    getHackerNewsData(),
  ]);

  return {
    props: { uvData, hackerNewsData },
  };
};

export default Home;
