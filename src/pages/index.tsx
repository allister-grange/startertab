import { TileGrid } from "@/components/grid/TileGrid";
import { SettingsSideBar } from "@/components/sidebar/SettingsSidebar";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getSpotifyNowPlayingData } from "@/pages/api/spotify";
import { getStravaData } from "@/pages/api/strava";
import { getUVData, getWeatherConditions } from "@/pages/api/weather";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileId,
  UserSettingsContextInterface,
  UvGraphData,
  WeatherData
} from "@/types";
import { Box, useDisclosure } from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import type { GetStaticProps, NextPage } from "next";
import { useContext, useState } from "react";

type PageProps = {
  stravaData: StravaGraphData;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
  weatherData: WeatherData;
};

const Home: NextPage<PageProps> = ({
  stravaData,
  uvData,
  hackerNewsData,
  weatherData,
}) => {
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
        weatherData={weatherData}
      />
      {!isOpen && <SettingsToggle onOpen={onOpen} />}
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const [stravaData, uvData, hackerNewsData, weatherData] = await Promise.all([
    getStravaData(),
    getUVData(),
    getHackerNewsData(),
    getWeatherConditions(),
    getSpotifyNowPlayingData(),
  ]);

  return {
    props: { stravaData, uvData, hackerNewsData, weatherData },
    revalidate: 600,
  };
};

export default Home;
