import { Flex, Select, Text, useColorMode } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface ThemeToChangeSelectorProps {
  themes: string[];
  textColor: string;
  setTutorialProgress: Dispatch<SetStateAction<number>>;
}

export const ThemeToChangeSelector: React.FC<ThemeToChangeSelectorProps> = ({
  themes,
  textColor,
  setTutorialProgress,
}) => {
  const { colorMode, setColorMode } = useColorMode();

  const onThemeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // for the tutorial, if we change the theme we want to progress the tutorial
    setTutorialProgress((prevState) => (prevState === 2 ? 3 : prevState));
    setColorMode(e.target.value);
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
