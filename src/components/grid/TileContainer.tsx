import {
  BonsaiTile,
  RedditFeedTile,
  SearchBarTile,
  SmallSpotifyTile,
  SmallWeatherTile,
  TimeTile,
  UvGraphTile,
  HackerNewsFeedTile,
  LargeSpotifyTile,
  LargeStockTile,
  SmallStockTile,
  SpotifyTopArtistsTile,
  LargeWeatherTile,
  TodoListTile,
  Booking,
} from "@/components/tiles";
import SpotifyContextProvider from "@/context/SpotifyContext";
import StravaContextProvider from "@/context/StravaContext";
import { TileId, TileType, TodoObject } from "@/types";
import { Box, Center, Heading } from "@chakra-ui/react";
import StravaGraphTile from "@/components/tiles/StravaGraphTile";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TileErrorBoundary } from "@/components/tiles/TileErrorBoundary";
import ThemePickerTile from "@/components/tiles/ThemePickerTile";
import DayPlannerTile from "@/components/tiles/DayPlanner/DayPlannerTile";

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
  bookings?: Booking[];
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
  bookings,
}) => {
  let tileToRender;

  switch (tileType) {
    case "Reddit Feed":
      tileToRender = <RedditFeedTile tileId={tileId} />;
      break;
    case "Hacker News Feed":
      tileToRender = <HackerNewsFeedTile tileId={tileId} />;
      break;
    case "Blank Tile":
      tileToRender = <Box width="100%" height="100%" />;
      break;
    case "Strava Graph":
      tileToRender = (
        <StravaContextProvider>
          <StravaGraphTile tileId={tileId} />
        </StravaContextProvider>
      );
      break;
    case "Search Bar":
      tileToRender = <SearchBarTile tileId={tileId} />;
      break;
    case "Bonsai":
      tileToRender = (
        <BonsaiTile baseColor={bonsaiBaseColor} trunkColor={bonsaiTrunkColor} />
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
      tileToRender = <UvGraphTile city={cityForUv} tileId={tileId} />;
      break;
    case "Time":
      tileToRender = <TimeTile tileId={tileId} />;
      break;
    case "Theme Picker":
      tileToRender = <ThemePickerTile />;
      break;
    case "Todo List":
      tileToRender = <TodoListTile tileId={tileId} todoList={todoList} />;
      break;
    case "Spotify Top Artist Tile":
      tileToRender = (
        <SpotifyContextProvider>
          <SpotifyTopArtistsTile tileId={tileId} />
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
    case "Day Planner":
      tileToRender = <DayPlannerTile tileId={tileId} bookings={bookings} />;
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
    <ErrorBoundary FallbackComponent={TileErrorBoundary}>
      {tileToRender}
    </ErrorBoundary>
  );
};

export default React.memo(TileContainer);
