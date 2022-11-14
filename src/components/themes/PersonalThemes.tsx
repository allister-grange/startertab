import { PersonalThemeCard } from "@/components/themes/PersonalThemeCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeSettings } from "@/types";
import { CreateThemeRequest } from "@/types/marketplace";
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Grid, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { ShareThemeModal } from "@/components/themes/ShareThemeModal";

interface PersonalThemesProps {
  themes: ThemeSettings[];
  copyToClipboard: (value: string, message?: string) => void;
  deleteTheme: (theme: ThemeSettings) => void;
}

export const PersonalThemes: React.FC<PersonalThemesProps> = ({
  themes,
  copyToClipboard,
  deleteTheme,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [themeToBeShared, setThemeToBeShared] = useState<
    ThemeSettings | undefined
  >();

  async function shareTheme(theme: ThemeSettings) {
    const toSend: CreateThemeRequest = {
      name: theme.themeName,
      data: theme,
      tags: ["productivity", "not", "fast"],
      author: "allig256",
    };

    try {
      await fetch("/api/marketplace/item/create", {
        method: "POST",
        body: JSON.stringify(toSend),
      });
    } catch (error) {
      console.error(error);
      // TODO show some error to the user?
    }
  }

  const openShareModal = (theme: ThemeSettings) => {
    setThemeToBeShared(theme);
    onOpen();
  };

  return (
    <Box>
      <ShareThemeModal
        isOpen={isOpen}
        onClose={onClose}
        theme={themeToBeShared}
      />
      <Grid
        templateColumns="repeat(auto-fit, minmax(435px, 1fr))"
        columnGap="4"
        mt="8"
        justifyItems="center"
        rowGap="8"
      >
        {themes.map((theme) => (
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
                  border={`1px solid black`}
                  onClick={() => openShareModal(theme)}
                >
                  <Text fontSize="xs" mr="2">
                    Share publicly
                  </Text>
                  <ExternalLinkIcon />
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
              </>
            }
          />
        ))}
      </Grid>
    </Box>
  );
};
