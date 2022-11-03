import {
  NowPlayingSpotifyData,
  SpotifyContextInterface,
  TopArtistSpotify,
  TopArtistSpotifyData,
} from "@/types";
import * as React from "react";
import { useRef, useState } from "react";

export const SpotifyContext =
  React.createContext<SpotifyContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const SpotifyContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const [spotifyData, setSpotifyData] = useState<NowPlayingSpotifyData>({
    playing: false,
    songTitle: undefined,
    songArtist: undefined,
    link: undefined,
    albumFullSizeImageUrl: undefined,
    albumPreviewUrl: undefined,
    playable: false,
  });
  const [topArtists, setTopArtists] = useState<TopArtistSpotify[]>([]);
  const refreshingInterval = useRef<NodeJS.Timer | undefined>();

  React.useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await fetch("/api/spotify/me");
        const { loggedIn } = await res.json();
        setIsAuthenticated(loggedIn);
      } catch (err) {
        throw new Error(err as string);
      }
    };

    checkIfLoggedIn();
  }, []);

  const fetchCurrentSong = React.useCallback(async () => {
    try {
      let res = await fetch(`/api/spotify/currentlyPlaying`);

      // if no music is playing, fetch last song
      if (res.status === 204) {
        res = await fetch(`/api/spotify/recentlyPlayed`, { method: "GET" });
      }
      // refresh tokens
      else if (res.status === 401) {
        await fetch(`/api/spotify/refreshTokens`, { method: "POST" });
        return;
      }

      let data = (await res.json()) as NowPlayingSpotifyData;
      setSpotifyData(data);
    } catch (err) {
      console.error("Failed fetching current song", err);
    }
  }, []);

  const fetchTopArtistData = React.useCallback(async (timeRage: string) => {
    setTopArtists([]);
    try {
      const res = await fetch(`/api/spotify/topArtists?timeRange=${timeRage}`);

      // refresh tokens
      if (res.status === 401) {
        await fetch(`/api/spotify/refreshTokens`, { method: "POST" });
        return;
      }

      let data = (await res.json()) as TopArtistSpotifyData;
      setTopArtists(data.topArtists);
    } catch (err) {
      console.error("Failed fetching top artists", err);
    }
  }, []);

  const setRefreshingInterval = React.useCallback(() => {
    const interval = setInterval(fetchCurrentSong, 900);
    refreshingInterval.current = interval;
  }, [fetchCurrentSong]);

  // User has logged in and has an access/refresh token
  React.useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchCurrentSong();
    fetchTopArtistData("long_term");
    setRefreshingInterval();
    return () => clearInterval(refreshingInterval.current!);
  }, [
    fetchCurrentSong,
    fetchTopArtistData,
    isAuthenticated,
    setRefreshingInterval,
  ]);

  const loginWithSpotify = React.useCallback(async () => {
    const res = await fetch("/api/spotify/redirectUri");
    const redirectUri = (await res.json()).redirectUri;

    window.location = redirectUri as (string | Location) & Location;
  }, []);

  const skipSong = async (forward: boolean) => {
    try {
      clearInterval(refreshingInterval.current!);
      const res = await fetch(`/api/spotify/changeSong?forward=${forward}`, {
        method: "POST",
      });

      // refresh tokens
      if (res.status === 401) {
        await fetch(`/api/spotify/refreshTokens`, { method: "POST" });
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshingInterval();
    }
  };

  const pausePlaySong = async (pause: boolean) => {
    try {
      clearInterval(refreshingInterval.current!);
      const res = await fetch(`/api/spotify/pauseOrPlaySong?pause=${pause}`, {
        method: "PUT",
      });

      // refresh tokens
      if (res.status === 401) {
        await fetch(`/api/spotify/refreshTokens`, { method: "POST" });
        return;
      }
    } catch (err) {
      console.error(err);
      setSpotifyData({
        ...spotifyData,
        playing: pause,
      } as NowPlayingSpotifyData);
    } finally {
      setRefreshingInterval();
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        isAuthenticated,
        spotifyData,
        loginWithSpotify,
        skipSong,
        pausePlaySong,
        topArtists,
        fetchTopArtistData,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyContextProvider;
