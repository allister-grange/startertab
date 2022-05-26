import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import {
  RedditAPIResponse,
  RedditDataHolder,
  TileId,
  UserSettingsContextInterface,
} from "@/types";
import {
  Box,
  Center,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface RedditFeedProps {
  tileId: TileId;
}

type Status = "loading" | "resolved" | "reload" | "waitingForInput";
type State = {
  status: Status;
  data?: RedditDataHolder[];
  error?: unknown;
  inputSubreddit?: string;
};

export const RedditFeed: React.FC<RedditFeedProps> = ({ tileId }) => {
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();
  const [subReddit, setSubReddit] = useState<string | undefined>(() => {
    const theme = getCurrentTheme(settings, colorMode);
    return theme[tileId].subReddit;
  });
  const [state, setState] = useState<State>({
    status: "waitingForInput",
  });

  const textColor = `var(--text-color-${tileId})`;
  const underlineColor = textColor;

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

  // when a setting in changed in storage
  useEffect(() => {
    const currentTheme = getCurrentTheme(settings, colorMode);
    const subRedditInStorage = currentTheme[tileId].subReddit;

    if (!subRedditInStorage) {
      return;
    }

    if (subRedditInStorage === subReddit) {
      return;
    }

    setSubReddit(subRedditInStorage);
    setState((state) => {
      return { ...state, status: "reload" };
    });
  }, [colorMode, settings, subReddit, tileId]);

  useEffect(() => {
    // only want this to run on first load
    if (state.status === "reload" && subReddit) {
      loadRedditData(subReddit);
    } else if (state.data || state.error) {
      return;
    }

    if (state.status === "waitingForInput" && subReddit) {
      loadRedditData(subReddit);
    }
  }, [loadRedditData, state, subReddit]);

  const handleSubredditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, inputSubreddit: e.target.value });
  };

  const handleSubredditSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    changeSubredditFeedInStorage();
  };

  const changeSubredditFeedInStorage = useCallback(async () => {
    let newSettings = cloneDeep(settings);

    const theme = getCurrentTheme(newSettings, colorMode);
    theme[tileId].subReddit = state.inputSubreddit;
    setSettings(newSettings);

    loadRedditData(state.inputSubreddit!);
  }, [
    colorMode,
    loadRedditData,
    setSettings,
    settings,
    state.inputSubreddit,
    tileId,
  ]);

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
      <Center mt="4">
        <Spinner color={textColor} />
      </Center>
    );
  } else if (status === "resolved" && data) {
    display = data.map((link) => (
      <>
        <Box key={link.url} p="2" pt="4" pr="4">
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
    <Box p="2" color={textColor} position="relative">
      <Box
        position="absolute"
        right="4"
        top="3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={textColor}
        >
          <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />{" "}
        </svg>{" "}
      </Box>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link
          href={
            subReddit
              ? `https://reddit.com/r/${subReddit}`
              : "https://reddit.com"
          }
        >
          {data ? `r/${subReddit}` : "Reddit Feed"}
        </Link>
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
            value={state.inputSubreddit}
            onChange={handleSubredditInput}
            borderColor={underlineColor}
          />
        </form>
      </Box>
    </Box>
  );
};
