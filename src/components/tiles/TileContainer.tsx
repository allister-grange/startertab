import { RedditFeed } from "@/components/tiles";
import { HackerNewsFeed } from "@/components/tiles/HackerNewsFeed";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { HackerNewsLinkHolder, TileId, UserSettings } from "@/types";
import { Center, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";
import NoSSR from "react-no-ssr";

interface TileContainerProps {
  tileId: TileId;
  hackerNewsData: HackerNewsLinkHolder[];
  settings: UserSettings;
}

export const TileContainer: React.FC<TileContainerProps> = ({
  tileId,
  hackerNewsData,
  settings,
}) => {
  const { colorMode } = useColorMode();

  const currentTheme = getCurrentTheme(settings, colorMode);

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
    <NoSSR>{tileToRender}</NoSSR>
  );
};
