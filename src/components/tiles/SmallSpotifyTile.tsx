import {
  PauseIcon,
  PlayIcon,
  SkipLeft,
  SkipRight,
} from "@/components/ui/MediaControls";
import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { SpotifyContext } from "@/context/SpotifyContext";
import { SpotifyContextInterface, TileId } from "@/types";
import { Box, Button, Center, Flex, Heading, Link, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MusicControlButton } from "../ui/MusicControlButton";

type SmallSpotifyTileProps = {
  tileId: TileId;
};

export const SmallSpotifyTile: React.FC<SmallSpotifyTileProps> = ({
  tileId,
}) => {
  const {
    spotifyData,
    skipSong,
    pausePlaySong,
    isAuthenticated,
    loginWithSpotify,
  } = useContext(SpotifyContext) as SpotifyContextInterface;
  const { songArtist, songTitle, playing, link, playable } = spotifyData;

  const color = `var(--text-color-${tileId})`;

  const getFontSize = (songTitle: string): string => {
    let fontSizeForTitle = "xl";

    if (songTitle.length <= 13) {
      fontSizeForTitle = "2xl";
    } else if (songTitle.length <= 15) {
      fontSizeForTitle = "xl";
    } else if (songTitle.length <= 18) {
      fontSizeForTitle = "md";
    } else if (songTitle.length >= 28) {
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

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <Button
          onClick={loginWithSpotify}
          color={color}
          bg={"transparent"}
          border={`2px solid ${color}`}
          _focus={{ background: "transparent" }}
          _hover={{ background: "transparent", transform: "translateY(-2px)" }}
          transition="all .2s"
        >
          Continue with Spotify&nbsp;
          <SpotifyLogo color={color} size={20} />
        </Button>
      </Center>
    );
  }

  return (
    <Box color={color} height="100%" p="4" position="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        height="14px"
        left="2"
        top="2"
        opacity="0.7"
      >
        <SpotifyLogo size={18} color={color} />
      </Link>
      <Flex dir="row" pl="6" pt="4">
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
      </Flex>
    </Box>
  );
};
