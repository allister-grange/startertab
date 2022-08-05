import {
  PauseIcon,
  PlayIcon,
  SkipLeft,
  SkipRight,
} from "@/components/ui/MediaControls";
import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { SpotifyContext } from "@/context/SpotifyContext";
import {
  NowPlayingSpotifyData,
  SpotifyContextInterface,
  TileId,
} from "@/types";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MusicControlButton } from "../ui/MusicControlButton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

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
  const { songArtist, songTitle, playing, link, playable } =
    spotifyData as NowPlayingSpotifyData;

  const color = `var(--text-color-${tileId})`;

  const getFontSize = (songTitle: string): string => {
    let fontSizeForTitle = "xl";

    if (songTitle.length >= 13) {
      fontSizeForTitle = "xl";
    }
    if (songTitle.length >= 15) {
      fontSizeForTitle = "lg";
    }
    if (songTitle.length >= 18) {
      fontSizeForTitle = "sm";
    }

    return fontSizeForTitle;
  };

  const getArtistFontSize = (artistName: string): string => {
    let fontSizeForArtist = "md";

    if (artistName.length >= 8) {
      fontSizeForArtist = "sm";
    }
    if (artistName.length >= 12) {
      fontSizeForArtist = "xs";
    }

    return fontSizeForArtist;
  };

  if (isAuthenticated === undefined) {
    return <Box></Box>;
  }

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithSpotify}
          color={color}
          borderColor={color}
        >
          Continue with Spotify&nbsp;
          <SpotifyLogo color={color} size={20} />
        </OutlinedButton>
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
        aria-label="Link to Spotify"
      >
        <SpotifyLogo size={18} color={color} />
      </Link>
      <Flex dir="row" pl="6" pt="3">
        {songTitle && songArtist ? (
          <Link href={link}>
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
          <Box>
            <Skeleton height="20px" width="70px" />
            <Skeleton height="15px" width="95px" mt="2" />
          </Box>
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
              aria-label="Go back a song"
            >
              <SkipLeft color={color} />
            </MusicControlButton>
            {playing ? (
              <MusicControlButton
                onClickHandler={() => pausePlaySong(true)}
                playable={playable}
                aria-label="Pause song"
              >
                <PauseIcon color={color} />
              </MusicControlButton>
            ) : (
              <MusicControlButton
                onClickHandler={() => pausePlaySong(false)}
                playable={playable}
                aria-label="Play song"
              >
                <PlayIcon color={color} />
              </MusicControlButton>
            )}
            <MusicControlButton
              onClickHandler={() => skipSong(true)}
              playable={playable}
              aria-label="Skip song"
            >
              <SkipRight color={color} />
            </MusicControlButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
