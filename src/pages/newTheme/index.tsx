import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { UserSettingsContextInterface } from "@/types";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { clone } from "lodash";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ThemeCreatorProps {}

type FormInputs = {
  themeName: string;
  backgroundColor: string;
  textColor: string;
  sidebarIsDarkTheme: boolean;
};

export const ThemeCreator: React.FC<ThemeCreatorProps> = ({}) => {
  const { colorMode, setColorMode } = useColorMode();
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const [formInputs, setFormInputs] = useState<FormInputs>({
    themeName: "",
    textColor: "#000000",
    backgroundColor: "#ffffff",
    sidebarIsDarkTheme: false,
  });

  const theme = getCurrentTheme(settings, colorMode);

  React.useLayoutEffect(() => {
    document.body.style.background = theme.globalSettings.backgroundColor;
    document.body.style.color = theme.globalSettings.textColor;
  }, [theme.globalSettings.backgroundColor, theme.globalSettings.textColor]);

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

  const onTextColorChange = (newColor: string) => {
    setFormInputs({
      ...formInputs,
      textColor: newColor,
    });
  };

  const onDarkThemeChange = () => {
    setFormInputs({
      ...formInputs,
      sidebarIsDarkTheme: !formInputs.sidebarIsDarkTheme,
    });
  };

  const formValid =
    formInputs?.themeName &&
    formInputs?.backgroundColor &&
    formInputs?.textColor &&
    formInputs?.sidebarIsDarkTheme !== undefined;

  console.log(formInputs);
  const submitThemeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }

    // put a new theme into local storage
    const currentSettings = clone(settings);
    currentSettings.themes.push({
      // push all the usual defaults onto the new theme, expect with the new settings
      ...currentSettings.themes[0],
      themeName: formInputs.themeName,
      globalSettings: {
        ...currentSettings.themes[0].globalSettings,
        backgroundColor: formInputs.backgroundColor,
        textColor: formInputs.textColor,
        colorPrimary: formInputs.sidebarIsDarkTheme ? "#33393D" : "#eee",
        colorSecondary: formInputs.sidebarIsDarkTheme ? "#666" : "#222",
        tileType: "None",
      },
    });
    setSettings(currentSettings);
    // set the theme to that new theme
    setColorMode(formInputs.themeName);
    // redirect you back to the main page
    Router.push("/");
  };

  return (
    <Box height="100%" width="100%" p="6">
      <form onSubmit={submitThemeForm}>
        <Stack width="max-content" mt="8" spacing="4" ml="20%">
          <Heading>So you want a new theme?</Heading>
          <Box>
            <Text>Theme name</Text>
            <Input
              width="20rem"
              onChange={onThemeNameChange}
              value={formInputs.themeName}
            />
          </Box>
          <Box>
            <Text>Background Color</Text>
            <Input
              value={formInputs.backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              width="110px"
            />
            <HexColorPicker
              color={formInputs.backgroundColor}
              onChange={onBackgroundColorChange}
              style={{
                width: "20rem",
                height: "120px",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            />
          </Box>
          <Box>
            <Text>Text Color</Text>
            <Input
              value={formInputs.textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              width="110px"
            />
            <HexColorPicker
              color={formInputs.textColor}
              onChange={onTextColorChange}
              style={{
                width: "20rem",
                height: "120px",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            />
          </Box>
          <Box>
            <Text>Sidebar theme</Text>
            <Box display="flex" alignItems="center">
              <span style={{ marginRight: "10px" }}>Light</span>
              <Switch
                // color={inputValue}
                onChange={onDarkThemeChange}
                isChecked={formInputs.sidebarIsDarkTheme}
                size="md"
              ></Switch>
              <span style={{ marginLeft: "10px" }}>Dark</span>
            </Box>
          </Box>
          <Button width="10rem" type="submit" disabled={!formValid}>
            Create it!
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ThemeCreator;
