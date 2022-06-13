import { NowPlayingSpotifyData, TileId } from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  Img,
  Link,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MusicControlButton } from "@/components/ui/MusicControlButton";
import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import {
  PauseIcon,
  PlayIcon,
  SkipLeft,
  SkipRight,
} from "@/components/ui/MediaControls";
import useSpotify from "@/hooks/useSpotify";

interface LargeSpotifyTileProps {
  tileId: TileId;
}

export const LargeSpotifyTile: React.FC<LargeSpotifyTileProps> = ({
  tileId,
}) => {
  const { spotifyData, skipSong, pausePlaySong } = useSpotify();
  const { songArtist, songTitle, playing, link, playable, albumImageUrl } =
    spotifyData;

  const color = `var(--text-color-${tileId})`;

  const getFontSize = (songTitle: string): string => {
    let fontSizeForTitle = "xl";

    if (songTitle.length <= 18) {
      fontSizeForTitle = "3xl";
    } else if (songTitle.length <= 40) {
      fontSizeForTitle = "2xl";
    } else if (songTitle.length <= 60) {
      fontSizeForTitle = "xl";
    } else if (songTitle.length <= 70) {
      fontSizeForTitle = "md";
    }

    return fontSizeForTitle;
  };

  return (
    <Flex color={color} height="100%" p="4" pos="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        height="24px"
        opacity="0.7"
      >
        <SpotifyLogo color={color} />
      </Link>
      <Flex
        flexDir="column"
        flex="0 0 50%"
        display="flex"
        alignItems="flex-start"
        pl="4"
        pr="2"
        justifyContent="center"
      >
        {!songTitle ? (
          <Spinner color={color} size="lg" mb="35" ml="10" />
        ) : (
          <Link href={link} mb="7">
            <Heading fontSize={getFontSize(songTitle)}>{songTitle}</Heading>
            <Heading fontSize="xl" opacity="0.7">
              {songArtist}
            </Heading>
          </Link>
        )}
        <Box
          mt="3"
          borderRadius="15"
          bgColor="rgba(255,255,255,0.1)"
          border="1px solid rgba(255,255,255,0.1)"
          backdropFilter="blur(30px)"
          _hover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <MusicControlButton
            onClickHandler={() => skipSong(false)}
            playable={playable}
          >
            <SkipLeft color={color} />
          </MusicControlButton>
          {playing ? (
            <MusicControlButton
              onClickHandler={() => pausePlaySong(true)}
              playable={playable}
            >
              <PauseIcon color={color} />
            </MusicControlButton>
          ) : (
            <MusicControlButton
              onClickHandler={() => pausePlaySong(false)}
              playable={playable}
            >
              <PlayIcon color={color} />
            </MusicControlButton>
          )}
          <MusicControlButton
            onClickHandler={() => skipSong(true)}
            playable={playable}
          >
            <SkipRight color={color} />
          </MusicControlButton>
        </Box>
      </Flex>

      <Center pr="4">
        <Img
          boxShadow={"4px 4px 10px rgba(0,0,0,.4)"}
          // borderRadius="15"
          src={albumImageUrl}
        />
      </Center>
    </Flex>
  );
};
