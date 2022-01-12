import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Bonsai from "@/components/Bonsai";
import ColorModeSwitcher from "@/components/ColorModeSwitcher";
import { HackerNewsFeed } from "@/components/HackerNewsFeed";
import { NiwaUvGraph } from "@/components/NiwaUvGraph";
import { SearchBar } from "@/components/SearchBar";
import { StravaGraph } from "@/components/StravaGraph";
import { SwimmingPoolTimeTable } from "@/components/SwimmingPoolTimeTable";
import { Time } from "@/components/Time";
import styles from "@/styles/Home.module.css";
import { HackerNewsLinkHolder } from "@/types/hackernews";
import { TransformedNiwaData } from "@/types/niwa";
import { StravaGraphData } from "@/types/strava";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getNiwaData } from "@/pages/api/niwaUV";
import { getStravaData } from "@/pages/api/strava";
import { WindFinderLinks } from "@/components/WindFinderLinks";
import { getWeatherData } from "./api/weather";
import { WeatherData } from "@/types/weather";
import { WeatherTile } from "@/components/WeatherTile";
import { getSpotifyNowPlayingData } from "./api/spotify";
import { Spotify } from "@/components/Spotify";
import { NowPlayingSpotifyData } from "@/types/spotify";

type PageProps = {
  stravaData: StravaGraphData;
  niwaData: TransformedNiwaData[];
  hackerNewsData: HackerNewsLinkHolder[];
  weatherData: WeatherData;
};

const Home: NextPage<PageProps> = ({
  stravaData,
  niwaData,
  hackerNewsData,
  weatherData,
}) => {
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
          py="5"
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
          bg="#9AB899"
        ></GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="#65abc1"
          minW="200px"
        >
          <WindFinderLinks />
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
          colSpan={1}
          rowSpan={2}
          bg="#9AB899"
        ></GridItem>
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
          rowSpan={2}
          borderRadius="15"
          colSpan={1}
          bg="#E89C4B"
          minW="200px"
        >
          <Time />
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
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#9AB899" pos="relative">
          <Spotify />
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
          <NiwaUvGraph niwaData={niwaData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="#65abc1"
          minW="200px"
        >
          <ColorModeSwitcher />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#65abc1">
          <WeatherTile weatherData={weatherData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={1}
          bg="#9AB899"
        ></GridItem>
      </Grid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const [stravaData, niwaData, hackerNewsData, weatherData] =
    await Promise.all([
      getStravaData(),
      getNiwaData(),
      getHackerNewsData(),
      getWeatherData(),
      getSpotifyNowPlayingData(),
    ]);

  return {
    props: { stravaData, niwaData, hackerNewsData, weatherData },
    revalidate: 600,
  };
};

export default Home;
