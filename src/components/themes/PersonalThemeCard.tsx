import { truncateString } from "@/helpers/tileHelpers";
import useDebounce from "@/hooks/useDebounce";
import { ThemeSettings } from "@/types";
import { Badge, Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { ThemePreview } from "../theme-creator/ThemePreview";

interface PersonalThemeCardProps {
  theme: ThemeSettings;
  buttons?: ReactNode;
  changeThemeNameInSettings: (theme: ThemeSettings, newName: string) => void;
}

export const PersonalThemeCard: React.FC<PersonalThemeCardProps> = ({
  theme,
  buttons,
  changeThemeNameInSettings,
}) => {
  const toast = useToast();
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
  const [themeName, setThemeName] = useState(theme.themeName);
  const debouncedSearchTerm = useDebounce(themeName, 1000);

  useEffect(() => {
    changeThemeNameInSettings(theme, debouncedSearchTerm);
  }, [changeThemeNameInSettings, debouncedSearchTerm, theme]);

  const copyToClipboard = (value: string, message?: string) => {
    navigator.clipboard.writeText(value);
    showClipboardToast(message);
  };

  return (
    <Box
      key={theme.themeName}
      bg="white"
      p="4"
      borderRadius="md"
      shadow="md"
      transition="all .2s"
      maxW="455px"
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
      <Flex justifyContent="space-between" minH="120px">
        <Flex flexDir="column" justifyContent="center">
          <Input
            fontSize="2xl"
            fontWeight="bold"
            color="black"
            margin="0"
            padding="0"
            border="none"
            value={themeName}
            minLength={3}
            maxLength={20}
            onChange={(e) => setThemeName(e.target.value)}
          />
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
          {theme.downloadedFromMarketplace ? (
            <Text color="gray.700" fontSize="sm">
              Downloaded from Themes
            </Text>
          ) : null}
        </Flex>

        <Flex
          alignItems="center"
          color="gray.700"
          flexDir={"column"}
          gap="2"
          mt="4"
          justifyContent="center"
        >
          {buttons}
        </Flex>
      </Flex>
    </Box>
  );
};
