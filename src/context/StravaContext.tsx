import { getEmptyStravaData } from "@/pages/api/strava";
import { StravaContextInterface, StravaGraphData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

export const StravaContext = React.createContext<StravaContextInterface | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  const res = await fetch(`/api/strava`);
  let data = (await res.json()) as StravaGraphData;
  return data;
};

const StravaContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  let { data: stravaData } = useQuery(["stravaData"], fetcher, {
    enabled: isAuthenticated,
  });

  React.useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await fetch("/api/strava/me");
        const { loggedIn } = await res.json();
        setIsAuthenticated(loggedIn);
      } catch (err) {
        throw new Error(err as string);
      }
    };

    checkIfLoggedIn();
  }, []);

  const loginWithStrava = React.useCallback(async () => {
    try {
      const res = await fetch("/api/strava/redirectUri");
      const redirectUri = (await res.json()).redirectUri;
      window.location = redirectUri as (string | Location) & Location;
    } catch (err) {
      throw new Error(err as string);
    }
  }, []);

  stravaData = stravaData ?? getEmptyStravaData();

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
