import {
  NowPlayingSpotifyData,
  SpotifyContextInterface,
  TopArtistSpotify,
  TopArtistSpotifyData,
} from "@/types";
import * as React from "react";
import { useState } from "react";

const SPOTIFY_ACCESS_TOKEN = "spotifyAccessToken";
const SPOTIFY_REFRESH_TOKEN = "spotifyRefreshToken";

export const SpotifyContext =
  React.createContext<SpotifyContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const SpotifyContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [spotifyData, setSpotifyData] = useState<NowPlayingSpotifyData>({
    playing: false,
    songTitle: undefined,
    songArtist: undefined,
    link: undefined,
    albumImageUrl: undefined,
    playable: false,
  });
  const [topArtists, setTopArtists] = useState<TopArtistSpotify[]>([]);

  // only needs to run when the user has clicked 'continue with spotify'
  // used for grabbing the access and refresh token and storing them in
  // local storage
  React.useEffect(() => {
    // user is logged in, no need to process
    if (isAuthenticated) {
      return;
    }

    // check if the user has already logged in before, but not in this session
    const accessTokenFromStorage = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    const refreshTokenFromStorage = localStorage.getItem(SPOTIFY_REFRESH_TOKEN);
    if (accessTokenFromStorage && refreshTokenFromStorage) {
      setIsAuthenticated(true);
      setAccessToken(accessTokenFromStorage);
      setRefreshToken(refreshTokenFromStorage);
      return;
    } else {
      setIsAuthenticated(false);
    }

    // user hasn't logged in before, and has been redirected from Spotify login
    const searchTerms = new URLSearchParams(location.search);
    const accessToken = searchTerms.get("accessToken");
    const refreshToken = searchTerms.get("refreshToken");
    const isSpotifyRedirect = searchTerms.get("fromSpotify");

    if (!accessToken || !refreshToken || !isSpotifyRedirect) {
      return;
    }

    localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
    localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    history.pushState(
      null,
      "New Page",
      window.location.toString().split("?")[0]
    );
  }, [isAuthenticated]);

  const fetchCurrentSong = React.useCallback(async () => {
    const res = await fetch(
      `/api/spotify?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
    let data = (await res.json()) as NowPlayingSpotifyData;

    // if there is an accessToken returned, the old one was stale
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, data.accessToken);
    }

    setSpotifyData(data);
  }, [accessToken, refreshToken]);

  const fetchTopArtistData = React.useCallback(async (timeRage: string) => {
    setTopArtists([]);
    const res = await fetch(
      `/api/spotify/topArtists?accessToken=${accessToken}&refreshToken=${refreshToken}` +
        `&timeRange=${timeRage}`
    );
    let data = (await res.json()) as TopArtistSpotifyData;

    // if there is an accessToken returned, the old one was stale
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, data.accessToken);
    }

    setTopArtists(data.topArtists);
  }, [accessToken, refreshToken]);

  // User has logged in and has an access/refresh token
  React.useEffect(() => {
    if (!isAuthenticated || !accessToken || !refreshToken) {
      return;
    }

    fetchCurrentSong();
    fetchTopArtistData("long_term");
    const interval = setInterval(fetchCurrentSong, 1000);
    return () => clearInterval(interval);
  }, [accessToken, fetchCurrentSong, fetchTopArtistData, isAuthenticated, refreshToken]);

  const loginWithSpotify = React.useCallback(async () => {
    const res = await fetch("/api/spotify/redirectUri");
    const redirectUri = (await res.json()).redirectUri;

    window.location = redirectUri as (string | Location) & Location;
  }, []);

  const skipSong = async (forward: boolean) => {
    try {
      await fetch(`/api/spotify?forward=${forward}`, { method: "POST" });
      const res = await fetch(`/api/spotify?accessToken=${accessToken}`);
      const data = (await res.json()) as NowPlayingSpotifyData;
      setSpotifyData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const pausePlaySong = async (pause: boolean) => {
    try {
      setSpotifyData({
        ...spotifyData,
        playing: !pause,
      } as NowPlayingSpotifyData);
      await fetch(`/api/spotify?pause=${pause}`, { method: "POST" });
    } catch (err) {
      console.error(err);
      setSpotifyData({
        ...spotifyData,
        playing: pause,
      } as NowPlayingSpotifyData);
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
        fetchTopArtistData
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyContextProvider;
