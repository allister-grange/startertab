import { Grid, GridItem } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Bonsai from "../components/Bonsai";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { HackerNewsFeed } from "../components/HackerNewsFeed";
import { NiwaUvGraph } from "../components/NiwaUvGraph";
import { SearchBar } from "../components/SearchBar";
import { StravaGraph } from "../components/StravaGraph";
import { SwimmingPoolTimeTable } from "../components/SwimmingPoolTimeTable";
import { Time } from "../components/Time";
import styles from "../styles/Home.module.css";
import { HackerNewsLinkHolder } from "../types/hackernews";
import { TransformedNiwaData } from "../types/niwa";
import { StravaGraphData } from "../types/strava";
import { getHackerNewsData } from "./api/hackerNews";
import { getNiwaData } from "./api/niwaUV";
import { getStravaData } from "./api/strava";

type PageProps = {
  stravaData: StravaGraphData,
  niwaData: TransformedNiwaData[],
  hackerNewsLinks: HackerNewsLinkHolder[],
}

const Home: NextPage<PageProps> = ({ stravaData, niwaData, hackerNewsLinks }) => {
  return (
    <div className={styles.container}>
      <Grid
        h="90vh"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          borderRadius="15"
          rowSpan={2}
          colSpan={1}
          bg="#30A56C"
          overflowY="scroll"
          className={styles.disableScrollbars}
        >
          <HackerNewsFeed hackerNewsLinks={hackerNewsLinks}/>
        </GridItem>
        <GridItem bg="#F76808" colSpan={2} borderRadius="15" py="5">
          <StravaGraph stravaData={stravaData} />
        </GridItem>
        <GridItem borderRadius="15" colSpan={2} bg="papayawhip">
          <SwimmingPoolTimeTable />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={4}
          rowSpan={1}
          bg="#0654A4"
          minH="60px"
        >
          <SearchBar />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} bg="#F76808">
          <Time />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="papayawhip"
          pos="relative"
          overflow="hidden"
          maxH="380px"
        >
          <Bonsai />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={1} bg="#AB4AB9">
          {/* <Box>quick link</Box> */}
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={2}
          rowSpan={2}
          bg="#30A56C"
          overflow="hidden"
          minH="310px"
          maxH="350px"
        >
          <NiwaUvGraph niwaData={niwaData}/>
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} bg="#AB4AB9" maxH="200px">
          <ColorModeSwitcher />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} bg="#0654A4">
          {/* <Box>quick link/toggle for light/dark mode?</Box> */}
        </GridItem>
      </Grid>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const stravaData = await getStravaData();
  const niwaData = await getNiwaData();
  const hackerNewsLinks = await getHackerNewsData();

  return { props: { stravaData, niwaData, hackerNewsLinks }, revalidate: 600 };
};

export default Home;
