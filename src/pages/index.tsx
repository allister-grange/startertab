import { TileGrid } from "@/components/grid/TileGrid";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getStravaData } from "@/pages/api/strava";
import { getUVData } from "@/pages/api/weather";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
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
const SettingsSideBar = dynamic(
  () => import("@/components/sidebar/SettingsSidebar")
);

type PageProps = {
  stravaData: StravaGraphData;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
};

const Home: NextPage<PageProps> = ({ stravaData, uvData, hackerNewsData }) => {
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

  let toDisplay;

  if (showingMobileWarning) {
    toDisplay = (
      <Center height="100vh" bg="white" color="black" p="5">
        <Flex flexDir={"column"} justifyContent="center" alignItems="center">
          <Heading color="orange">⚠️⚠️⚠️</Heading>
          <Heading mt="6" textAlign="center">
            This website is not designed for mobile devices, please come back on
            a bigger display!
          </Heading>
        </Flex>
      </Center>
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
        <TileGrid
          optionHovered={optionHovered}
          inMemorySettings={inMemorySettings}
          stravaData={stravaData}
          uvData={uvData}
          hackerNewsData={hackerNewsData}
          gridGap={
            getCurrentTheme(inMemorySettings, colorMode).globalSettings.gridGap
          }
        />
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {!isOpen && !showTutorial && (
        <SettingsToggle
          onOpen={onOpen}
          color={
            getCurrentTheme(inMemorySettings, colorMode).globalSettings
              .textColor
          }
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [stravaData, uvData, hackerNewsData] = await Promise.all([
    getStravaData(),
    getUVData(),
    getHackerNewsData(),
  ]);

  return {
    props: { stravaData, uvData, hackerNewsData },
  };
};

export default Home;
