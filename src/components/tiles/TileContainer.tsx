import { RedditFeed } from "@/components/tiles";
import { SettingsContext } from "@/context/UserSettingsContext";
import {
  HackerNewsLinkHolder,
  TileId,
  UserSettingsContextInterface,
} from "@/types";
import { Center, Heading, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { HackerNewsFeed } from "@/components/tiles/HackerNewsFeed";
import NoSSR from 'react-no-ssr';

interface TileContainerProps {
  tileId: TileId;
  hackerNewsData: HackerNewsLinkHolder[];
}

export const TileContainer: React.FC<TileContainerProps> = ({
  tileId,
  hackerNewsData,
}) => {
  const { settings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;

  const { colorMode } = useColorMode();

  const currentTheme = settings.themes.find(
    (theme) => theme.themeName === colorMode
  )!;

  const tileType = currentTheme[tileId].tileType;
  let tileToRender;

  switch (tileType) {
    case "Reddit Feed":
      tileToRender = <RedditFeed tileId={tileId} />;
      break;
    case "Hacker News Feed":
      tileToRender = <HackerNewsFeed hackerNewsData={hackerNewsData} />;
      break;

    default:
      tileToRender = (
        <Center height="100%" p="4">
          <Heading size="md">{`Could not find tile with tile name of ${tileType}`}</Heading>
        </Center>
      );
  }

  return (
    // SSR screws up the styles of the divs, TODO look into this later
    <NoSSR>
      {tileToRender}
    </NoSSR>
  );
};
