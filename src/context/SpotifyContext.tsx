import { NowPlayingSpotifyData, SpotifyContextInterface } from "@/types";
import * as React from "react";
import { useState } from "react";

const SPOTIFY_CLIENT_ID = "261297b4032a4ce7b473de936d525c9d";
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

    if (!accessToken || !refreshToken) {
      return;
    }

    localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
    localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
    console.log("Setting tokens ", accessToken);
    console.log("Setting tokens ", refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    history.pushState(
      null,
      "New Page",
      window.location.toString().split("?")[0]
    );
  }, [isAuthenticated]);

  // User has logged in and has an access/refresh token
  React.useEffect(() => {
    if (!isAuthenticated || !accessToken || !refreshToken) {
      return;
    }

    const fetchCurrentSong = async () => {
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
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000);
    return () => clearInterval(interval);
  }, [accessToken, isAuthenticated, refreshToken]);

  const loginWithSpotify = React.useCallback(async () => {
    const res = await fetch("/api/spotify/redirectUrl");
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
      setSpotifyData({ ...spotifyData, playing: !pause });
      await fetch(`/api/spotify?pause=${pause}`, { method: "POST" });
    } catch (err) {
      console.error(err);
      setSpotifyData({ ...spotifyData, playing: pause });
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
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyContextProvider;
