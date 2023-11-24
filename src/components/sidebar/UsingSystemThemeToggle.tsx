import { optionsStyles } from "@/helpers/selectOptionStyles";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtoms";
import { Box, BoxProps, Checkbox, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
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
  const [settings, setSettings] = useRecoilState(userSettingState);
  const [, setColorMode] = useRecoilState(colorModeState);
  const prefersDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // an error happens when you toggle on the theme changes
  const handleToggle = () => {
    if (prefersDarkTheme) {
      setColorMode(settings.systemThemeSettings.darkTheme);
    } else {
      setColorMode(settings.systemThemeSettings.lightTheme);
    }
    setSettings({
      ...settings,
      systemThemeSettings: {
        ...settings.systemThemeSettings,
        usingSystemTheme: !settings.systemThemeSettings.usingSystemTheme,
      },
    });
  };

  const onThemeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    isDark: boolean
  ) => {
    if (isDark) {
      if (prefersDarkTheme) {
        setColorMode(e.target.value);
      }
      setSettings({
        ...settings,
        systemThemeSettings: {
          ...settings.systemThemeSettings,
          darkTheme: e.target.value,
        },
      });
    } else {
      if (!prefersDarkTheme) {
        setColorMode(e.target.value);
      }
      setSettings({
        ...settings,
        systemThemeSettings: {
          ...settings.systemThemeSettings,
          lightTheme: e.target.value,
        },
      });
    }
  };

  return (
    <Box my="2" color={textColor}>
      <Flex>
        <Text fontSize="xs" color={textColor}>
          Use system theme to toggle light/dark modes?
        </Text>
        <Checkbox
          size="sm"
          ml="1"
          isChecked={settings.systemThemeSettings.usingSystemTheme}
          onChange={handleToggle}
          borderColor={textColor}
        />
      </Flex>
      <Box display="flex" flexDir="column" mt="1">
        {settings.systemThemeSettings.usingSystemTheme && (
          <Box mt="4">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="md">Light Theme:</Text>
              <Select
                value={settings.systemThemeSettings.lightTheme}
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
                value={settings.systemThemeSettings.darkTheme}
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
