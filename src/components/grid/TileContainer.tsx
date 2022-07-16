import {
  Bonsai,
  RedditFeed,
  SearchBar,
  SmallSpotifyTile,
  SmallWeatherTile,
  Time,
  UvGraph,
} from "@/components/tiles";
import { HackerNewsFeed } from "@/components/tiles/HackerNewsFeed";
import { LargeSpotifyTile } from "@/components/tiles/LargeSpotifyTile";
import { LargeStockTile } from "@/components/tiles/LargeStockTile";
import { LargeWeatherTile } from "@/components/tiles/LargeWeatherTile";
import { SmallStockTile } from "@/components/tiles/SmallStockTile";
import { SpotifyTopArtists } from "@/components/tiles/SpotifyTopArtists";
import StravaGraph from "@/components/tiles/StravaGraph";
import { TodoList } from "@/components/tiles/TodoList";
import ColorModeSwitcher from "@/components/ui/ColorModeSwitcher";
import SpotifyContextProvider from "@/context/SpotifyContext";
import StravaContextProvider from "@/context/StravaContext";
import { HackerNewsLinkHolder, TileId, TileType, TodoObject } from "@/types";
import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";

interface TileContainerProps {
  tileId: TileId;
  tileType: TileType;
  cityForWeather?: string;
  cityForUv?: string;
  stockName?: string;
  todoList?: TodoObject[];
  bonsaiBaseColor?: string;
  bonsaiTrunkColor?: string;
  tempDisplayInCelsius?: string;
  hackerNewsFeed?: string;
}

const TileContainer: React.FC<TileContainerProps> = ({
  tileId,
  tileType,
  cityForWeather,
  tempDisplayInCelsius,
  stockName,
  cityForUv,
  todoList,
  bonsaiBaseColor,
  bonsaiTrunkColor,
  hackerNewsFeed,
}) => {
  let tileToRender;

  switch (tileType) {
    case "Reddit Feed":
      tileToRender = <RedditFeed tileId={tileId} />;
      break;
    case "Hacker News Feed":
      tileToRender = <HackerNewsFeed tileId={tileId} />;
      break;
    case "Blank Tile":
      tileToRender = <Box width="100%" height="100%" />;
      break;
    case "Strava Graph":
      tileToRender = (
        <StravaContextProvider>
          <StravaGraph tileId={tileId} />
        </StravaContextProvider>
      );
      break;
    case "Search Bar":
      tileToRender = <SearchBar tileId={tileId} />;
      break;
    case "Bonsai":
      tileToRender = (
        <Bonsai baseColor={bonsaiBaseColor} trunkColor={bonsaiTrunkColor} />
      );
      break;
    case "Large Stock Tile":
      tileToRender = <LargeStockTile tileId={tileId} />;
      break;
    case "Large Weather Tile":
      tileToRender = (
        <LargeWeatherTile
          tempDisplayInCelsius={tempDisplayInCelsius}
          city={cityForWeather}
          tileId={tileId}
        />
      );
      break;
    case "Small Weather Tile":
      tileToRender = (
        <SmallWeatherTile
          tempDisplayInCelsius={tempDisplayInCelsius}
          city={cityForWeather}
          tileId={tileId}
        />
      );
      break;
    case "Small Spotify Tile":
      tileToRender = (
        <SpotifyContextProvider>
          <SmallSpotifyTile tileId={tileId} />
        </SpotifyContextProvider>
      );
      break;
    case "UV Graph":
      tileToRender = <UvGraph city={cityForUv} tileId={tileId} />;
      break;
    case "Time":
      tileToRender = <Time tileId={tileId} />;
      break;
    case "Theme Picker":
      tileToRender = <ColorModeSwitcher />;
      break;
    case "Todo List":
      tileToRender = <TodoList tileId={tileId} todoList={todoList} />;
      break;
    case "Spotify Top Artist Tile":
      tileToRender = (
        <SpotifyContextProvider>
          <SpotifyTopArtists tileId={tileId} />
        </SpotifyContextProvider>
      );
      break;
    case "Large Spotify Tile":
      tileToRender = (
        <SpotifyContextProvider>
          <LargeSpotifyTile tileId={tileId} />
        </SpotifyContextProvider>
      );
      break;
    case "Small Stock Tile":
      tileToRender = (
        <SmallStockTile tileId={tileId} stockNameFromSettings={stockName} />
      );
      break;
    default:
      tileToRender = (
        <Center height="100%" p="6">
          <Heading
            size="md"
            color={`var(--text-color-${tileId})`}
          >{`Give me a tile type in the settings ✌️`}</Heading>
        </Center>
      );
  }

  return (
    // SSR screws up the styles of the divs, TODO look into this later
    <>{tileToRender}</>
  );
};

export default React.memo(TileContainer);
