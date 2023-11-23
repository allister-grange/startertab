import { optionsStyles } from "@/helpers/selectOptionStyles";
import {
  colorModeState,
  usingSystemThemeState,
} from "@/recoil/UserSettingsAtoms";
import {
  Box,
  BoxProps,
  Checkbox,
  Flex,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
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
      <Flex>
        <Text fontSize="xs" color={textColor}>
          Use system theme to toggle light/dark modes?
        </Text>
        <Checkbox
          size="sm"
          ml="1"
          isChecked={systemThemeSettings.usingSystemTheme}
          onChange={handleToggle}
        />
      </Flex>
      <Box display="flex" flexDir="column" mt="1">
        {systemThemeSettings.usingSystemTheme && (
          <Box mt="4">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="md">Light Theme:</Text>
              <Select
                value={systemThemeSettings.lightTheme}
                width="60%"
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
            </Flex>
            <Flex mt="4" justifyContent="space-between" alignItems="center">
              <Text fontSize="md">Dark theme:</Text>
              <Select
                value={systemThemeSettings.darkTheme}
                width="60%"
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
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};
