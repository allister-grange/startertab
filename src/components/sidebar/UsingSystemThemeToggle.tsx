import { optionsStyles } from "@/helpers/selectOptionStyles";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import { themeNameSelector } from "@/recoil/UserSettingsSelectors";
import { Box, BoxProps, Checkbox, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

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
  const setThemeName = useSetRecoilState(themeNameSelector);

  const prefersDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const handleToggle = () => {
    setThemeName((prevTheme) => {
      if (prefersDarkTheme && settings.systemThemeSettings.darkTheme) {
        return settings.systemThemeSettings.darkTheme;
      } else if (!prefersDarkTheme && settings.systemThemeSettings.lightTheme) {
        return settings.systemThemeSettings.lightTheme;
      }
      return prevTheme;
    });

    setSettings((prevSettings) => ({
      ...prevSettings,
      systemThemeSettings: {
        ...prevSettings.systemThemeSettings,
        usingSystemTheme: !prevSettings.systemThemeSettings.usingSystemTheme,
      },
    }));
  };

  const onThemeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    isDark: boolean
  ) => {
    if (isDark && prefersDarkTheme) {
      setThemeName(e.target.value);
    } else if (!isDark && !prefersDarkTheme) {
      setThemeName(e.target.value);
    }

    setSettings((prevSettings) => ({
      ...prevSettings,
      systemThemeSettings: {
        ...prevSettings.systemThemeSettings,
        darkTheme: isDark
          ? e.target.value
          : prevSettings.systemThemeSettings.darkTheme,
        lightTheme: !isDark
          ? e.target.value
          : prevSettings.systemThemeSettings.lightTheme,
      },
    }));
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
                placeholder=" "
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
                placeholder=" "
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
