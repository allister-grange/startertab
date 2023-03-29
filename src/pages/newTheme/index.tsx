import { ColorPicker } from "@/components/theme-creator/ColorPicker";
import { SettingTitle } from "@/components/theme-creator/SettingTitle";
import { SidebarThemePicker } from "@/components/theme-creator/SidebarThemePicker";
import { Footer } from "@/components/ui/Footer";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { newThemeGridLayout } from "@/helpers/gridLayout";
import { applyTheme } from "@/helpers/settingsHelpers";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtoms";
import { UserSettings } from "@/types";
import { Box, Flex, Grid, Heading, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

type FormInputs = {
  themeName: string;
  backgroundColor: string;
  backgroundColorOfTiles: string;
  textColorOfTiles: string;
  iconColor: string;
  sidebarIsDarkTheme: boolean;
};

export const ThemeCreator: React.FC = ({}) => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    themeName: "",
    backgroundColor: "#f3b4b4",
    backgroundColorOfTiles: "#5bbdff",
    sidebarIsDarkTheme: false,
    iconColor: "linear-gradient(90deg, #f3b4b4 50%, #5bbdff 50%)",
    textColorOfTiles: "#202020",
  });
  const [settings, setSettings] = useRecoilState(userSettingState);
  const setColorModeState = useSetRecoilState(colorModeState);

  React.useLayoutEffect(() => {
    document.body.style.background = "white";
  }, []);

  const onThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      themeName: e.target.value,
    });
  };

  const onBackgroundColorChange = (newColor: string) => {
    setFormInputs({
      ...formInputs,
      backgroundColor: newColor,
    });
  };

  const onTextColorOfTilesChange = (newColor: string) => {
    setFormInputs({
      ...formInputs,
      textColorOfTiles: newColor,
    });
  };

  const onBackgroundColorOfTilesChange = (newColor: string) => {
    setFormInputs({
      ...formInputs,
      backgroundColorOfTiles: newColor,
    });
  };

  const onDarkThemeChange = (isDarkTheme: boolean) => {
    setFormInputs({
      ...formInputs,
      sidebarIsDarkTheme: isDarkTheme,
    });
  };

  const onIconColorChange = (color: string) => {
    setFormInputs({
      ...formInputs,
      iconColor: color,
    });
  };

  const formValid =
    formInputs?.themeName &&
    formInputs?.backgroundColor &&
    formInputs?.backgroundColorOfTiles &&
    formInputs?.textColorOfTiles &&
    formInputs?.sidebarIsDarkTheme !== undefined;

  const submitThemeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }

    // we don't want duplicate them names
    if (
      settings.themes.some(
        (theme) =>
          theme.themeName.toLowerCase() === formInputs.themeName.toLowerCase()
      )
    ) {
      alert("Theme name already exists, try another");
      return;
    }

    // put a new theme into local storage
    const newSettings: UserSettings = { themes: [] };
    newSettings.themes = [
      ...settings.themes,
      {
        // push all the usual defaults onto the new theme, expect with the new settings
        ...settings.themes[0],
        themeName: formInputs.themeName,
        downloadedFromMarketplace: false,
        tileLayout: newThemeGridLayout,
        globalSettings: {
          ...settings.themes[0].globalSettings,
          backgroundColor: formInputs.backgroundColor,
          textColor: formInputs.sidebarIsDarkTheme ? "#eee" : "#33393D",
          sidebarBorderColor: formInputs.sidebarIsDarkTheme ? "#666" : "",
          subTextColor: formInputs.sidebarIsDarkTheme ? "#ddd" : "#333333",
          sidebarBackgroundColor: formInputs.sidebarIsDarkTheme
            ? "#222222"
            : "#fff",
          tileType: "None",
          themePickerBubbleColor: formInputs.iconColor,
        },
        tiles: [
          {
            tileId: 0,
            backgroundColor: formInputs.backgroundColorOfTiles,
            textColor: formInputs.textColorOfTiles,
            tileType: "None",
            tileSize: "medium",
          },
          {
            tileId: 1,
            backgroundColor: formInputs.backgroundColorOfTiles,
            textColor: formInputs.textColorOfTiles,
            tileType: "None",
            tileSize: "large",
          },
        ],
      },
    ];
    setSettings(newSettings);
    setColorModeState(formInputs.themeName);
    applyTheme(
      newSettings.themes.find(
        (theme) => theme.themeName === formInputs.themeName
      )!
    );
    window.location.href = "/";
  };

  return (
    <>
      <Box
        width={["100%", "90%", "70%", "60%", "60%"]}
        p="2"
        mx="auto"
        color="black"
      >
        <Flex>
          <span style={{ fontSize: "140px" }}>🎨</span>
          <Box my="auto" ml="8" width="55%">
            <Heading color="black">Theme Creator</Heading>
            <Text mt="2">
              Here is a simple tool that allows you to create your own themes.
              The settings you can change here are the &apos;global&apos;
              settings. You can edit the rest of the theme once on the main
              screen.
            </Text>
          </Box>
        </Flex>
        <form onSubmit={submitThemeForm}>
          <Box mb="12" mt="4" width="500px">
            <SettingTitle displayNumber={1} title="THEME NAME" />
            <Input
              mt="6"
              ml="4"
              _focus={{
                borderBottom: "1px solid coral",
                outline: "none",
              }}
              _focusVisible={{
                borderBottom: "1px solid coral",
                outline: "none",
              }}
              _hover={{
                borderBottom: "1px solid coral",
              }}
              _placeholder={{
                marginLeft: 0,
                paddingLeft: 0,
                fontSize: "30px",
                paddingBottom: 0,
                color: "gray.300",
              }}
              fontSize="30px"
              placeholder="Sunset Theme"
              border="0"
              borderBottom="1px solid coral"
              borderRadius="0"
              size="lg"
              maxW="300px"
              onChange={onThemeNameChange}
              value={formInputs.themeName}
            />
          </Box>
          <Grid
            templateColumns="repeat(auto-fit, minmax(280px, 1fr))"
            gridGap="20px"
            alignContent="center"
            maxWidth="1100px"
          >
            <Box>
              <SettingTitle displayNumber={2} title="BACKGROUND COLOR" />
              <ColorPicker
                value={formInputs.backgroundColor}
                onChange={onBackgroundColorChange}
              />
            </Box>
            <Box>
              <SettingTitle displayNumber={3} title="TILE BACKGROUND COLOR" />
              <ColorPicker
                value={formInputs.backgroundColorOfTiles}
                onChange={onBackgroundColorOfTilesChange}
              />
            </Box>
            <Box>
              <SettingTitle displayNumber={4} title="TILE TEXT COLOR" />
              <ColorPicker
                value={formInputs.textColorOfTiles}
                onChange={onTextColorOfTilesChange}
              />
            </Box>
            <Box>
              <SettingTitle displayNumber={5} title="SIDEBAR THEME" />
              <Flex mt="6">
                <SidebarThemePicker
                  mr="2"
                  isSelected={formInputs.sidebarIsDarkTheme}
                  onClick={() => onDarkThemeChange(true)}
                >
                  <Image
                    src="/darkSidebar.jpg"
                    alt="dark sidebar option"
                    layout="fill"
                    objectFit="contain"
                  />
                </SidebarThemePicker>
                <SidebarThemePicker
                  ml="2"
                  isSelected={!formInputs.sidebarIsDarkTheme}
                  onClick={() => onDarkThemeChange(false)}
                >
                  <Image
                    src="/lightSidebar.jpg"
                    alt="light sidebar option"
                    layout="fill"
                    objectFit="contain"
                  />
                </SidebarThemePicker>
              </Flex>
            </Box>
            <Box>
              <SettingTitle displayNumber={6} title="THEME ICON COLOR" />
              <ColorPicker
                value={formInputs.iconColor}
                onChange={onIconColorChange}
              />
            </Box>
          </Grid>
          <Flex mt="10" mb="10">
            <OutlinedButton
              fontWeight="600"
              mt="2"
              borderColor="coral"
              isDisabled={!formValid}
              type="submit"
            >
              Create Theme
            </OutlinedButton>
          </Flex>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default ThemeCreator;
