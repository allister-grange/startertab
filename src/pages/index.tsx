import { TileGrid } from "@/components/grid/TileGrid";
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
  UvGraphData
} from "@/types";
import { Box, useColorMode, useDisclosure } from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
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

  const [inMemorySettings, setInMemorySettings] = useState(() =>
    cloneDeep(settings)
  );

  const { colorMode } = useColorMode();

  return (
    <Box h="100vh" display="flex" alignItems="center" overflow="auto">
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
      />
      {!isOpen && (
        <SettingsToggle
          onOpen={onOpen}
          color={getCurrentTheme(settings, colorMode).globalSettings.textColor}
        />
      )}
    </Box>
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
    revalidate: 600,
  };
};

export default Home;
