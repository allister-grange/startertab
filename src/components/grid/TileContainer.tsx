import {
  Bonsai,
  RedditFeed,
  SearchBar,
  SmallSpotifyTile,
  Time,
  UvGraph,
  WeatherTile,
} from "@/components/tiles";
import { HackerNewsFeed } from "@/components/tiles/HackerNewsFeed";
import { LargeSpotifyTile } from "@/components/tiles/LargeSpotifyTile";
import { SmallStockTile } from "@/components/tiles/SmallStockTile";
import StravaGraph from "@/components/tiles/StravaGraph";
import { TodoList } from "@/components/tiles/TodoList";
import ColorModeSwitcher from "@/components/ui/ColorModeSwitcher";
import SpotifyContextProvider from "@/context/SpotifyContext";
import StravaContextProvider from "@/context/StravaContext";
import {
  HackerNewsLinkHolder,
  TileId,
  TileType,
  TodoObject,
  UvGraphData,
} from "@/types";
import { Center, Heading } from "@chakra-ui/react";
import React from "react";

interface TileContainerProps {
  tileId: TileId;
  hackerNewsData: HackerNewsLinkHolder[];
  uvData: UvGraphData[];
  tileType: TileType;
  city?: string;
  stockName?: string;
  todoList?: TodoObject[];
  bonsaiBaseColor?: string;
  bonsaiTrunkColor?: string;
}

const TileContainer: React.FC<TileContainerProps> = ({
  tileId,
  hackerNewsData,
  uvData,
  tileType,
  city,
  stockName,
  todoList,
  bonsaiBaseColor,
  bonsaiTrunkColor,
}) => {
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
    case "Weather":
      tileToRender = <WeatherTile city={city} tileId={tileId} />;
      break;
    case "Small Spotify Tile":
      tileToRender = (
        <SpotifyContextProvider>
          <SmallSpotifyTile tileId={tileId} />
        </SpotifyContextProvider>
      );
      break;
    case "UV Graph":
      tileToRender = <UvGraph uvData={uvData} tileId={tileId} />;
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
        <Center height="100%" p="10">
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
