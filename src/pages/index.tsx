import { Center, Grid, GridItem } from "@chakra-ui/react";
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
import { WindIconDark } from "@/components/icons/WindIconDark";
import { WindFinderLinks } from "@/components/WindFinderLinks";

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
        templateRows="repeat(9, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        maxW="1500px"
        maxH="760px"
        marginX={"auto"}
      >
        <GridItem
          borderRadius="15"
          rowSpan={5}
          colSpan={1}
          bg="#65abc1"
          overflowY="scroll"
          className={styles.disableScrollbars}
        >
          <HackerNewsFeed hackerNewsLinks={hackerNewsLinks}/>
        </GridItem>
        <GridItem rowSpan={4} bg="#E89C4B" colSpan={2} borderRadius="15" py="5" minH="330px" maxH="330px">
          <StravaGraph stravaData={stravaData} />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#9AB899">
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#65abc1">
          <WindFinderLinks />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#65abc1">
          <SwimmingPoolTimeTable />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#9AB899">
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
        <GridItem rowSpan={2} borderRadius="15" colSpan={1} bg="#E89C4B">
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
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#9AB899">
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
          <NiwaUvGraph niwaData={niwaData}/>
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#65abc1" >
          <ColorModeSwitcher />
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={2} bg="#65abc1">
        </GridItem>
        <GridItem borderRadius="15" colSpan={1} rowSpan={1} bg="#9AB899">
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
