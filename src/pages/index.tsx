import {
  HackerNewsFeed,
  StravaGraph,
  WindFinderLinks,
  SwimmingPoolTimeTable,
  SearchBar,
  Time,
  Spotify,
  WeatherTile,
  Bonsai,
  UvGraph,
  RedditFeed,
} from "@/components/tiles";
import ColorModeSwitcher from "@/components/ui/ColorModeSwitcher";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getStravaData } from "@/pages/api/strava";
import styles from "@/styles/Home.module.css";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  UvGraphData,
  WeatherData,
} from "@/types";
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { getSpotifyNowPlayingData } from "@/pages/api/spotify";
import { getUVData, getWeatherConditions } from "@/pages/api/weather";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsModal } from "@/components/SettingsModal";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h="100vh" display="flex" alignItems="center">
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
      <SettingsModal onClose={onClose} isOpen={isOpen} />
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
