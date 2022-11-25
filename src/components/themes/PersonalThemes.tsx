import { PersonalThemeCard } from "@/components/themes/PersonalThemeCard";
import { ShareThemeModal } from "@/components/themes/ShareThemeModal";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeFilteringOptions, ThemeSettings } from "@/types";
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

interface PersonalThemesProps {
  themes: ThemeSettings[];
  copyToClipboard: (value: string, message?: string) => void;
  deleteTheme: (theme: ThemeSettings) => void;
  setShowingPublicThemes: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  setOrderingMethod: (newValue: ThemeFilteringOptions) => void;
  changeThemeNameInSettings: (theme: ThemeSettings, newName: string) => void;
  setReverseOrdering: React.Dispatch<React.SetStateAction<boolean>>;
  cloneTheme: (theme: ThemeSettings) => void;
}

export const PersonalThemes: React.FC<PersonalThemesProps> = ({
  themes,
  copyToClipboard,
  deleteTheme,
  setShowingPublicThemes,
  refetch,
  setOrderingMethod,
  changeThemeNameInSettings,
  setReverseOrdering,
  cloneTheme,
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
    <Box pb="8">
      <ShareThemeModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        theme={themeToBeShared}
        setShowingPublicThemes={setShowingPublicThemes}
        setOrderingMethod={setOrderingMethod}
        setReverseOrdering={setReverseOrdering}
      />
      <Flex
        mt="8"
        flexWrap="wrap"
        width="100%"
        justifyContent="center"
        rowGap="10"
        columnGap="12"
      >
        {themes.map((theme, idx) => (
          <PersonalThemeCard
            key={theme.themeName + idx}
            theme={theme}
            changeThemeNameInSettings={changeThemeNameInSettings}
            buttons={
              <>
                <OutlinedButton
                  border={`1px solid black`}
                  onClick={() => cloneTheme(theme)}
                >
                  <Text fontSize="xs" mr="2">
                    Clone theme
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
                    label="You downloaded this theme, you cannot re-share it"
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
      </Flex>
    </Box>
  );
};
