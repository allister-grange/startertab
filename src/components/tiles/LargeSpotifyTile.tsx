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
import { deepClone } from "@/helpers/tileHelpers";
import {
  spotifyControllingBackgroundSelector,
  spotifyMediaControlsShowingSelector,
} from "@/recoil/UserSettingsSelectors";
import {
  NowPlayingSpotifyData,
  SpotifyContextInterface,
  UserSettings,
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
import React, { useContext, useRef } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface LargeSpotifyTileProps {
  tileId: number;
  setSettings: SetterOrUpdater<UserSettings>;
  themeName: string;
}

const getFontSize = (songTitle: string): string => {
  let fontSizeForTitle = "xl";

  if (songTitle.length <= 18) {
    fontSizeForTitle = "3xl";
  } else if (songTitle.length <= 40) {
    fontSizeForTitle = "2xl";
  } else if (songTitle.length <= 60) {
    fontSizeForTitle = "xl";
  }

  return fontSizeForTitle;
};

const getArtistFontSize = (artistName: string): string => {
  return artistName.length >= 12 ? "lg" : "xl";
};

export const LargeSpotifyTile: React.FC<LargeSpotifyTileProps> = ({
  tileId,
  setSettings,
  themeName,
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
  const [spotifyMediaControlsShowing, setSpotifyMediaControlsShowing] =
    useRecoilState(spotifyMediaControlsShowingSelector(tileId)) as [
      boolean | undefined,
      SetterOrUpdater<boolean | undefined>
    ];
  const spotifyControllingBackground = useRecoilValue(
    spotifyControllingBackgroundSelector(tileId)
  );

  const albumImageRef = useRef<HTMLImageElement>(null);

  // used to set the background color from the Spotify album
  React.useEffect(() => {
    const albumImage = albumImageRef.current;

    if (!albumImage || !spotifyControllingBackground) return;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = albumImage.src;

    image.onload = function () {
      // create a canvas from the Spotify album so that we can count the colored pixels
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");

      if (!canvasContext) return;

      canvas.width = image.width;
      canvas.height = image.height;

      // build an array of RGBA values from the album
      canvasContext.drawImage(image, 0, 0);
      const imageData = canvasContext.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        sumRed += imageData[i];
        sumGreen += imageData[i + 1];
        sumBlue += imageData[i + 2];
      }

      const numPixels = imageData.length / 4;
      const avgRed = Math.round(sumRed / numPixels);
      const avgGreen = Math.round(sumGreen / numPixels);
      const avgBlue = Math.round(sumBlue / numPixels);

      const averageColor = `rgb(${avgRed}, ${avgGreen}, ${avgBlue})`;

      // add a vignette to the background, makes the color pop a little more
      const vignetteColorStart = "rgba(0,0,0,0)";
      const vignetteColorEnd = "rgba(0,0,0,0.4)";
      const vignetteGradient = `radial-gradient(circle at center, ${vignetteColorStart}, ${vignetteColorEnd})`;

      // set the theme background color to be the average color
      setSettings((settings) => {
        let newSettings = deepClone(settings);
        let currentTheme = newSettings.themes.find(
          (theme) => theme.themeName === themeName
        );
        if (!currentTheme) {
          currentTheme = settings.themes[0];
        }
        currentTheme.globalSettings.backgroundColor = `${vignetteGradient}, ${averageColor}`;
        return newSettings;
      });
    };
  }, [
    albumFullSizeImageUrl,
    setSettings,
    spotifyControllingBackground,
    themeName,
    tileId,
  ]);

  // if the setting isn't set yet (not the default settings), then populate it as true
  if (spotifyMediaControlsShowing === undefined) {
    setSpotifyMediaControlsShowing(true);
  }
  const maxLengthOfTitle = spotifyMediaControlsShowing ? 50 : 100;
  const maxLengthOfArtistName = spotifyMediaControlsShowing ? 40 : 80;
  const color = `var(--text-color-${tileId})`;

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
    <Flex color={color} height="100%" p="4" pos="relative">
      <Link
        target="_top"
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        opacity="0.7"
        aria-label="Link to Spotify"
      >
        <SpotifyLogo fill={color} height={24} width={24} />
      </Link>
      <Flex
        flexDir="column"
        flex="0 0 50%"
        display="flex"
        alignItems="center"
        pl="4"
        pr="2"
        justifyContent="center"
        pos="relative"
      >
        {songTitle && songArtist ? (
          <Link
            href={link}
            target="_top"
            pos="absolute"
            top={spotifyMediaControlsShowing ? "20%" : undefined}
            mb={spotifyMediaControlsShowing ? undefined : "10%"}
            width="90%"
          >
            <Heading fontSize={getFontSize(songTitle)}>
              {songTitle.length >= maxLengthOfTitle
                ? songTitle.slice(0, maxLengthOfTitle).trim() + "..."
                : songTitle}
            </Heading>
            <Heading fontSize={getArtistFontSize(songArtist)} opacity="0.7">
              {songArtist!.length >= maxLengthOfArtistName
                ? songArtist!.slice(0, maxLengthOfArtistName).trim() + "..."
                : songArtist}
            </Heading>
          </Link>
        ) : (
          <Box height="175px" width="90%">
            <Skeleton height="20px" mt="3" width="90%" />
            <Skeleton height="15px" mt="3" width="75%" />
          </Box>
        )}
        {spotifyMediaControlsShowing && (
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
        )}
      </Flex>

      <Box
        boxShadow={"4px 4px 10px rgba(0,0,0,.4)"}
        width="218px"
        height="216px"
        mt="6%"
      >
        <Img
          src={albumFullSizeImageUrl}
          aria-label="Album cover art"
          className="spotify-album"
          ref={albumImageRef}
        />
      </Box>
    </Flex>
  );
};
