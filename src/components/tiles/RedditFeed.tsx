import { RedditAPIResponse, RedditDataHolder } from "@/types";
import {
  Box,
  Center,
  Heading,
  Input,
  Link,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface RedditFeedProps {}

export const RedditFeed: React.FC<RedditFeedProps> = () => {
  const [subReddit, setSubReddit] = useState<string | undefined>();
  const [redditData, setRedditData] = useState<
    RedditDataHolder[] | undefined
  >();
  const textColor = useColorModeValue("white", "#222222");
  const underlineColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const reddit = async () => {
      // strips quotes
      const subRedditFromStorage = localStorage
        .getItem("subReddit")
        ?.replace(/["]+/g, "");
      if (subRedditFromStorage) {
        setSubReddit(subRedditFromStorage);
        const data = await getRedditData(subRedditFromStorage);
        setRedditData(data);
      } else {
        // default subreddit
        setSubReddit("wellington");
        const data = await getRedditData("wellington");
        setRedditData(data);
      }
    };

    reddit();
  }, []);

  const handleSubredditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubReddit(e.target.value);
  };

  const handleSubredditSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    changeSubredditFeed();
  };

  const changeSubredditFeed = async () => {
    localStorage.setItem("subReddit", JSON.stringify(subReddit));
    console.log("chancing", subReddit);

    const data = await getRedditData(subReddit!);
    setRedditData(data);
  };

  const getRedditData = async (
    subReddit: string
  ): Promise<RedditDataHolder[]> => {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${subReddit}/top.json?limit=20&t=day`
      );
      const redditData = (await res.json()) as RedditAPIResponse;

      const toReturn: RedditDataHolder[] = redditData.data.children.map(
        (child) => {
          return {
            url: child.data.url,
            title: child.data.title,
          };
        }
      );

      return toReturn;
    } catch (err) {
      console.error(err);
    }

    return [];
  };

  return (
    <Box p="2" color={textColor}>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link href="https://reddit.com">Reddit Feed</Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={underlineColor} />
      {redditData ? (
        redditData.map((link) => (
          <Box key={link.title} p="2" pr="4">
            <Link href={link.url}>
              <Heading fontSize="md" fontWeight="normal">
                {link.title}
              </Heading>
            </Link>
          </Box>
        ))
      ) : (
        <Center minH="300px">
          <Spinner color="white" />
        </Center>
      )}
      <Box
        w="80%"
        bg="white"
        height="1px"
        ml="2"
        mt="2"
        bgColor={underlineColor}
      />
      <Box mt="3" p="2">
        <Heading fontSize="md" fontWeight="bold">
          Change subreddit?
        </Heading>
        <form onSubmit={handleSubredditSubmit}>
          <Input
            height="20px"
            padding="4"
            mt="2"
            width="90%"
            onSubmit={changeSubredditFeed}
            value={subReddit}
            onChange={handleSubredditInput}
          />
        </form>
      </Box>
    </Box>
  );
};
