import { getSpotifyNowPlayingData } from "@/pages/api/spotify";
import { NowPlayingSpotifyData } from "@/types/spotify";
import {
  Box,
  Center,
  Flex,
  Heading,
  useColorModeValue,
  Text,
  Link,
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

  const color = useColorModeValue("white", "#222222");

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
        <Box pos="absolute" bottom="2" right="4">
          <Heading fontSize="md" color="#e2e2e2">
            From Spotify
          </Heading>
        </Box>
      </Flex>
    </Center>
  );
};
