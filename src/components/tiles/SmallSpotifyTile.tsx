import { TileId } from "@/types";
import { NowPlayingSpotifyData } from "@/types/spotify";
import {
  Box, Flex,
  Heading,
  Link,
  Spinner
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MusicControlButton } from "../ui/MusicControlButton";
import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { PauseIcon, PlayIcon, SkipLeft, SkipRight } from "@/components/ui/MediaControls";
import useSpotify from "@/hooks/useSpotify";

type SmallSpotifyTileProps = {
  tileId: TileId;
};

export const SmallSpotifyTile: React.FC<SmallSpotifyTileProps> = ({ tileId }) => {
  const {spotifyData, skipSong, pausePlaySong} = useSpotify();
  const { songArtist, songTitle, playing, link, playable } = spotifyData;

  const color = `var(--text-color-${tileId})`;

  const getFontSize = (songTitle: string): string => {
    let fontSizeForTitle = "xl";

    if (songTitle.length <= 13) {
      fontSizeForTitle = "2xl";
    } else if (songTitle.length <= 18) {
      fontSizeForTitle = "xl";
    } else if (songTitle.length <= 24) {
      fontSizeForTitle = "md";
    } else if (songTitle.length >= 30) {
      fontSizeForTitle = "sm";
    }

    return fontSizeForTitle;
  };

  const getArtistFontSize = (artistName: string): string => {
    let fontSizeForArtist = "lg";

    if (artistName.length <= 14) {
      fontSizeForArtist = "md";
    } else if (artistName.length >= 16) {
      fontSizeForArtist = "sm";
    }

    return fontSizeForArtist;
  };

  return (
    <Box color={color} height="100%" p="4" position="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        height="24px"
        left="2"
        top="2"
      >
        <SpotifyLogo color={color} />
      </Link>
      <Flex dir="row" pl="6" pt="2">
        {songTitle && songArtist ? (
          <Link href={link} mb="6">
            <Heading fontSize={getFontSize(songTitle)}>{songTitle}</Heading>
            <Heading
              display="inline"
              fontSize={getArtistFontSize(songArtist)}
              opacity="0.7"
            >
              {songArtist}
            </Heading>
          </Link>
        ) : (
          <Spinner color={color} size="md" mt="2" />
        )}
        <Flex pos="absolute" bottom="3" left="10" dir="row" alignItems="center">
          <Box
            borderRadius="15"
            bgColor="rgba(255,255,255,0.1)"
            border="1px solid rgba(255,255,255,0.1)"
            backdropFilter="blur(5px)"
            _hover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <MusicControlButton
              onClickHandler={() => skipSong(false)}
              playable={playable}
            >
              <SkipLeft color={color}/>
            </MusicControlButton>
            {playing ? (
              <MusicControlButton
                onClickHandler={() => pausePlaySong(true)}
                playable={playable}
              >
              <PauseIcon color={color}/>
              </MusicControlButton>
            ) : (
              <MusicControlButton
                onClickHandler={() => pausePlaySong(false)}
                playable={playable}
              >
              <PlayIcon color={color}/>
              </MusicControlButton>
            )}
            <MusicControlButton
              onClickHandler={() => skipSong(true)}
              playable={playable}
            >
              <SkipRight color={color}/>
            </MusicControlButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
