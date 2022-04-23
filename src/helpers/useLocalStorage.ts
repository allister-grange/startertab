import React, { Dispatch, SetStateAction } from "react";
import { UserSettings } from "@/types/settings";

export function useLocalStorage(
  key: string,
  initialValue: UserSettings
): [UserSettings, (value: UserSettings) => void] {
  const [storedValue, setStoredValue] = React.useState<UserSettings>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      if (item) {
        console.log("Found " + key + " in local storage " + item);

        return JSON.parse(item) as UserSettings;
      }

      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
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
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
