import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { NiwaUvGraph } from "../components/NiwaUvGraph";
import { SearchBar } from "../components/SearchBar";
import { SwimmingPoolTimeTable } from "../components/SwimmingPoolTimeTable";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ColorModeSwitcher />
      <Grid
        h="80vh"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem borderRadius="15" rowSpan={2} colSpan={1} bg="tomato" />
        <GridItem bg="orange" colSpan={2} borderRadius="15" w="525px" py="5">
          <NiwaUvGraph />
        </GridItem>
        <GridItem borderRadius="15" colSpan={2} bg="papayawhip">
          <SwimmingPoolTimeTable />
        </GridItem>
        <GridItem borderRadius="15" colSpan={4} bg="blue">
          <SearchBar />
        </GridItem>
      </Grid>
      <Grid p="5"></Grid>
    </div>
  );
};

export default Home;
