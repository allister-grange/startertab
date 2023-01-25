import { OutlookContextInterface, OutlookMeetingEvent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

export const OutlookContext =
  React.createContext<OutlookContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  const res = await fetch(`/api/outlook`);
  if (res.status !== 200) {
    throw new Error("Failed to get Outlook meeitngs");
  }
  let data = (await res.json()) as OutlookMeetingEvent[];
  return data;
};

const OutlookContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  let {
    data: outlookData,
    isLoading,
    error,
  } = useQuery(["outlookData"], fetcher, {
    enabled: isAuthenticated,
  });

  React.useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await fetch("/api/outlook/me");
        const { loggedIn } = await res.json();
        setIsAuthenticated(loggedIn);
      } catch (err) {
        throw new Error(err as string);
      }
    };

    checkIfLoggedIn();
  }, []);

  const loginWithOutlook = React.useCallback(async () => {
    try {
      const res = await fetch("/api/outlook/redirectUri");
      const redirectUri = (await res.json()).redirectUri;
      window.location = redirectUri as (string | Location) & Location;
    } catch (err) {
      throw new Error(err as string);
    }
  }, []);

  outlookData = outlookData ?? [];

  return (
    <OutlookContext.Provider
      value={{
        isAuthenticated,
        outlookData: outlookData,
        loginWithOutlook,
        isLoading,
        error,
      }}
    >
      {children}
    </OutlookContext.Provider>
  );
};

export default OutlookContextProvider;
