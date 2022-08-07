import {
  PauseIcon,
  PlayIcon,
  SkipLeft,
  SkipRight,
} from "@/components/ui/MediaControls";
import { MusicControlButton } from "@/components/ui/MusicControlButton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { SpotifyContext } from "@/context/SpotifyContext";
import {
  NowPlayingSpotifyData,
  SpotifyContextInterface,
  TileId,
} from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  Img,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import React, { useContext } from "react";

interface LargeSpotifyTileProps {
  tileId: TileId;
}

export const LargeSpotifyTile: React.FC<LargeSpotifyTileProps> = ({
  tileId,
}) => {
  const {
    spotifyData,
    skipSong,
    pausePlaySong,
    isAuthenticated,
    loginWithSpotify,
  } = useContext(SpotifyContext) as SpotifyContextInterface;
  const {
    songArtist,
    songTitle,
    playing,
    link,
    playable,
    albumFullSizeImageUrl,
  } = spotifyData as NowPlayingSpotifyData;

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
    <Flex color={color} height="100%" p="4" pos="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        opacity="0.7"
        aria-label="Link to Spotify"
      >
        <SpotifyLogo size={24} color={color} />
      </Link>
      <Flex
        flexDir="column"
        flex="0 0 50%"
        display="flex"
        alignItems="flex-start"
        pl="4"
        pr="2"
        justifyContent="center"
        pos="relative"
      >
        {!songTitle ? (
          <Box height="175px" width="90%">
            <Skeleton height="20px" mt="3" width="90%" />
            <Skeleton height="15px" mt="3" width="75%" />
          </Box>
        ) : (
          <Link href={link} pos="absolute" top="20%" width="90%">
            <Heading fontSize={getFontSize(songTitle)}>{songTitle}</Heading>
            <Heading fontSize="xl" opacity="0.7">
              {songArtist}
            </Heading>
          </Link>
        )}
        <Box
          position={"absolute"}
          top="65%"
          borderRadius="15"
          bgColor="rgba(255,255,255,0.1)"
          border="1px solid rgba(255,255,255,0.1)"
          backdropFilter="blur(30px)"
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

      <Box
        boxShadow={"4px 4px 10px rgba(0,0,0,.4)"}
        width="218px"
        height="216px"
        mt="6%"
      >
        <Img src={albumFullSizeImageUrl} aria-label="Album cover art" />
      </Box>
    </Flex>
  );
};
