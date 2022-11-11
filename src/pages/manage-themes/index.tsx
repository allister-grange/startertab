import { ThemePreview } from "@/components/theme-creator/ThemePreview";
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
 * -> I want to be able to click a button show my theme publicly
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
      // TOD
      if (err === "Can't have matching theme names chump") {
        alert("You can't have matching theme names");
      } else {
        alert("That theme is malformed, please recheck it");
      }
    }
  };

  return (
    <Box
      width={["100%", "90%", "80%", "70%", "70%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1000px"
    >
      <OutlinedButton>Browse Themes</OutlinedButton>
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
      )}
      <Grid
        templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
        gap="4"
        mt="8"
        justifyItems="center"
      >
        {settings.themes.map((theme) => (
          <Box
            key={theme.themeName}
            bg="white"
            p="4"
            borderRadius="md"
            shadow="md"
            transition="all .2s"
          >
            <Box
              height="250px"
              width="420px"
              pos="relative"
              overflow="hidden"
              borderRadius="lg"
              boxShadow="md"
            >
              <ThemePreview theme={theme} />
            </Box>
            <Flex justifyContent="space-between">
              <Flex flexDir="column" justifyContent="center">
                <Text fontSize="2xl" fontWeight="bold">
                  {theme.themeName}
                </Text>
                <Text color="gray.700" fontSize="sm" mt="2">
                  Background:{" "}
                  <Badge
                    bg={theme.globalSettings.backgroundColor}
                    color={theme.globalSettings.textColor}
                    _hover={{ cursor: "pointer" }}
                    onClick={() =>
                      copyToClipboard(
                        theme.globalSettings.backgroundColor,
                        theme.globalSettings.backgroundColor
                      )
                    }
                  >
                    {truncateString(theme.globalSettings.backgroundColor, 16)}
                  </Badge>
                </Text>
                <Text color="gray.700" fontSize="sm">
                  Text color:{" "}
                  <Badge
                    filter={theme.globalSettings.textColor}
                    _hover={{ cursor: "pointer" }}
                    onClick={() =>
                      copyToClipboard(
                        theme.globalSettings.textColor,
                        theme.globalSettings.textColor
                      )
                    }
                  >
                    {theme.globalSettings.textColor}
                  </Badge>
                </Text>
              </Flex>

              <Flex
                alignItems="center"
                color="gray.700"
                flexDir={"column"}
                gap="2"
                mt="4"
              >
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
                    Share with marketplace
                  </Text>
                  <ExternalLinkIcon />
                </OutlinedButton>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageThemes;
