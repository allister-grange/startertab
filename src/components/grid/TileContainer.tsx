import {
  bookingsSelector,
  todoListSelector,
} from "@/recoil/UserSettingsSelectors";
import {
  BonsaiTile,
  HackerNewsFeedTile,
  LargeSpotifyTile,
  DayPlannerTile,
  LargeStockTile,
  LargeWeatherTile,
  RedditFeedTile,
  SearchBarTile,
  SmallSpotifyTile,
  SmallStockTile,
  SmallWeatherTile,
  SpotifyTopArtistsTile,
  TimeTile,
  UvGraphTile,
  TwitterFeedTile,
  MarkdownFileTile,
  RSSFeedTile,
  FavoriteLinksTile,
} from "@/components/tiles";
import TodoListTile from "@/components/tiles/TodoListTile";
import StravaGraphTile from "@/components/tiles/StravaGraphTile";
import ThemePickerTile from "@/components/tiles/ThemePickerTile";
import { TileErrorBoundary } from "@/components/tiles/TileErrorBoundary";
import SpotifyContextProvider from "@/context/SpotifyContext";
import StravaContextProvider from "@/context/StravaContext";
import { Booking, TileId, TileType, TodoObject } from "@/types";
import { Box, Center, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import TwitterContextProvider from "@/context/TwitterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

interface TileContainerProps {
  tileId: TileId;
  tileType: TileType;
  hackerNewsFeed?: string;
}

const TileContainer: React.FC<TileContainerProps> = ({ tileId, tileType }) => {
  let tileToRender;
  // need to pass in these states as props as they're objects
  // and recoil only uses '===' as comparison, to prevent a
  // rerender I need to go a deep comparison on the Component itself
  const [bookings, setBookings] = useRecoilState(bookingsSelector(tileId)) as [
    Booking[] | undefined,
    SetterOrUpdater<Booking[] | undefined>
  ];
  const [todoList, setTodoList] = useRecoilState(todoListSelector(tileId)) as [
    TodoObject[] | undefined,
    SetterOrUpdater<TodoObject[] | undefined>
  ];
  // error keys to keep a track of the error boundary state, bit of a hack
  const [errorKeys, setErrorKeys] = useState<string | undefined>();

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  switch (tileType) {
    case "Reddit Feed":
      tileToRender = <RedditFeedTile tileId={tileId} />;
      break;
    case "Favorite Links Tile":
      tileToRender = <FavoriteLinksTile tileId={tileId} />;
      break;
    case "Hacker News Feed":
      tileToRender = <HackerNewsFeedTile tileId={tileId} />;
      break;
    case "Markdown File Tile":
      tileToRender = <MarkdownFileTile tileId={tileId} />;
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
      tileToRender = <BonsaiTile tileId={tileId} />;
      break;
    case "Large Stock Tile":
      tileToRender = <LargeStockTile tileId={tileId} />;
      break;
    case "Large Weather Tile":
      tileToRender = <LargeWeatherTile tileId={tileId} />;
      break;
    case "Small Weather Tile":
      tileToRender = <SmallWeatherTile tileId={tileId} />;
      break;
    case "Small Spotify Tile":
      tileToRender = (
        <SpotifyContextProvider>
          <SmallSpotifyTile tileId={tileId} />
        </SpotifyContextProvider>
      );
      break;
    case "UV Graph":
      tileToRender = <UvGraphTile tileId={tileId} />;
      break;
    case "Time":
      tileToRender = <TimeTile tileId={tileId} />;
      break;
    case "Theme Picker":
      tileToRender = <ThemePickerTile />;
      break;
    case "Todo List":
      tileToRender = (
        <TodoListTile
          tileId={tileId}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      );
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
      tileToRender = <SmallStockTile tileId={tileId} />;
      break;
    case "RSS Feed Tile":
      tileToRender = <RSSFeedTile tileId={tileId} />;
      break;
    case "Day Planner":
      tileToRender = (
        <DayPlannerTile
          tileId={tileId}
          bookings={bookings}
          setBookings={setBookings}
        />
      );
      break;
    case "Twitter Feed Tile":
      tileToRender = (
        <TwitterContextProvider>
          <TwitterFeedTile tileId={tileId} />
        </TwitterContextProvider>
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
    <ErrorBoundary
      resetKeys={[errorKeys]}
      FallbackComponent={({ error }) => (
        <TileErrorBoundary tileId={tileId} setErrorKeys={setErrorKeys} />
      )}
    >
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {tileToRender}
      </PersistQueryClientProvider>
    </ErrorBoundary>
  );
};

export default React.memo(TileContainer);
