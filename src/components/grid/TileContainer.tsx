import {
  Bonsai,
  RedditFeed,
  SearchBar,
  Spotify,
  StravaGraph,
  Time,
  UvGraph,
  WeatherTile,
} from "@/components/tiles";
import { HackerNewsFeed } from "@/components/tiles/HackerNewsFeed";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileId,
  UserSettings,
  UvGraphData,
  WeatherData,
} from "@/types";
import { Center, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";
import NoSSR from "react-no-ssr";
import { LargeSpotifyTile } from "../tiles/LargeSpotifyTile";
import { TodoList } from "../tiles/TodoList";
import ColorModeSwitcher from "../ui/ColorModeSwitcher";

interface TileContainerProps {
  tileId: TileId;
  hackerNewsData: HackerNewsLinkHolder[];
  settings: UserSettings;
  stravaData: StravaGraphData;
  weatherData: WeatherData;
  uvData: UvGraphData[];
}

export const TileContainer: React.FC<TileContainerProps> = ({
  tileId,
  hackerNewsData,
  settings,
  stravaData,
  weatherData,
  uvData
}) => {
  const { colorMode } = useColorMode();

  const currentTheme = getCurrentTheme(settings, colorMode);

  const tileType = currentTheme[tileId].tileType;

  let tileToRender;

  switch (tileType) {
    case "Reddit Feed":
      tileToRender = <RedditFeed tileId={tileId} />;
      break;
    case "Hacker News Feed":
      tileToRender = (
        <HackerNewsFeed hackerNewsData={hackerNewsData} tileId={tileId} />
      );
      break;
    case "Strava Graph":
      tileToRender = <StravaGraph stravaData={stravaData} tileId={tileId} />;
      break;
    case "Search Bar":
      tileToRender = <SearchBar tileId={tileId} />;
      break;
    case "Bonsai":
      tileToRender = <Bonsai tileId={tileId} />;
      break;
    case "Weather":
      tileToRender = <WeatherTile weatherData={weatherData} tileId={tileId} />;
      break;
    case "Spotify":
      tileToRender = <Spotify tileId={tileId} />;
      break;
    case "UV Graph":
      tileToRender = <UvGraph uvData={uvData} tileId={tileId}/>
      break;
    case "Time":
      tileToRender = <Time tileId={tileId}/>
      break;
    case "Theme Picker":
      tileToRender = <ColorModeSwitcher tileId={tileId}/>
      break;
    case "Todo List":
      tileToRender = <TodoList tileId={tileId}/>
      break;
    case "Large Spotify Tile":
      tileToRender = <LargeSpotifyTile tileId={tileId}/>
      break;
    default:
      tileToRender = (
        <Center height="100%" p="4">
          <Heading
            size="md"
            color={`var(--text-color-${tileId})`}
          >{`Give me a tile type in the settings ✌️`}</Heading>
        </Center>
      );
  }

  return (
    // SSR screws up the styles of the divs, TODO look into this later
    <NoSSR>{tileToRender}</NoSSR>
  );
};
