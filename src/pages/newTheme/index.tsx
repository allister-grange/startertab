import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { UserSettingsContextInterface } from "@/types";
import {
  Box,
  Button,
  Flex,
  Grid,
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

interface ColorPickerProps {
  value: string;
  onChange: (newColor: string) => void;
  title: string;
}

type FormInputs = {
  themeName: string;
  backgroundColor: string;
  backgroundColorOfTiles: string;
  textColorOfTiles: string;
  sidebarIsDarkTheme: boolean;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  title,
}) => {
  return (
    <Stack
      shadow="md"
      background="white"
      p="6"
      borderRadius="10px"
      width="90%"
      spacing="2"
      maxW="400px"
    >
      <Text>{title}</Text>
      <Flex>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          width="110px"
        />
        <Box
          width="40px"
          height="40px"
          ml="4"
          backgroundColor={value}
          borderRadius="5px"
        />
      </Flex>
      <HexColorPicker
        color={value}
        onChange={onChange}
        style={{
          width: "20rem",
          height: "120px",
          marginTop: "10px",
          marginBottom: "5px",
        }}
      />
    </Stack>
  );
};

export const ThemeCreator: React.FC = ({}) => {
  const { setColorMode } = useColorMode();
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const [formInputs, setFormInputs] = useState<FormInputs>({
    themeName: "",
    backgroundColor: "#ffffff",
    backgroundColorOfTiles: "#5bbdff",
    sidebarIsDarkTheme: false,
    textColorOfTiles: "#202020",
  });

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

  const onDarkThemeChange = () => {
    setFormInputs({
      ...formInputs,
      sidebarIsDarkTheme: !formInputs.sidebarIsDarkTheme,
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
    const currentSettings = clone(settings);
    currentSettings.themes.push({
      // push all the usual defaults onto the new theme, expect with the new settings
      ...currentSettings.themes[0],
      themeName: formInputs.themeName,
      globalSettings: {
        ...currentSettings.themes[0].globalSettings,
        backgroundColor: formInputs.backgroundColor,
        colorPrimary: formInputs.sidebarIsDarkTheme ? "#33393D" : "#eee",
        textColor: formInputs.sidebarIsDarkTheme ? "#fff" : "#222222",
        tileType: "None",
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
    // set the theme to that new theme
    setColorMode(formInputs.themeName);
    // redirect you back to the main page
    Router.push("/");
  };

  return (
    <Box height="100%" width="100%" p="6" color="#526371">
      <form onSubmit={submitThemeForm}>
        <Heading color="black" mt="4" mb="8">
          So you want a new theme?
        </Heading>
        <Box
          mb="8"
          backgroundColor="white"
          shadow="lg"
          p="6"
          borderRadius="10px"
          // width="max(30%, 300px)"
          width="400px"
        >
          <Text>Theme Name</Text>
          <Input onChange={onThemeNameChange} value={formInputs.themeName} />
        </Box>
        <Grid
          templateColumns={"repeat(auto-fit, minmax(400px, 1fr))"}
          gridGap="20px"
          alignContent={"center"}
        >
          <ColorPicker
            title="Background Color"
            value={formInputs.backgroundColor}
            onChange={onBackgroundColorChange}
          />
          <ColorPicker
            title="Background Color of the Tiles"
            value={formInputs.backgroundColorOfTiles}
            onChange={onBackgroundColorOfTilesChange}
          />
          <ColorPicker
            title="Text Color of Tiles"
            value={formInputs.textColorOfTiles}
            onChange={onTextColorOfTilesChange}
          />
        </Grid>
        <Box
          backgroundColor="white"
          shadow="lg"
          p="6"
          borderRadius="10px"
          textAlign="center"
          // width="max(30%, 300px)"
          mt="8"
          maxW="400px"
        >
          <Text>Sidebar theme</Text>
          <Box display="flex" alignItems="center" justifyContent="center">
            <span style={{ marginRight: "10px" }}>Light</span>
            <Switch
              onChange={onDarkThemeChange}
              isChecked={formInputs.sidebarIsDarkTheme}
              size="md"
            ></Switch>
            <span style={{ marginLeft: "10px" }}>Dark</span>
          </Box>
        </Box>
        <Box width="400px" textAlign="center">
          <Button
            width="150px"
            height="50px"
            type="submit"
            disabled={!formValid}
            mt="4"
            alignSelf="center"
            background="white"
            shadow="lg"
          >
            CREATE IT
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ThemeCreator;
