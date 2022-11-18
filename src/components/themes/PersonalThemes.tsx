import { PersonalThemeCard } from "@/components/themes/PersonalThemeCard";
import { ShareThemeModal } from "@/components/themes/ShareThemeModal";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeFilteringOptions, ThemeSettings } from "@/types";
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Grid, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

interface PersonalThemesProps {
  themes: ThemeSettings[];
  copyToClipboard: (value: string, message?: string) => void;
  deleteTheme: (theme: ThemeSettings) => void;
  setShowingPublicThemes: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  setOrderingMethod: React.Dispatch<
    React.SetStateAction<ThemeFilteringOptions>
  >;
}

export const PersonalThemes: React.FC<PersonalThemesProps> = ({
  themes,
  copyToClipboard,
  deleteTheme,
  setShowingPublicThemes,
  refetch,
  setOrderingMethod,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [themeToBeShared, setThemeToBeShared] = useState<
    ThemeSettings | undefined
  >();

  const openShareModal = (theme: ThemeSettings) => {
    setThemeToBeShared(theme);
    onOpen();
  };

  return (
    <Box>
      <ShareThemeModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        theme={themeToBeShared}
        setShowingPublicThemes={setShowingPublicThemes}
        setOrderingMethod={setOrderingMethod}
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
                  disabled={theme.downloadedFromMarketplace}
                  onClick={() => openShareModal(theme)}
                >
                  <Tooltip
                    isDisabled={!theme.downloadedFromMarketplace}
                    label="You downloaded this theme, you cannot now share it"
                    bg="gray.100"
                    color="black"
                    textAlign="center"
                  >
                    <Text fontSize="xs" mr="2">
                      Share publicly
                    </Text>
                  </Tooltip>
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
