import {
  BonsaiTile,
  DayPlannerTile,
  FavoriteLinksTile,
  HackerNewsFeedTile,
  LargeSpotifyTile,
  LargeStockTile,
  LargeWeatherTile,
  MarkdownFileTile,
  OutlookMeetingsTile,
  RedditFeedTile,
  RSSFeedTile,
  SearchBarTile,
  SmallSpotifyTile,
  SmallStockTile,
  SmallWeatherTile,
  SpotifyTopArtistsTile,
  TimeTile,
  TwitterFeedTile,
  UvGraphTile,
} from "@/components/tiles";
import { NoneTile } from "@/components/tiles/NoneTile";
import StravaGraphTile from "@/components/tiles/StravaGraphTile";
import ThemePickerTile from "@/components/tiles/ThemePickerTile";
import { TileErrorBoundary } from "@/components/tiles/TileErrorBoundary";
import TodoListTile from "@/components/tiles/TodoListTile";
import GoogleContextProvider, { GoogleContext } from "@/context/GoogleContext";
import OutlookContextProvider from "@/context/OutlookContext";
import SpotifyContextProvider from "@/context/SpotifyContext";
import StravaContextProvider from "@/context/StravaContext";
import TwitterContextProvider from "@/context/TwitterContext";
import {
  bookingsSelector,
  todoListSelector,
} from "@/recoil/UserSettingsSelectors";
import { Booking, TileSize, TileType, TodoObject } from "@/types";
import { Box } from "@chakra-ui/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { GoogleMeetingsTile } from "../tiles/GoogleMeetingsTile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

interface TileContainerProps {
  tileId: number;
  tileType: TileType;
  tileSize: TileSize;
  hackerNewsFeed?: string;
}

const TileContainer: React.FC<TileContainerProps> = ({
  tileId,
  tileType,
  tileSize,
}) => {
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
    case "Outlook Meetings Tile":
      tileToRender = (
        <OutlookContextProvider>
          <OutlookMeetingsTile tileId={tileId} />
        </OutlookContextProvider>
      );
      break;
    case "Google Meetings Tile":
      tileToRender = (
        <GoogleContextProvider>
          <GoogleMeetingsTile tileId={tileId} />
        </GoogleContextProvider>
      );
      break;
    default:
      tileToRender = <NoneTile tileId={tileId} tileSize={tileSize} />;
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
