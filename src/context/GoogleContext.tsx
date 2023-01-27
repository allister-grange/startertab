import { GoogleContextInterface, GoogleMeetingEvent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

export const GoogleContext = React.createContext<GoogleContextInterface | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  const res = await fetch(`/api/google/meetings`);
  if (res.status !== 200) {
    throw new Error("Failed to get Google meetings");
  }
  let data = (await res.json()) as GoogleMeetingEvent[];
  return data;
};

const GoogleContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  let {
    data: googleData,
    isLoading,
    error,
  } = useQuery(["googleData"], fetcher, {
    enabled: isAuthenticated,
  });

  React.useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await fetch("/api/google/auth/me");

        const { loggedIn } = await res.json();
        setIsAuthenticated(loggedIn);
      } catch (err) {
        throw new Error(err as string);
      }
    };

    checkIfLoggedIn();
  }, []);

  const loginWithGoogle = React.useCallback(async () => {
    try {
      const res = await fetch("/api/google/auth/redirectUri");
      const redirectUri = (await res.json()).redirectUri;
      window.location = redirectUri as (string | Location) & Location;
    } catch (err) {
      throw new Error(err as string);
    }
  }, []);

  googleData = googleData ?? [];

  return (
    <GoogleContext.Provider
      value={{
        isAuthenticated,
        googleData: googleData,
        loginWithGoogle,
        isLoading,
        error,
      }}
    >
      {children}
    </GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
