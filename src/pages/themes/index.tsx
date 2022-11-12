import { PersonalThemes } from "@/components/themes/PersonalThemes";
import { PublicThemes } from "@/components/themes/PublicThemes";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemePageHeader } from "@/components/ui/ThemePageHeader";
import { deepClone } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { ThemeSettings } from "@/types";
import { CreateThemeRequest, ThemeWithVotes } from "@/types/marketplace";
import { Box, Flex, useToast } from "@chakra-ui/react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const ManageThemes: React.FC = ({}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingAddTheme, setShowingAddTheme] = useState(false);
  const [textAreaValue, setTextAreValue] = useState("");
  const [showingPublicThemes, setShowingPublicThemes] = useState(false);
  const [items, setItems] = useState<ThemeWithVotes[]>([]);

  const toast = useToast();

  useEffect(() => {
    document.body.style.background = "#F7F8FA";
  }, []);

  useEffect(() => {
    document.body.style.background = "#F7F8FA";
    async function grabItems() {
      const items = await fetch("/api/marketplace/item");
      const data = (await items.json()) as ThemeWithVotes[];

      setItems(data);
    }

    grabItems();
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const toSend: CreateThemeRequest = {
      name: "Midnight Rider 2.0",
      // data: JSON.parse(textAreaValue) as unknown as ThemeSettings,
      tags: ["productivity", "not", "fast"],
      author: "allig256",
      data: {} as ThemeSettings,
    };

    await fetch("/api/marketplace/item/create", {
      method: "POST",
      body: JSON.stringify(toSend),
    });
  }

  return (
    <Box
      width={["100%", "90%", "80%", "80%", "70%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1500px"
    >
      <ThemePageHeader showingPublicThemes={showingPublicThemes} />

      <Flex mt="4" gap="4">
        <OutlinedButton
          border={showingPublicThemes ? "1px solid black" : "2px solid gray"}
          background={showingPublicThemes ? undefined : "purple.200"}
          color={showingPublicThemes ? undefined : "white"}
          onClick={() => setShowingPublicThemes(false)}
        >
          {" "}
          My themes
        </OutlinedButton>
        <OutlinedButton
          border={showingPublicThemes ? "2px solid gray" : "1px solid black"}
          background={showingPublicThemes ? "purple.200" : undefined}
          color={showingPublicThemes ? "white" : undefined}
          onClick={() => setShowingPublicThemes(true)}
        >
          Public themes
        </OutlinedButton>
      </Flex>

      {showingPublicThemes ? (
        <PublicThemes items={items} />
      ) : (
        <PersonalThemes
          copyToClipboard={copyToClipboard}
          deleteTheme={deleteTheme}
          themes={settings.themes}
        />
      )}
    </Box>
  );
};

export default ManageThemes;
