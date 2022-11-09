import { userSettingState } from "@/recoil/UserSettingsAtom";
import { ColorPicker } from "@/components/theme-creator/ColorPicker";
import { SettingTitle } from "@/components/theme-creator/SettingTitle";
import { SidebarThemePicker } from "@/components/theme-creator/SidebarThemePicker";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { UserSettings } from "@/types";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

type FormInputs = {
  themeName: string;
  backgroundColor: string;
  backgroundColorOfTiles: string;
  textColorOfTiles: string;
  iconColor: string;
  sidebarIsDarkTheme: boolean;
};

export const ThemeCreator: React.FC = ({}) => {
  const { setColorMode } = useColorMode();
  const [formInputs, setFormInputs] = useState<FormInputs>({
    themeName: "",
    backgroundColor: "#f3b4b4",
    backgroundColorOfTiles: "#5bbdff",
    sidebarIsDarkTheme: false,
    iconColor: "linear-gradient(90deg, #f3b4b4 50%, #5bbdff 50%)",
    textColorOfTiles: "#202020",
  });
  const [settings, setSettings] = useRecoilState(userSettingState);

  React.useLayoutEffect(() => {
    document.body.style.background = "#F6F9F9";
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

    // put a new theme into local storage
    const currentSettings = JSON.parse(
      JSON.stringify(settings)
    ) as UserSettings;

    if (
      currentSettings.themes.some(
        (theme) =>
          theme.themeName.toLowerCase() === formInputs.themeName.toLowerCase()
      )
    ) {
      alert("Theme name already exists, try another");
      return;
    }

    currentSettings.themes.push({
      // push all the usual defaults onto the new theme, expect with the new settings
      ...currentSettings.themes[0],
      themeName: formInputs.themeName,
      globalSettings: {
        ...currentSettings.themes[0].globalSettings,
        backgroundColor: formInputs.backgroundColor,
        textColor: formInputs.sidebarIsDarkTheme ? "#eee" : "#33393D",
        sidebarBackgroundColor: formInputs.sidebarIsDarkTheme
          ? "#222222"
          : "#fff",
        tileType: "None",
        themePickerBubbleColor: formInputs.iconColor,
      },
      tile1: {
        ...currentSettings.themes[0].tile1,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile2: {
        ...currentSettings.themes[0].tile2,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile3: {
        ...currentSettings.themes[0].tile3,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile4: {
        ...currentSettings.themes[0].tile4,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile5: {
        ...currentSettings.themes[0].tile5,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile6: {
        ...currentSettings.themes[0].tile6,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile7: {
        ...currentSettings.themes[0].tile7,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile8: {
        ...currentSettings.themes[0].tile8,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile9: {
        ...currentSettings.themes[0].tile9,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile10: {
        ...currentSettings.themes[0].tile10,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
      tile11: {
        ...currentSettings.themes[0].tile11,
        backgroundColor: formInputs.backgroundColorOfTiles,
        textColor: formInputs.textColorOfTiles,
      },
    });
    setSettings(currentSettings);
    setColorMode(formInputs.themeName);
    Router.push("/");
  };

  return (
    <Box height="100%" width="65%" p="2" mx="auto" color="black">
      <Flex>
        <span style={{ fontSize: "140px" }}>🎨</span>
        <Box my="auto" ml="8" width="55%">
          <Heading color="black">Theme Creator</Heading>
          <Text mt="2">
            Here is a simple tool that allows you to create your own themes. The
            settings you can change here are the &apos;global&apos; settings.
            You can edit the rest of the theme once on the main screen.
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
              borderBottom: "1px solid var(--chakra-colors-purple-500)",
            }}
            _hover={{
              borderBottom: "1px solid var(--chakra-colors-purple-500)",
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
            borderBottom="1px solid var(--chakra-colors-purple-500)"
            borderRadius="0"
            size="lg"
            maxW="300px"
            onChange={onThemeNameChange}
            value={formInputs.themeName}
          />
        </Box>
        <Grid
          templateColumns="repeat(auto-fit, minmax(380px, 1fr))"
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
            <Flex mt="10">
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
        <Flex mt="10" mb="10" alignItems="center" width="100%" height="100%">
          <OutlinedButton
            fontWeight="800"
            mt="2"
            borderColor="var(--chakra-colors-purple-500)"
            isDisabled={!formValid}
            type="submit"
          >
            CREATE IT
          </OutlinedButton>
        </Flex>
      </form>
    </Box>
  );
};

export default ThemeCreator;
