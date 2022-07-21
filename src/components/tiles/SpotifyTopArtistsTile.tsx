import { OptionBadge } from "@/components/ui/OptionBadge";
import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { SpotifyContext } from "@/context/SpotifyContext";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  SpotifyContextInterface,
  TileId,
  UserSettingsContextInterface,
} from "@/types";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  ListItem,
  Skeleton,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import { clone } from "lodash";
import React, { useContext } from "react";

type SmallSpotifyTileProps = {
  tileId: TileId;
};

export const SpotifyTopArtistsTile: React.FC<SmallSpotifyTileProps> = ({
  tileId,
}) => {
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const theme = getCurrentTheme(settings, colorMode);
  const spotifyTimeLengthFromSettings =
    theme[tileId].spotifyArtistSearchTimeLength;

  const { topArtists, isAuthenticated, loginWithSpotify, fetchTopArtistData } =
    useContext(SpotifyContext) as SpotifyContextInterface;

  React.useEffect(() => {
    if (!spotifyTimeLengthFromSettings) {
      return;
    }

    fetchTopArtistData(spotifyTimeLengthFromSettings);
  }, [fetchTopArtistData, spotifyTimeLengthFromSettings]);

  const changeSpotifyTimeLength = (timeLength: string) => {
    const settingsClone = clone(settings);
    const themeCopy = getCurrentTheme(settingsClone, colorMode);
    themeCopy[tileId].spotifyArtistSearchTimeLength = timeLength;
    setSettings(settingsClone);
  };

  const color = `var(--text-color-${tileId})`;

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
          shadow="md"
        >
          Continue with Spotify&nbsp;
          <SpotifyLogo color={color} size={20} />
        </Button>
      </Center>
    );
  }

  return (
    <Box color={color} height="100%" p="2" position="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        height="14px"
        right="2"
        top="2"
        opacity="0.7"
      >
        <SpotifyLogo size={18} color={color} />
      </Link>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        Top Spotify Artists
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={color} />

      <Flex dir="row" flexDir="column">
        <UnorderedList mt="2" ml="2" style={{ listStyle: "none" }}>
          {topArtists.length > 0 ? (
            topArtists.map((artist, index) => {
              return (
                <ListItem key={artist.name}>{`${index + 1}. ${
                  artist.name
                }`}</ListItem>
              );
            })
          ) : (
            <Box height="100%" p="2">
              <Skeleton height="15px" mt="3" width="90%" />
              <Skeleton height="15px" mt="3" />
              <Skeleton height="15px" mt="3" width="75%" />
              <Skeleton height="15px" mt="3" width="65%" />
              <Skeleton height="15px" mt="3" width="85%" />
              <Skeleton height="15px" mt="3" width="95%" />
              <Skeleton height="15px" mt="3" width="75%" />
              <Skeleton height="15px" mt="3" />
              <Skeleton height="15px" mt="3" width="70%" />
              <Skeleton height="15px" mt="3" width="85%" />
              <Skeleton height="15px" mt="3" width="95%" />
            </Box>
          )}
        </UnorderedList>
        {topArtists.length > 0 && (
          <Box width="100%" mt="2" mb="4" textAlign="center">
            <OptionBadge
              onClick={() => changeSpotifyTimeLength("short_term")}
              color={color}
            >
              Short term
            </OptionBadge>
            <Box mt="2">
              <OptionBadge
                onClick={() => changeSpotifyTimeLength("medium_term")}
                color={color}
                mr="1"
              >
                Medium Term
              </OptionBadge>
              <OptionBadge
                ml="1"
                onClick={() => changeSpotifyTimeLength("long_term")}
                color={color}
              >
                Long Term
              </OptionBadge>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
