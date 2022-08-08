import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  ThemeSettings,
  TileId,
  TileSettings,
  UserSettingsContextInterface,
} from "@/types";
import { useColorMode } from "@chakra-ui/react";
import { clone } from "lodash";
import cloneDeep from "lodash.clonedeep";
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

  const changeSetting = React.useCallback(
    (key: string, value: string, tileId: TileId) => {
      let newSettings = cloneDeep(settings);
      const themeToChange = getCurrentTheme(newSettings, colorMode);
      themeToChange[tileId][key as keyof TileSettings] = value as any;
      setSettings(newSettings);
    },
    [colorMode, setSettings, settings]
  );

  return (
    <SettingsContext.Provider
      value={{ settings, setSettings, theme, changeSetting }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default UserSettingsProvider;
