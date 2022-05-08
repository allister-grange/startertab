import { SettingsSideBar } from "@/components/sidebar/SettingsSidebar";
import {
  Bonsai,
  SearchBar,
  Spotify,
  StravaGraph, Time,
  UvGraph,
  WeatherTile
} from "@/components/tiles";
import { TileContainer } from "@/components/tiles/TileContainer";
import ColorModeSwitcher from "@/components/ui/ColorModeSwitcher";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getSpotifyNowPlayingData } from "@/pages/api/spotify";
import { getStravaData } from "@/pages/api/strava";
import { getUVData, getWeatherConditions } from "@/pages/api/weather";
import styles from "@/styles/Home.module.css";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileGroup,
  UserSettingsContextInterface,
  UvGraphData,
  WeatherData
} from "@/types";
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
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
  const [optionHovered, setOptionHovered] = useState<undefined | TileGroup>();
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
          bg="var(--bg-color-tile1)"
          overflowY="scroll"
          className={styles.disableScrollbars}
          outline={optionHovered === "HackerNews Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "HackerNews Tile"
              ? { transform: "scale(1.05)" }
              : {}
          }
          transition=".3s ease-in-out"
        >
          <TileContainer
            tileId={"tile1"}
            hackerNewsData={hackerNewsData}
            settings={inMemorySettings}
          />
        </GridItem>
        <GridItem
          rowSpan={4}
          bg="var(--bg-color-tile2)"
          colSpan={2}
          borderRadius="15"
          minH="300px"
          maxH="330px"
          minW="530px"
          outline={optionHovered === "Strava Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Strava Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <StravaGraph stravaData={stravaData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={4}
          overflowY="scroll"
          className={styles.disableScrollbars}
          bg="var(--bg-color-tile3)"
          outline={optionHovered === "Tile 3" ? "2px solid white" : ""}
          style={optionHovered === "Tile 3" ? { transform: "scale(1.05)" } : {}}
          transition=".3s ease-in-out"
          minW="230px"
        >
          <TileContainer
            tileId={"tile3"}
            hackerNewsData={hackerNewsData}
            settings={inMemorySettings}
          />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={5}
          bg="var(--bg-color-tile5)"
          minW="220px"
          overflowY="scroll"
          className={styles.disableScrollbars}
          outline={optionHovered === "Reddit Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Reddit Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <TileContainer
            tileId={"tile5"}
            hackerNewsData={hackerNewsData}
            settings={inMemorySettings}
          />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={3}
          rowSpan={1}
          bg="var(--bg-color-tile6)"
          minH="60px"
          outline={optionHovered === "Search Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Search Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <SearchBar />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={4}
          bg="var(--bg-color-tile7)"
          pos="relative"
          overflow="hidden"
          maxH="380px"
          minW="250px"
          outline={optionHovered === "Bonsai Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Bonsai Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <Bonsai />
        </GridItem>
        <GridItem
          rowSpan={2}
          borderRadius="15"
          colSpan={1}
          bg="var(--bg-color-tile8)"
          minW="200px"
          outline={optionHovered === "Weather Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Weather Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <WeatherTile weatherData={weatherData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={2}
          rowSpan={4}
          bg="var(--bg-color-tile10)"
          overflow="hidden"
          minH="310px"
          maxH="330px"
          outline={optionHovered === "UV Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "UV Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <UvGraph uvData={uvData} />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile11)"
          pos="relative"
          outline={optionHovered === "Clock Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Clock Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <Time />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile9)"
          minW="200px"
          outline={optionHovered === "Spotify Tile" ? "2px solid white" : ""}
          style={
            optionHovered === "Spotify Tile" ? { transform: "scale(1.05)" } : {}
          }
          transition=".3s ease-in-out"
        >
          <Spotify />
        </GridItem>
        <GridItem
          borderRadius="15"
          colSpan={1}
          rowSpan={2}
          bg="var(--bg-color-tile12)"
          outline={
            optionHovered === "Theme Changer Tile" ? "2px solid white" : ""
          }
          style={
            optionHovered === "Theme Changer Tile"
              ? { transform: "scale(1.05)" }
              : {}
          }
          transition=".3s ease-in-out"
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
