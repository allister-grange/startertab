import { ThemePreview } from "@/components/theme-creator/ThemePreview";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import {
  calculateTimeAgoString,
  deepClone,
  truncateString,
} from "@/helpers/tileHelpers";
import { ThemeSettings } from "@/types";
import { CreateThemeRequest } from "@/types/marketplace";
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Textarea, Text, Badge, Flex } from "@chakra-ui/react";
import { Theme } from "@prisma/client";
import React, { FormEvent, useCallback, useEffect, useState } from "react";

const Test: React.FC = () => {
  const [textAreaValue, setTextAreValue] = useState("");
  const [items, setItems] = useState<Theme[]>([]);

  useEffect(() => {
    document.body.style.background = "#F7F8FA";

    async function grabItems() {
      const items = await fetch("/api/marketplace/item");
      const data = (await items.json()) as Theme[];

      setItems(data);
    }

    grabItems();
  }, []);

  // const showClipboardToast = useCallback(
  //   (val?: string) => {
  //     toast({
  //       title: `Got it! ${val ?? ""}`,
  //       status: "info",
  //       duration: 1000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //   },
  //   [toast]
  // );

  const copyToClipboard = (value: string, message?: string) => {
    navigator.clipboard.writeText(value);
    // showClipboardToast(message);
  };

  // const deleteTheme = (theme: ThemeSettings) => {
  //   const clonedSettings = deepClone(settings);
  //   const index = clonedSettings.themes.findIndex(
  //     (themeToFind) => themeToFind.themeName === theme.themeName
  //   );

  //   if (index > -1) {
  //     clonedSettings.themes.splice(index, 1);
  //   }

  //   setSettings(clonedSettings);
  // };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const toSend: CreateThemeRequest = {
      name: "Midnight Rider 2.0",
      data: JSON.parse(textAreaValue) as unknown as ThemeSettings,
      tags: ["productivity", "not", "fast"],
      author: "allig256",
    };

    await fetch("/api/marketplace/item/create", {
      method: "POST",
      body: JSON.stringify(toSend),
    });
  }

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Textarea
          name="json"
          value={textAreaValue}
          onChange={(e) => setTextAreValue(e.target.value)}
        />
        <OutlinedButton type="submit">submit</OutlinedButton>
      </form>

      {items.map((item) => {
        const theme = item.data as unknown as ThemeSettings;
        return (
          <Box
            key={item.id}
            bg="white"
            p="4"
            borderRadius="md"
            shadow="md"
            transition="all .2s"
          >
            <Box
              height="225px"
              width="400px"
              pos="relative"
              overflow="hidden"
              borderRadius="lg"
              boxShadow="md"
            >
              <ThemePreview theme={theme as unknown as ThemeSettings} />
            </Box>
            <Text fontSize="xl" mt="2" fontWeight="bold">
              {theme.themeName}
            </Text>
            <Flex justifyContent="space-between">
              <Flex flexDir="column" justifyContent="center">
                <Text color="gray.700" fontSize="sm">
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
                    {truncateString(theme.globalSettings.backgroundColor, 20)}
                  </Badge>
                </Text>
                <Text color="gray.700" fontSize="sm" mt="2">
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
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

export default Test;
