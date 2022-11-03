import React from "react";
import { UserSettings } from "@/types/settings";
import { defaultSettings } from "@/helpers/themes";

export function useLocalStorage(
  key: string
): [UserSettings, (value: UserSettings) => void] {
  const [storedValue, setStoredValue] = React.useState<UserSettings>(() => {
    if (typeof window === "undefined") {
      // this may ruin SSR in the future
      return defaultSettings;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item) as UserSettings;
      }

      return defaultSettings;
    } catch (error) {
      console.error("Could not read from local storage" + error);
      return defaultSettings;
    }
  });

  const setValue = (value: UserSettings) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
