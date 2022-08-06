import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ThemeSettings, UserSettingsContextInterface } from "@/types";
import { useColorMode } from "@chakra-ui/react";
import { clone } from "lodash";
import * as React from "react";

export const SettingsContext =
  React.createContext<UserSettingsContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const UserSettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("userSettings");
  const { colorMode } = useColorMode();
  const theme = getCurrentTheme(settings, colorMode);

  const changeThemeInSettings = (newTheme: ThemeSettings) => {
    const newSettings = clone(settings);
    newSettings.themes.map((theme) => {
      if (theme.themeName === newTheme.themeName) {
        return newTheme;
      } else return theme;
    });
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{ settings, setSettings, theme, changeThemeInSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default UserSettingsProvider;
