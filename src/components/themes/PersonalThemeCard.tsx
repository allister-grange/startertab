import { truncateString } from "@/helpers/tileHelpers";
import { ThemeSettings } from "@/types";
import { Badge, Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { ReactNode, useCallback } from "react";
import { ThemePreview } from "../theme-creator/ThemePreview";

interface PersonalThemeCardProps {
  theme: ThemeSettings;
  buttons?: ReactNode;
}

export const PersonalThemeCard: React.FC<PersonalThemeCardProps> = ({
  theme,
  buttons,
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
          justifyContent="center"
        >
          {buttons}
        </Flex>
      </Flex>
    </Box>
  );
};
