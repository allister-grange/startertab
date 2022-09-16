import { TwitterContext } from "@/context/TwitterContext";
import { TileId, TwitterContextInterface } from "@/types";
import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TextFeedSkeleton } from "../skeletons/TextFeedSkeleton";
import { OutlinedButton } from "../ui/OutlinedButton";
import { StravaLogo } from "../ui/StravaLogo";
import { TwitterLogo } from "../ui/TwitterLogo";

interface TwitterFeedTileProps {
  tileId: TileId;
}

export const TwitterFeedTile: React.FC<TwitterFeedTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;

  const { isAuthenticated, twitterData, loginWithTwitter, isLoading, error } =
    useContext(TwitterContext) as TwitterContextInterface;

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithTwitter}
          color={color}
          borderColor={color}
        >
          Continue with Twitter&nbsp;
          <TwitterLogo color={"#1E9CEA"} />
        </OutlinedButton>
      </Center>
    );
  }

  let display;

  if (isLoading && isAuthenticated !== undefined) {
    display = <TextFeedSkeleton />;
  } else if (error) {
    display = (
      <Text p="4">
        There was an error fetching twitter data, please try again later!
      </Text>
    );
  } else if (twitterData) {
    display = twitterData.map((tweet) => (
      <>
        <Box key={tweet.id} p="2" pt="4" pr="4">
          <Link
            href={`https://twitter.com/startpageeasteregg/statuses/${tweet.id}`}
          >
            <Text fontSize="md" fontWeight="normal">
              {tweet.text}
            </Text>
          </Link>
        </Box>
      </>
    ));
  } else {
    display = <></>;
  }

  return (
    <Box p="2" color={color} position="relative">
      <Box position="absolute" right="4" top="3">
        <TwitterLogo color={color} />
      </Box>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link aria-label="Link to Twitter" href="https://twitter.com/home">
          Twitter Feed
        </Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={color} />
      {display}
    </Box>
  );
};
