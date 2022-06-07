import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserSettingsContextInterface } from "@/types";
import * as React from "react";

export const SettingsContext =
  React.createContext<UserSettingsContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const UserSettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("userSettings");
  const [inMemorySettings, setInMemorySettings] = React.useState(
    () => settings
  );

  return (
    <SettingsContext.Provider
      value={{ settings, setSettings, inMemorySettings, setInMemorySettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default UserSettingsProvider;
