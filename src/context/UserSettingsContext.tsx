import { useLocalStorage } from "@/helpers/useLocalStorage";
import { UserSettingsContextInterface } from "@/types";
import * as React from "react";

export const SettingsContext =
  React.createContext<UserSettingsContextInterface | null>(null);

const UserSettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("userSettings");

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default UserSettingsProvider;
