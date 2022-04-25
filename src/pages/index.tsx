import { SettingsSideBar } from "@/components/sidebar/SettingsSidebar";
import {
  Bonsai,
  HackerNewsFeed,
  RedditFeed,
  SearchBar,
  Spotify,
  StravaGraph,
  SwimmingPoolTimeTable,
  Time,
  UvGraph,
  WeatherTile,
  WindFinderLinks,
} from "@/components/tiles";
import ColorModeSwitcher from "@/components/ui/ColorModeSwitcher";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getSpotifyNowPlayingData } from "@/pages/api/spotify";
import { getStravaData } from "@/pages/api/strava";
import { getUVData, getWeatherConditions } from "@/pages/api/weather";
import styles from "@/styles/Home.module.css";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  UvGraphData,
  WeatherData,
} from "@/types";
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";

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

  return (
    <Box h="100vh" display="flex" alignItems="center" overflow="auto">
      <SettingsSideBar onClose={onClose} isOpen={isOpen} />
      <Grid
        h="100%"
        templateRows="repeat(9, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        maxW="1500px"
        maxH="760px"
        marginX="auto"
        p="4"
      >
        <GridItem
          borderRadius="15"
          rowSpan={5}
          colSpan={1}
          bg="var(--bg-color-tile-1)"
          overflowY="scroll"
          className={styles.disableScrollbars}
        >
          <HackerNewsFeed hackerNewsData={hackerNewsData} />
        </GridItem>
        <GridItem
          rowSpan={4}
          bg="var(--bg-color-tile-2)"
          colSpan={2}
          borderRadius="15"
          minH="300px"
          maxH="330px"
          minW="530px"
        >
          <StravaGraph stravaData={stravaData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile-3)"
        >
          <WindFinderLinks />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={5}
          bg="var(--bg-color-tile-5)"
          minW="220px"
          overflowY="scroll"
          className={styles.disableScrollbars}
        >
          <RedditFeed />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile-4)"
          minWidth="200px"
        >
          <SwimmingPoolTimeTable />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={3}
          rowSpan={1}
          bg="var(--bg-color-tile-6)"
          minH="60px"
        >
          <SearchBar />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={4}
          bg="var(--bg-color-tile-7)"
          pos="relative"
          overflow="hidden"
          maxH="380px"
          minW="250px"
        >
          <Bonsai />
        </GridItem>
        <GridItem
          rowSpan={2}
          borderRadius="15"
          colSpan={1}
          bg="var(--bg-color-tile-8)"
          minW="200px"
        >
          <WeatherTile weatherData={weatherData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={2}
          rowSpan={4}
          bg="var(--bg-color-tile-10)"
          overflow="hidden"
          minH="310px"
          maxH="330px"
        >
          <UvGraph uvData={uvData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile-11)"
          pos="relative"
        >
          <Time />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile-9)"
          minW="200px"
        >
          <Spotify />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile-12)"
        >
          <ColorModeSwitcher />
        </GridItem>
      </Grid>
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
