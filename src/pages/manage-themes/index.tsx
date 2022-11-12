import { ThemePreview } from "@/components/theme-creator/ThemePreview";
import { PersonalThemeCard } from "@/components/themes/PersonalThemeCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { deepClone, truncateString } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { ThemeSettings } from "@/types";
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

/**
 * Need to design this as if it were a modal!!
 *
 * Two tabs
 *
 * My Themes
 *
 * -> I want to be able to copy my theme to my clipboard
 * -> I want to be able to click a button share my theme publicly
 * -> I want to be able to choose if it's anon or not
 * -> I want to be able to delete some of my themes
 *
 * Browse Themes
 *
 * -> I want to be able to use someone elses theme
 * -> I want to be able to vote on other people's themes
 * -> I want to see the download number next to themes
 *
 */

const ManageThemes: React.FC = ({}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingAddTheme, setShowingAddTheme] = useState(false);
  const [textAreaValue, setTextAreValue] = useState("");

  const toast = useToast();

  useEffect(() => {
    // todo ask Dom if a white backgound is nicer
    document.body.style.background = "#F7F8FA";
  }, []);

  const showClipboardToast = useCallback(
    (val?: string) => {
      toast({
        title: `Got it! ${val ?? ""}`,
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    },
    [toast]
  );

  const copyToClipboard = (value: string, message?: string) => {
    navigator.clipboard.writeText(value);
    showClipboardToast(message);
  };

  const deleteTheme = (theme: ThemeSettings) => {
    const clonedSettings = deepClone(settings);
    const index = clonedSettings.themes.findIndex(
      (themeToFind) => themeToFind.themeName === theme.themeName
    );

    if (index > -1) {
      clonedSettings.themes.splice(index, 1);
    }

    setSettings(clonedSettings);
  };

  const submitNewTheme = (e: FormEvent) => {
    e.preventDefault();
    try {
      const newTheme = JSON.parse(textAreaValue) as ThemeSettings;
      const newSettings = deepClone(settings);
      settings.themes.forEach((theme) => {
        if (theme.themeName === newTheme.themeName) {
          throw new Error("Can't have matching theme names chump");
        }
      });
      newSettings.themes.unshift(newTheme);
      setSettings(newSettings);
      // showSuccessfulToast();
      setShowingAddTheme(false);
    } catch (err) {
      if (err === "Can't have matching theme names chump") {
        alert("You can't have matching theme names");
      } else {
        alert("That theme is malformed, please recheck it");
      }
    }
  };

  return (
    <Box
      width={["100%", "90%", "80%", "80%", "70%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1500px"
    >
      {/* <OutlinedButton>Browse Themes</OutlinedButton>
      <OutlinedButton onClick={() => setShowingAddTheme(true)}>
        Add theme by clipboard
      </OutlinedButton>
      {showingAddTheme && (
        <form onSubmit={submitNewTheme}>
          <Textarea
            value={textAreaValue}
            onChange={(e) => setTextAreValue(e.target.value)}
          />
          <OutlinedButton type="submit">Add in new theme</OutlinedButton>
        </form>
      )} */}
      <Heading>Your themes</Heading>
      <Grid
        templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
        gap="4"
        mt="8"
        justifyItems="center"
      >
        {settings.themes.map((theme) => (
          <PersonalThemeCard
            key={theme.themeName}
            theme={theme}
            buttons={
              <>
                <OutlinedButton
                  border={`1px solid black`}
                  onClick={() =>
                    copyToClipboard(JSON.stringify(theme), undefined)
                  }
                >
                  <Text fontSize="xs" mr="2">
                    Copy theme
                  </Text>
                  <CopyIcon />
                </OutlinedButton>
                <OutlinedButton
                  border={`1px solid red`}
                  onClick={() => deleteTheme(theme)}
                >
                  <Text fontSize="xs" mr="2">
                    Delete theme
                  </Text>
                  <DeleteIcon />
                </OutlinedButton>
                <OutlinedButton
                  border={`1px solid black`}
                  onClick={() => console.log("share")}
                >
                  <Text fontSize="xs" mr="2">
                    Share to Themes
                  </Text>
                  <ExternalLinkIcon />
                </OutlinedButton>
              </>
            }
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ManageThemes;
