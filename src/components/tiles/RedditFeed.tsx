import { SettingsContext } from "@/context/UserSettingsContext";
import { RedditAPIResponse, RedditDataHolder, UserSettingsContextInterface } from "@/types";
import {
  Box,
  Center,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface RedditFeedProps {}

type Status = "loading" | "resolved" | "typing" | "waitingForInput";
type State = {
  status: Status;
  data?: RedditDataHolder[];
  error?: unknown;
};

export const RedditFeed: React.FC<RedditFeedProps> = () => {
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const [subReddit, setSubReddit] = useState<string | undefined>(
    settings.subReddit
  );
  const [state, setState] = useState<State>({
    status: "waitingForInput",
  });

  const textColor = "var(--text-color-tile-5)";
  const underlineColor = useColorModeValue("gray.200", "gray.700");

  const { data, status, error } = state;

  const loadRedditData = useCallback(
    async (subReddit: string) => {
      setState({ ...state, status: "loading" });
      try {
        const data = await getRedditData(subReddit);
        setState({ ...state, status: "resolved", data });
      } catch (error) {
        setState({ ...state, error });
      }
    },
    [state]
  );

  useEffect(() => {
    // only want this to run on first load
    if (state.data || state.error) {
      return;
    }

    if (state.status === "waitingForInput" && subReddit) {
      loadRedditData(subReddit);
    }
  }, [loadRedditData, state, subReddit]);

  const handleSubredditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, status: "typing" });
    setSubReddit(e.target.value);
  };

  const handleSubredditSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    changeSubredditFeedInStorage();
  };

  const changeSubredditFeedInStorage = async () => {
    let newSettings = cloneDeep(settings);
    newSettings.subReddit = subReddit;
    setSettings(newSettings);

    loadRedditData(subReddit!);
  };

  const getRedditData = async (
    subReddit: string
  ): Promise<RedditDataHolder[]> => {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${subReddit}/top.json?limit=20&t=day`
      );
      const redditData = (await res.json()) as RedditAPIResponse;

      const formattedData: RedditDataHolder[] = redditData.data.children.map(
        (child) => ({
          url: child.data.url,
          title: child.data.title,
        })
      );

      return formattedData;
    } catch (err) {
      throw new Error();
    }
  };

  let display;

  if (status === "loading") {
    display = (
      <Center minH="300px">
        <Spinner color="var(--text-color-tile-5)" />
      </Center>
    );
  } else if (status === "resolved" && data) {
    display = data.map((link) => (
      <>
        <Box key={link.title} p="2" pr="4">
          <Link href={link.url}>
            <Heading fontSize="md" fontWeight="normal">
              {link.title}
            </Heading>
          </Link>
        </Box>
      </>
    ));
  } else if (error) {
    display = (
      <Text p="4">
        There was an error fetching reddit data, please try again later!
      </Text>
    );
  }

  return (
    <Box p="2" color={textColor}>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link href="https://reddit.com">Reddit Feed</Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={underlineColor} />
      {display}
      {status === "resolved" && (
        <Box
          w="80%"
          bg="white"
          height="1px"
          ml="2"
          mt="2"
          bgColor={underlineColor}
        />
      )}
      <Box mt="3" p="2">
        <Heading fontSize="md" fontWeight="bold">
          {!data ? "Choose a subreddit" : "Change subreddit?"}
        </Heading>
        <form onSubmit={handleSubredditSubmit}>
          <Input
            height="20px"
            padding="4"
            mt="2"
            width="90%"
            onSubmit={changeSubredditFeedInStorage}
            value={subReddit}
            onChange={handleSubredditInput}
            borderColor={underlineColor}
          />
        </form>
      </Box>
    </Box>
  );
};
