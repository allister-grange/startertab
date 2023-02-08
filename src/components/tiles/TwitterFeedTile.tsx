import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { TwitterLogo } from "@/components/icons/TwitterLogo";
import { TwitterContext } from "@/context/TwitterContext";
import { calculateTimeAgoString, truncateString } from "@/helpers/tileHelpers";
import { TwitterContextInterface } from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";

interface TwitterFeedTileProps {
  tileId: number;
}

export const TwitterFeedTile: React.FC<TwitterFeedTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;

  const { isAuthenticated, twitterData, loginWithTwitter, isLoading, error } =
    useContext(TwitterContext) as TwitterContextInterface;
  const [displayingOnWideTile, setDisplayingOnWideTile] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  // need to change the amount of text truncated from title depending on width
  React.useEffect(() => {
    if (!divRef.current) {
      return;
    }

    if (divRef.current.offsetWidth > 300) {
      setDisplayingOnWideTile(true);
    }
  }, []);

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithTwitter}
          color={color}
          borderColor={color}
        >
          Continue with Twitter&nbsp;
          <TwitterLogo fill="#1E9CEA" height={20} width={20} />
        </OutlinedButton>
      </Center>
    );
  }

  let display;

  if (isLoading && isAuthenticated !== undefined) {
    display = <TextFeedSkeleton />;
  } else if (error) {
    display = (
      <Box mt="6" textAlign="center" px="2">
        <Text>There was an error fetching the Twitter data.</Text>
        <br />
        <Text>
          If this error continues to persist, please open a{" "}
          <Link
            target="_top"
            style={{ textDecoration: "underline" }}
            href="https://github.com/allister-grange/startertab/issues"
          >
            GitHub issue
          </Link>
          .
        </Text>
      </Box>
    );
  } else if (twitterData) {
    display = (
      <UnorderedList margin="0" mt="4" px="2">
        {twitterData.map((tweet) => (
          <ListItem listStyleType="none" key={tweet.id} mt="3">
            <Link
              target="_top"
              href={`https://twitter.com/startertabeasteregg/statuses/${tweet.id}`}
            >
              {displayingOnWideTile
                ? tweet.text
                : truncateString(tweet.text, 90)}
            </Link>
            <Flex justifyContent="space-between">
              <Text fontSize="xs">
                {calculateTimeAgoString(new Date(tweet.created_at))}
              </Text>
              <Text fontSize="xs">{tweet.author}</Text>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    );
  } else {
    return <></>;
  }

  return (
    <Box p="2" color={color} position="relative" mb="2" ref={divRef}>
      <Box position="absolute" right="4" top="4">
        <TwitterLogo fill={color} height={20} width={20} />
      </Box>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link
          aria-label="Link to Twitter"
          target="_top"
          href="https://twitter.com/home"
        >
          Twitter Feed
        </Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={color} />
      {display}
    </Box>
  );
};
