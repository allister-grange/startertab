import { useLocalStorage } from "@/helpers/useLocalStorage";
import { UserSettingsContextInterface } from "@/types";
import * as React from "react";

export const SettingsContext =
  React.createContext<UserSettingsContextInterface | null>(null);

const UserSettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("userSettings");
  const [inMemorySettings, setInMemorySettings] = React.useState(() => settings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, inMemorySettings, setInMemorySettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default UserSettingsProvider;
