import { optionsStyles } from "@/helpers/selectOptionStyles";
import {
  colorModeState,
  usingSystemThemeState,
} from "@/recoil/UserSettingsAtoms";
import { Box, BoxProps, Select, Switch, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

interface UsingSystemThemeToggleProps extends BoxProps {
  textColor: string;
  subTextColor: string;
  themeNames: string[];
}

export const UsingSystemThemeToggle: React.FC<UsingSystemThemeToggleProps> = ({
  textColor,
  subTextColor,
  themeNames,
}) => {
  const [systemThemeSettings, setSystemThemeSettings] = useRecoilState(
    usingSystemThemeState
  );
  const [, setColorMode] = useRecoilState(colorModeState);

  const handleToggle = () => {
    setSystemThemeSettings({
      ...systemThemeSettings,
      usingSystemTheme: !systemThemeSettings.usingSystemTheme,
    });
  };

  const onThemeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    isDark: boolean
  ) => {
    if (isDark) {
      setSystemThemeSettings({
        ...systemThemeSettings,
        darkTheme: e.target.value,
      });
    } else {
      setSystemThemeSettings({
        ...systemThemeSettings,
        lightTheme: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (!systemThemeSettings.usingSystemTheme) {
      return;
    }

    const prefersDarkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDarkTheme) {
      setColorMode(systemThemeSettings.darkTheme);
    } else {
      setColorMode(systemThemeSettings.lightTheme);
    }
  }, [setColorMode, systemThemeSettings]);

  return (
    <Box my="2" color={textColor}>
      <Text fontSize="md" color={textColor}>
        Using System Dark Theme
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        If set, will use the system&apos;s dark theme preference to switch
        between themes
      </Text>
      <Box display="flex" flexDir="column" mt="1">
        <Switch
          mt="2"
          size="md"
          isChecked={systemThemeSettings.usingSystemTheme}
          onChange={handleToggle}
        />
        {systemThemeSettings.usingSystemTheme && (
          <Box>
            <Text>Light Theme:</Text>
            <Select
              value={systemThemeSettings.lightTheme}
              width="75%"
              onChange={(e) => onThemeSelectChange(e, false)}
              outline={`1px solid ${textColor}`}
              _focus={{ border: `1px solid ${textColor}` }}
            >
              {themeNames.map((theme) => (
                <option key={theme} value={theme} style={optionsStyles}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </Select>
            <Text>Dark theme:</Text>
            <Select
              value={systemThemeSettings.darkTheme}
              width="75%"
              onChange={(e) => onThemeSelectChange(e, true)}
              outline={`1px solid ${textColor}`}
              _focus={{ border: `1px solid ${textColor}` }}
            >
              {themeNames.map((theme) => (
                <option key={theme} value={theme} style={optionsStyles}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </Select>
          </Box>
        )}
      </Box>
    </Box>
  );
};
