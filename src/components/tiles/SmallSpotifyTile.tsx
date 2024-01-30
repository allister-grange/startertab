import {
  PauseIcon,
  PlayIcon,
  SkipLeft,
  SkipRight,
} from "@/components/icons/MediaControls";
import { SpotifyLogo } from "@/components/icons/SpotifyLogo";
import { MusicControlButton } from "@/components/ui/MusicControlButton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SpotifyContext } from "@/context/SpotifyContext";
import { spotifyMediaControlsShowingSelector } from "@/recoil/UserSettingsSelectors";
import { NowPlayingSpotifyData, SpotifyContextInterface } from "@/types";
import { Box, Center, Flex, Heading, Link, Skeleton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

type SmallSpotifyTileProps = {
  tileId: number;
};

const getFontSize = (songTitle: string): string => {
  let fontSizeForTitle = "xl";

  if (songTitle.length >= 13) {
    fontSizeForTitle = "2xl";
  }
  if (songTitle.length >= 15) {
    fontSizeForTitle = "xl";
  }
  if (songTitle.length >= 18) {
    fontSizeForTitle = "lg";
  }

  return fontSizeForTitle;
};

const getArtistFontSize = (artistName: string): string => {
  let fontSizeForArtist = "lg";

  if (artistName.length >= 8) {
    fontSizeForArtist = "md";
  }
  if (artistName.length >= 12) {
    fontSizeForArtist = "sm";
  }

  return fontSizeForArtist;
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
  const [spotifyMediaControlsShowing, setSpotifyMediaControlsShowing] =
    useRecoilState(spotifyMediaControlsShowingSelector(tileId)) as [
      string | undefined,
      SetterOrUpdater<boolean | undefined>
    ];

  // if the setting isn't set yet (not the default settings), then populate it as true
  if (spotifyMediaControlsShowing === undefined) {
    setSpotifyMediaControlsShowing(true);
  }

  const color = `var(--text-color-${tileId})`;
  const maxLengthOfTitle = spotifyMediaControlsShowing ? 45 : 70;
  const maxLengthOfArtistName = spotifyMediaControlsShowing ? 40 : 70;

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
          <SpotifyLogo fill={color} height={20} width={20} />
        </OutlinedButton>
      </Center>
    );
  }

  return (
    <Box color={color} height="100%" p="4" position="relative">
      <Link
        target="_top"
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
        <SpotifyLogo fill={color} height={18} width={18} />
      </Link>
      <Flex
        dir="row"
        pl="6"
        alignItems="center"
        h={spotifyMediaControlsShowing ? "100%" : "90%"}
        pb={spotifyMediaControlsShowing ? "12" : undefined}
      >
        {songTitle && songArtist ? (
          <Link target="_top" href={link}>
            <Heading fontSize={getFontSize(songTitle)}>
              {" "}
              {songTitle.length >= maxLengthOfTitle
                ? songTitle.slice(0, maxLengthOfTitle).trim() + "..."
                : songTitle}
            </Heading>
            <Heading
              display="inline"
              fontSize={getArtistFontSize(songArtist)}
              opacity="0.7"
            >
              {songArtist.length >= maxLengthOfArtistName
                ? songArtist.slice(0, maxLengthOfArtistName).trim() + "..."
                : songArtist}
            </Heading>
          </Link>
        ) : (
          <Box>
            <Skeleton height="20px" width="70px" />
            <Skeleton height="15px" width="95px" mt="2" />
          </Box>
        )}
        {spotifyMediaControlsShowing && (
          <Flex
            pos="absolute"
            bottom="2"
            right="2"
            dir="row"
            alignItems="center"
          >
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
        )}
      </Flex>
    </Box>
  );
};
