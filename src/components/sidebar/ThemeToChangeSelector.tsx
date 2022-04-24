import React from "react";
import { Box, Flex, Switch, Text, useColorMode } from "@chakra-ui/react";

interface ThemeToChangeSelectorProps {}

export const ThemeToChangeSelector: React.FC<
  ThemeToChangeSelectorProps
> = ({}) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Flex alignItems="center" justifyContent="space-between" pt="3" pb="4">
      <Text>Theme to change?</Text>
      <span>
        light{" "}
        {
          <Switch
            onChange={() =>
              setColorMode(colorMode === "light" ? "dark" : "light")
            }
            colorScheme="whiteAlpha"
          />
        }{" "}
        dark
      </span>
    </Flex>
  );
};
