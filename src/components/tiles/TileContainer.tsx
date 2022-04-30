import { SettingsContext } from "@/context/UserSettingsContext";
import { sideBarOptions } from "@/helpers/settingsHelpers";
import { ThemeSettings, TileId, UserSettingsContextInterface } from "@/types";
import { Heading, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RedditFeed } from "@/components/tiles";

interface TileContainerProps {
  tileId: TileId;
}

export const TileContainer: React.FC<TileContainerProps> = ({ tileId }) => {
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
      tileToRender = <RedditFeed tileId={tileId}/>;
      break;

    default:
      tileToRender = <Heading>{`Could not find tile with tile`}</Heading>;
  }

  console.log(tileType);

  return (
    /**
     *
     * Each tile will need to determine it's type
     *
     * if(settings[tileId].type === "reddit")
     * {
     *  render RedditTile props: tileId so you can pull in the settings for that tile
     * }
     *
     */
    tileToRender
  );
};
