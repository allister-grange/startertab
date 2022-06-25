import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import {
  HackerNewsLinkHolder,
  ThemeSettings,
  TileType,
  UvGraphData,
} from "@/types";
import { RedditFeed } from "../tiles/RedditFeed";
import { Bonsai, HackerNewsFeed } from "../tiles";
import { TodoList } from "../tiles/TodoList";
import styles from "@/styles/Home.module.css";

interface TutorialThemeOptionProps extends ButtonProps {
  selected: boolean;
  themeName: string;
  background: string;
  innerBackgroundColor: string;
  innerBorder: string;
  tutorialTileType: TileType | undefined;
  theme: ThemeSettings;
  hackerNewsData: HackerNewsLinkHolder[];
}

export const TutorialThemeOption: React.FC<TutorialThemeOptionProps> = ({
  selected,
  themeName,
  background,
  innerBackgroundColor,
  innerBorder,
  tutorialTileType,
  hackerNewsData,
  theme,
  ...props
}) => {
  let tileToRender;

  switch (tutorialTileType) {
    case "Reddit Feed":
      tileToRender = <RedditFeed tileId={"tile1"} />;
      break;
    case "Hacker News Feed":
      tileToRender = (
        <HackerNewsFeed hackerNewsData={hackerNewsData} tileId={"tile1"} />
      );
      break;
    case "Bonsai":
      tileToRender = <Bonsai baseColor={"#454545"} trunkColor={"#af6f00"} />;
      break;
    case "Todo List":
      tileToRender = <TodoList tileId={"tile1"} todoList={[]} />;
      break;
    default:
      tileToRender = (
        <Center height="100%" p="10">
          <Heading size="md" color={`var(--text-color-tile1)`} textAlign="center">
            {tutorialTileType
              ? `Give me a tile type in the settings ✌️`
              : "Click on me to lock in a color"}
          </Heading>
        </Center>
      );
  }

  return (
    // put perspective shift on these
    <Button
      background={background}
      outline={selected ? "4px solid #8B83FB" : undefined}
      borderRadius="12"
      transition={"background width height .3s ease-in"}
      _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
      _focus={{ border: "" }}
      _active={{ background, transform: "translateY(-2px)" }}
      overflow="hidden"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      shadow={"md"}
      position="relative"
      {...props}
    >
      <Box
        transition={"background .3s ease-in"}
        width="300px"
        height="max(400px, 70%)"
        background={innerBackgroundColor}
        borderRadius="15px"
        minW="230px"
        pos="relative"
        overflowY="scroll"
        className={styles.disableScrollbars}
        textAlign={"left"}
        whiteSpace="normal"
        shadow={theme.globalSettings.dropShadow}
        border={theme.globalSettings.tileBorder}
        borderColor={theme.globalSettings.borderColor}
      >
        {tileToRender}
      </Box>
    </Button>
  );
};
