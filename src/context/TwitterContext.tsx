import { getEmptyStravaData } from "@/pages/api/strava";
import {
  StravaContextInterface,
  StravaGraphData,
  Tweet,
  TwitterContextInterface,
  TwitterFeedResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

export const TwitterContext =
  React.createContext<TwitterContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  const res = await fetch(`/api/twitter`);
  let data = (await res.json()) as Tweet[];
  return data;
};

const TwitterContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  let { data: twitterData } = useQuery(["twitterData"], fetcher, {
    enabled: isAuthenticated,
  });

  React.useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await fetch("/api/twitter/me");
        const { loggedIn } = await res.json();
        setIsAuthenticated(loggedIn);
      } catch (err) {
        throw new Error(err as string);
      }
    };

    checkIfLoggedIn();
  }, []);

  const loginWithTwitter = React.useCallback(async () => {
    try {
      const res = await fetch("/api/twitter/redirectUri");
      const redirectUri = (await res.json()).redirectUri;
      console.log("redirectUri", redirectUri);

      window.location = redirectUri as (string | Location) & Location;
    } catch (err) {
      throw new Error(err as string);
    }
  }, []);

  console.log(twitterData);

  twitterData = twitterData ?? [];

  return (
    <TwitterContext.Provider
      value={{
        isAuthenticated,
        twitterData: twitterData,
        loginWithTwitter,
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

export default TwitterContextProvider;
