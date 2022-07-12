import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { SpotifyContext } from "@/context/SpotifyContext";
import { SpotifyContextInterface, TileId } from "@/types";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { OptionBadge } from "@/components/ui/OptionBadge";

type SmallSpotifyTileProps = {
  tileId: TileId;
};

export const SpotifyTopArtists: React.FC<SmallSpotifyTileProps> = ({
  tileId,
}) => {
  const { topArtists, isAuthenticated, loginWithSpotify, fetchTopArtistData } =
    useContext(SpotifyContext) as SpotifyContextInterface;

  console.log(topArtists);

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
      <Heading size="md" pl="4">
        Top Artists
      </Heading>
      <Flex dir="row" flexDir="column">
        <UnorderedList mt="2" style={{ listStyle: "none" }}>
          {topArtists.length > 0 ? (
            topArtists.map((artist, index) => {
              return (
                <ListItem key={artist.name}>{`${index + 1}. ${
                  artist.name
                }`}</ListItem>
              );
            })
          ) : (
            <Center mt="100px" mr="20px">
              <Spinner size="lg" color={color} />
            </Center>
          )}
        </UnorderedList>
        {topArtists.length > 0 && (
          <Box width="100%" mt="2" mb="4" textAlign="center">
            <OptionBadge
              onClick={() => fetchTopArtistData("short_term")}
              color={color}
            >
              Short term
            </OptionBadge>
            <OptionBadge
              onClick={() => fetchTopArtistData("medium_term")}
              color={color}
              ml="2"
              mr="2"
            >
              Medium Term
            </OptionBadge>
            <OptionBadge
              mt="2"
              onClick={() => fetchTopArtistData("long_term")}
              color={color}
            >
              Long Term
            </OptionBadge>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
