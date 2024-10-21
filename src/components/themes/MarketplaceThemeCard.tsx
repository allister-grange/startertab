import { calculateTimeAgoString, truncateString } from "@/helpers/tileHelpers";
import { ThemeSettings } from "@/types";
import { ThemeWithVotes } from "@/types/marketplace";
import { DownloadIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Text, Tooltip, useToast } from "@chakra-ui/react";
import React, { ReactNode, useCallback, useState } from "react";
import { FilledHeartIcon } from "../icons/FilledHeartIcon";
import { HeartIcon } from "../icons/HeartIcon";
import { ThemePreview } from "../theme-creator/ThemePreview";
import { OutlinedButton } from "../ui/OutlinedButton";

interface MarketPlaceThemeCardProps {
  theme: ThemeWithVotes;
  buttons?: ReactNode;
  setSearchFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  saveThemeToSettings: (theme: ThemeWithVotes) => void;
  saveDisabled: boolean;
}

const colorThemes = ["green", "teal", "purple", "orange", "red", "cyan"];

const hashString = (toHash: string) => {
  var hash = 0,
    i,
    chr;
  if (toHash.length === 0) return hash;
  for (i = 0; i < toHash.length; i++) {
    chr = toHash.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const MarketPlaceThemeCard: React.FC<MarketPlaceThemeCardProps> = ({
  theme,
  buttons,
  setSearchFilter,
  saveThemeToSettings,
  saveDisabled,
}) => {
  function checkIfLikedInLockedStorage() {
    const likedThemes = localStorage.getItem("likedThemes");
    // "1,4,6,22" etc
    if (likedThemes) {
      const found = likedThemes
        .split(",")
        .findIndex((id) => id === theme.id.toString());
      if (found > -1) {
        return true;
      }
    }
    return false;
  }

  // used for async voting
  const [votes, setVotes] = useState(theme.votes.length);
  const [liked, setLiked] = useState(checkIfLikedInLockedStorage);

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
    if (liked) {
      return;
    }
    setLiked(true);
    const likedThemes = localStorage.getItem("likedThemes");
    if (likedThemes) {
      localStorage.setItem("likedThemes", `${likedThemes},${theme.id}`);
    } else {
      localStorage.setItem("likedThemes", theme.id.toString());
    }
    try {
      // doesn't matter too much if their vote disappears, c'est la vie
      setVotes((votes: number) => votes + 1);
      const voteRes = await fetch(`/api/themes/item/vote?themeId=${theme.id}`, {
        method: "POST",
      });

      if (!voteRes.ok) {
        throw new Error("Failed to vote");
      }
    } catch (err) {
      setVotes((votes: number) => votes - 1);
      setLiked(false);
      console.error(err);
    }
  };

  const themeSettings = theme.data as unknown as ThemeSettings;

  return (
    <Box
      key={theme.id}
      bg="#fafafa"
      p="4"
      borderRadius="md"
      shadow="md"
      transition="all .2s"
      minH="420px"
      maxH="420px"
      maxW="480px"
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
          <Text
            fontSize={themeSettings.themeName.length > 24 ? "xl" : "2xl"}
            fontWeight="bold"
            mt="1"
          >
            {themeSettings.themeName}
          </Text>
          <Text color="gray.700" fontSize="sm" mt="1">
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
            Author:{" "}
            <Badge
              filter={themeSettings.globalSettings.textColor}
              _hover={{ cursor: "pointer" }}
              onClick={() => copyToClipboard(theme.author, theme.author)}
            >
              {theme.author}
            </Badge>
          </Text>
          <Text color="gray.700" fontSize="sm">
            Posted:{" "}
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
              {calculateTimeAgoString(new Date(theme.createdAt))}
            </Badge>
          </Text>
          <Flex mt="3">
            {theme.tags.split(",").map((tag: string, idx: number) => (
              <Badge
                key={idx + tag}
                filter={themeSettings.globalSettings.textColor}
                _hover={{ cursor: "pointer" }}
                maxW="260px"
                colorScheme={
                  colorThemes[Math.abs(hashString(tag) % colorThemes.length)]
                }
                onClick={() => setSearchFilter(tag)}
                mr="2"
              >
                <Text>{tag}</Text>
              </Badge>
            ))}
          </Flex>
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
            {liked ? <FilledHeartIcon /> : <HeartIcon />}
            <Box borderLeft={`1px solid black`} width="1px" height="70%" />
            <Text>{votes}</Text>
          </OutlinedButton>
          <OutlinedButton
            border={`1px solid black`}
            onClick={() => saveThemeToSettings(theme)}
            disabled={saveDisabled}
          >
            <Tooltip
              isDisabled={!saveDisabled}
              label="You have already downloaded this theme"
              bg="gray.100"
              color="black"
              textAlign="center"
            >
              <Text fontSize="xs" mr="2">
                Save theme
              </Text>
            </Tooltip>

            <DownloadIcon />
          </OutlinedButton>
        </Flex>
      </Flex>
    </Box>
  );
};
