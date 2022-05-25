import React from "react";
import {
  Box,
  Flex,
  Select,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";

interface ThemeToChangeSelectorProps {
  themes: string[];
  textColor: string;
}

export const ThemeToChangeSelector: React.FC<ThemeToChangeSelectorProps> = ({
  themes,
  textColor,
}) => {
  const { colorMode, setColorMode } = useColorMode();

  const setLocalStorageTheme = (colorMode: string) => {
    localStorage.setItem("colorMode", colorMode);
  };

  const onThemeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorMode(e.target.value);
    switch (e.target.value) {
      case "black":
      case "dark":
        setLocalStorageTheme("dark");
        break;
      case "white":
      case "light":
        setLocalStorageTheme("light");
        break;
      default:
        setLocalStorageTheme("dark");
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt="3"
      pb="4"
      color={textColor}
    >
      <Text>Theme?</Text>
      <Select
        value={colorMode}
        width="65%"
        onChange={onThemeSelectChange}
        outline={`1px solid ${textColor}`}
        _focus={{ border: `1px solid ${textColor}` }}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
