import { truncateString } from "@/helpers/tileHelpers";
import { ThemeSettings } from "@/types";
import { ThemeWithVotes } from "@/types/marketplace";
import { ArrowUpIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  StatUpArrow,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Prisma, Theme } from "@prisma/client";
import React, { ReactNode, useCallback, useState } from "react";
import { HeartIcon } from "../icons/HeartIcon";
import { ThemePreview } from "../theme-creator/ThemePreview";
import { OutlinedButton } from "../ui/OutlinedButton";

interface MarketPlaceThemeCardProps {
  theme: ThemeWithVotes;
  buttons?: ReactNode;
}

export const MarketPlaceThemeCard: React.FC<MarketPlaceThemeCardProps> = ({
  theme,
  buttons,
}) => {
  // used for async voting
  const [votes, setVotes] = useState(theme.votes.length);

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

  const voteForTheme = async () => {
    try {
      // doesn't matter too much if their vote disappears, c'est la vie
      setVotes((votes) => votes + 1);
      const voteRes = await fetch(
        `/api/marketplace/item/vote?themeId=${theme.id}`,
        {
          method: "POST",
        }
      );
    } catch (err) {
      console.error(err);
      // todo figure out how to handle this
    }
  };

  const themeSettings = theme.data as unknown as ThemeSettings;

  return (
    <Box
      key={theme.id}
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
        <ThemePreview theme={themeSettings} />
      </Box>
      <Flex justifyContent="space-between" minH="120px">
        <Flex flexDir="column" justifyContent="center">
          <Text fontSize="2xl" fontWeight="bold">
            {themeSettings.themeName}
          </Text>
          <Text color="gray.700" fontSize="sm" mt="2">
            Background:{" "}
            <Badge
              bg={themeSettings.globalSettings.backgroundColor}
              color={themeSettings.globalSettings.textColor}
              _hover={{ cursor: "pointer" }}
              onClick={() =>
                copyToClipboard(
                  themeSettings.globalSettings.backgroundColor,
                  themeSettings.globalSettings.backgroundColor
                )
              }
            >
              {truncateString(themeSettings.globalSettings.backgroundColor, 16)}
            </Badge>
          </Text>
          <Text color="gray.700" fontSize="sm">
            Text color:{" "}
            <Badge
              filter={themeSettings.globalSettings.textColor}
              _hover={{ cursor: "pointer" }}
              onClick={() =>
                copyToClipboard(
                  themeSettings.globalSettings.textColor,
                  themeSettings.globalSettings.textColor
                )
              }
            >
              {themeSettings.globalSettings.textColor}
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
          <OutlinedButton
            border={`1px solid black`}
            gap="4"
            onClick={voteForTheme}
          >
            <HeartIcon />
            <Box borderLeft={`1px solid black`} width="1px" height="70%" />
            <Text>{votes}</Text>
          </OutlinedButton>
          <OutlinedButton
            border={`1px solid black`}
            onClick={() => console.log("download bb")}
          >
            <Text fontSize="xs" mr="2">
              Save theme
            </Text>
            <DownloadIcon />
          </OutlinedButton>
        </Flex>
      </Flex>
    </Box>
  );
};
