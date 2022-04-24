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
import { useLocalStorage } from "@/helpers/useLocalStorage";
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
import {
  Box,
  Grid,
  GridItem,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";

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
  const [settings] = useLocalStorage("userSettings");
  const { colorMode } = useColorMode();

  // TODO might need to more this somewhere to make sure it happens before SSR
  useEffect(() => {
    const currentTheme = settings.themes.find(
      (theme) => theme.themeName === colorMode
    );

    document.body.style.backgroundColor = currentTheme?.backgroundColor!;
  }, [colorMode, settings]);

  return (
    <Box h="100vh" display="flex" alignItems="center">
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
          bg="#65abc1"
          overflowY="scroll"
          className={styles.disableScrollbars}
        >
          <HackerNewsFeed hackerNewsData={hackerNewsData} />
        </GridItem>
        <GridItem
          rowSpan={4}
          bg="#E89C4B"
          colSpan={2}
          borderRadius="15"
          minH="300px"
          maxH="330px"
          minW="530px"
        >
          <StravaGraph stravaData={stravaData} />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#9AB899">
          <WindFinderLinks />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={5}
          bg="#E89C4B"
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
          bg="#65abc1"
          minWidth="200px"
        >
          <SwimmingPoolTimeTable />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={3}
          rowSpan={1}
          bg="#F06808"
          minH="60px"
        >
          <SearchBar />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={4}
          bg="#E89C4B"
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
          bg="#65abc1"
          minW="200px"
        >
          <WeatherTile weatherData={weatherData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={2}
          rowSpan={4}
          bg="#E89C4B"
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
          bg="#9AB899"
          pos="relative"
        >
          <Time />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="#9AB899"
          minW="200px"
        >
          <Spotify />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#65abc1">
          <ColorModeSwitcher />
        </GridItem>
      </Grid>
      <SettingsToggle onOpen={onOpen} />
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
