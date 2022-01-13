import { NowPlayingSpotifyData } from "@/types/spotify";
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const Spotify: React.FC = ({}) => {
  const [songPlaying, setSongPlaying] = useState(false);
  const [songName, setSongName] = useState<string | undefined>();
  const [artistName, setArtistName] = useState<string | undefined>();
  const [link, setLink] = useState<string | undefined>();

  useEffect(() => {
    const fetchCurrentSong = async () => {
      const res = await fetch("/api/spotify");
      const data = (await res.json()) as NowPlayingSpotifyData;

      setSongPlaying(data.playing);
      setSongName(data.songTitle);
      setArtistName(data.songArtist);
      setLink(data.link);
    };

    fetchCurrentSong();
    setInterval(fetchCurrentSong, 10000);
  }, []);

  const skipSong = async (forward: boolean) => {
    try {
      await fetch(`/api/spotify?forward=${forward}`, { method: "POST" });
    } catch (err) {
      console.error(err);
    }
  };

  const pausePlaySong = async (pause: boolean) => {
    try {
      await fetch(`/api/spotify?pause=${pause}`, { method: "POST" });
    } catch (err) {
      console.error(err);
    }
  };

  const color = useColorModeValue("white", "#222222");

  const PauseIcon = (
    <svg
      role="img"
      height="24"
      width="24"
      viewBox="0 0 16 16"
      className="Svg-sc-1bi12j5-0 hDgDGI"
      fill={color}
      style={{ margin: "auto" }}
    >
      <path fill="none" d="M0 0h16v16H0z"></path>
      <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
    </svg>
  );

  const SkipRight = (
    <svg
      fill={color}
      style={{ margin: "auto" }}
      role="img"
      height="18"
      width="18"
      viewBox="0 0 16 16"
    >
      <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
    </svg>
  );

  const SkipLeft = (
    <svg
      fill={color}
      style={{ margin: "auto" }}
      role="img"
      height="18"
      width="18"
      viewBox="0 0 16 16"
    >
      <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
    </svg>
  );

  const PlayIcon = (
    <svg
      role="img"
      style={{ margin: "auto" }}
      height="24"
      width="24"
      viewBox="0 0 16 16"
      fill={color}
    >
      <path d="M4.018 14L14.41 8 4.018 2z"></path>
    </svg>
  );

  return (
    <Center color={color} height="100%" p="4">
      <Flex dir="row">
        {songName ? (
          <Link href={link}>
            <Heading fontSize="xl">
              {songName} - {artistName}{" "}
            </Heading>
          </Link>
        ) : (
          <Heading fontSize="2xl">Not Playing</Heading>
        )}
        <Flex pos="absolute" bottom="2" right="4" dir="row" alignItems="center">
          {songName && (
            <>
              <Button
                variant="unstyled"
                _focus={{ borderWidth: 0 }}
                onClick={() => {
                  skipSong(false);
                  setSongPlaying(true);
                }}
              >
                {SkipLeft}
              </Button>
              {songPlaying ? (
                <Button
                  variant="unstyled"
                  _focus={{ borderWidth: 0 }}
                  onClick={() => {
                    pausePlaySong(true);
                    setSongPlaying(false);
                  }}
                  aria-label="Pause spotify"
                >
                  {PauseIcon}
                </Button>
              ) : (
                <Button
                  variant="unstyled"
                  _focus={{ borderWidth: 0 }}
                  onClick={() => {
                    pausePlaySong(false);
                    setSongPlaying(true);
                  }}
                >
                  {PlayIcon}
                </Button>
              )}
              <Button
                variant="unstyled"
                _focus={{ borderWidth: 0 }}
                onClick={() => skipSong(true)}
              >
                {SkipRight}
              </Button>
            </>
          )}
          <Heading fontSize="md" color="#e2e2e2">
            Spotify
          </Heading>
        </Flex>
      </Flex>
    </Center>
  );
};
