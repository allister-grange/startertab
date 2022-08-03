import { SettingsContext } from "@/context/UserSettingsContext";
import { UserSettingsContextInterface } from "@/types";
import { Box, BoxProps, Flex, Grid, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";

const ThemePickerBubble = (props: BoxProps) => {
  return (
    <Box
      borderRadius="50%"
      width="5"
      height="5"
      boxShadow={"2px 2px 1px rgba(0,0,0,.15)"}
      transition="all .2s"
      _hover={{ cursor: "pointer", transform: "translateY(-2px)" }}
      {...props}
    />
  );
};

const ThemePickerTile: React.FC = () => {
  const { setColorMode } = useColorMode();
  const { settings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;

  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Grid
        templateColumns="repeat(auto-fit, minmax(25px, 1fr))"
        gridGap="7px"
        gridRowGap="13px"
        alignContent="center"
        width="100%"
        py="25px"
        px="55px"
      >
        {settings.themes.map((theme) => {
          if (theme.themeName !== "Global Settings") {
            return (
              <ThemePickerBubble
                key={theme.themeName}
                justifySelf="center"
                onClick={() => setColorMode(theme.themeName)}
                bg={theme.globalSettings.themePickerBubbleColor}
              />
            );
          }
        })}
      </Grid>
    </Flex>
  );
};

export default ThemePickerTile;
