import { rssFeedsSelector } from "@/components/recoil/UserSettingsSelectors";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { RSSFeed, TileId } from "@/types";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface RSSFeedTileProps {
  tileId: TileId;
}

const fetcher = async (rssFeedUrls: string[]) => {
  const res = await fetch(`/api/rssFeeds?rssFeeds=${rssFeedUrls}`);
  const data = (await res.json()) as RSSFeed[];

  return data;
};

export const RSSFeedTile: React.FC<RSSFeedTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const [showingEditFeeds, setShowingEditFeeds] = useState(false);
  const [rssFeeds, setRssFeeds] = useRecoilState(rssFeedsSelector(tileId)) as [
    RSSFeed[] | undefined,
    SetterOrUpdater<RSSFeed[] | undefined>
  ];
  const [toDeleteFeedId, setToDeleteFeedId] = useState("");
  const { data, error, isLoading } = useQuery(
    ["rssFeeds", rssFeeds],
    () =>
      fetcher(
        rssFeeds!.reduce((result, current) => {
          return [...result, current.url];
        }, [] as string[])
      ),
    {
      enabled: rssFeeds != undefined && rssFeeds.length > 0,
    }
  );
  const handleRssFeedDelete = (feedId: string) => {
    const oldFeed = [...(rssFeeds ?? [])];

    const toDeleteIndex = oldFeed.findIndex((feed) => feed.id === feedId);
    oldFeed.splice(toDeleteIndex, 1);
    setRssFeeds(oldFeed);
  };

  function onNewFeedSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      url: { value: string };
    };

    const url = target.url.value;

    if (!url || typeof url !== "string") {
      return;
    }

    setRssFeeds([
      ...(rssFeeds || []),
      {
        url: url,
        id: (Math.random() + 1).toString(36).substring(7),
        data: null,
      },
    ]);
  }

  return (
    <Box p="4">
      {showingEditFeeds ? (
        <Box width="100%" alignItems="center">
          <UnorderedList m="0">
            {rssFeeds?.map((feed) => (
              <ListItem
                key={feed.id}
                onMouseEnter={() => setToDeleteFeedId(feed.id)}
                onMouseLeave={() => setToDeleteFeedId("")}
                display="flex"
                alignItems="center"
                flexDir="row"
              >
                <Text
                  display="flex"
                  alignItems="center"
                  flexDir="row"
                  wordBreak="break-word"
                  transition="all .2s"
                  margin="0"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  {feed.url}
                </Text>
                {toDeleteFeedId === feed.id && (
                  <SmallCloseIcon
                    cursor="pointer"
                    color={color}
                    opacity="0.6"
                    ml="auto"
                    onClick={() => handleRssFeedDelete(feed.id)}
                  />
                )}
              </ListItem>
            ))}
          </UnorderedList>
          <form onSubmit={onNewFeedSubmit}>
            <FormControl mt="4" isRequired>
              <FormLabel>RSS Feed Url</FormLabel>
              <Input
                width="200px"
                size="md"
                name="url"
                borderColor={color}
                placeholder={"Add a name for the link"}
                _placeholder={{
                  color,
                }}
                _focus={{ borderColor: color }}
                _hover={{ borderColor: color }}
              />
            </FormControl>
            <FormControl mt="6">
              <OutlinedButton
                outline={`1px solid ${color}`}
                type="submit"
                fontSize="sm"
              >
                Add Feed
              </OutlinedButton>
              <OutlinedButton
                fontSize="xs"
                display="block"
                shadow="none"
                p="0"
                ml="2px"
                mt="1"
                onClick={() => setShowingEditFeeds(false)}
              >
                Take me back
              </OutlinedButton>
            </FormControl>
          </form>
        </Box>
      ) : (
        <Box>
          {rssFeeds?.map((feed) => (
            <Text key={feed.id}>{feed.url}</Text>
          ))}
        </Box>
      )}
      <Box pos="absolute" bottom="0" right="3">
        {!showingEditFeeds && (
          <OutlinedButton
            fontSize="xs"
            marginLeft="auto"
            display="block"
            shadow="none"
            pos="sticky"
            onClick={() => setShowingEditFeeds(true)}
          >
            Edit Feeds
          </OutlinedButton>
        )}
      </Box>
    </Box>
  );
};
