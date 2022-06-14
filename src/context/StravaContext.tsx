import { StravaContextInterface, StravaGraphData } from "@/types";
import * as React from "react";
import { useState } from "react";

const STRAVA_ACCESS_TOKEN = "stravaAccessToken";
const STRAVA_REFRESH_TOKEN = "stravaRefreshToken";

export const StravaContext =
  React.createContext<StravaContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const StravaContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [stravaData, setStravaData] = useState<StravaGraphData | undefined>();

  // only needs to run when the user has clicked 'continue with strava'
  // used for grabbing the access and refresh token and storing them in
  // local storage
  React.useEffect(() => {
    // user is logged in, no need to process
    if (isAuthenticated) {
      return;
    }

    // check if the user has already logged in before, but not in this session
    const accessTokenFromStorage = localStorage.getItem(STRAVA_ACCESS_TOKEN);
    const refreshTokenFromStorage = localStorage.getItem(STRAVA_REFRESH_TOKEN);
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

    localStorage.setItem(STRAVA_ACCESS_TOKEN, accessToken);
    localStorage.setItem(STRAVA_REFRESH_TOKEN, refreshToken);

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

    const fetchStravaData = async () => {
      const res = await fetch(
        `/api/strava?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
      let data = (await res.json()) as StravaGraphData;

      // if there is an accessToken returned, the old one was stale
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        localStorage.setItem(STRAVA_ACCESS_TOKEN, data.accessToken);
      }

      setStravaData(data);
    };

    fetchStravaData();
  }, [accessToken, isAuthenticated, refreshToken]);

  const loginWithStrava = React.useCallback(async () => {    
    try {
      const res = await fetch("/api/strava/redirectUri");
      const redirectUri = (await res.json()).redirectUri;
      window.location = redirectUri as (string | Location) & Location;
    }
    catch(err) {
      console.error(err as string);
    }
  }, []);

  return (
    <StravaContext.Provider
      value={{
        isAuthenticated,
        stravaData,
        loginWithStrava,
      }} 
    >
      {children}
    </StravaContext.Provider>
  );
};

export default StravaContextProvider;
