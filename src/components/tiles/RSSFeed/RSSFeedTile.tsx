import { rssFeedsSelector } from "@/components/recoil/UserSettingsSelectors";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { RSSFeed, RSSItem, TileId } from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { RSSFeedForm } from "@/components/tiles/RSSFeed/RSSFeedForm";
import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { RSSLogo } from "@/components/ui/RSSLogo";

interface RSSFeedTileProps {
  tileId: TileId;
}

const fetcher = async (rssFeedUrls: string[]) => {
  const res = await fetch(`/api/rssFeeds?rssFeeds=${rssFeedUrls}`);
  const data = (await res.json()) as RSSFeed[];
  return data;
};

const getOrderedFeedData = (feeds: RSSFeed[]): RSSItem[] => {
  let rssFeedData: RSSItem[] = [];
  for (let i = 0; i < feeds?.length; i++) {
    rssFeedData.push(...feeds[i].data);
  }

  rssFeedData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return rssFeedData;
};

export const RSSFeedTile: React.FC<RSSFeedTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const [showingEditFeeds, setShowingEditFeeds] = useState(false);
  const [rssFeeds, setRssFeeds] = useRecoilState(rssFeedsSelector(tileId)) as [
    RSSFeed[] | undefined,
    SetterOrUpdater<RSSFeed[] | undefined>
  ];
  const [toDeleteFeedId, setToDeleteFeedId] = useState("");
  const { data, error, isLoading, refetch } = useQuery(
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

  // order the feed data by time
  const orderedRssFeedData = getOrderedFeedData(data ?? []);

  const calculateTimeAgoString = (date: Date) => {
    const timeDiff = new Date().getTime() - new Date(date).getTime();

    if (timeDiff < 3600000) {
      return `${Math.floor(timeDiff / 60000)} minutes ago`;
    } else if (timeDiff < 86400000) {
      return `${Math.floor(timeDiff / 3600000)} hours ago`;
    } else {
      return `${Math.ceil(timeDiff / (1000 * 60 * 60 * 24))} days ago`;
    }
  };

  const handleRssFeedDelete = (feedId: string) => {
    const oldFeed = [...(rssFeeds ?? [])];

    const toDeleteIndex = oldFeed.findIndex((feed) => feed.id === feedId);
    oldFeed.splice(toDeleteIndex, 1);
    setRssFeeds(oldFeed);
  };

  const onNewFeedSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        data: [],
        name: "",
      },
    ]);
  };

  let addFeedButton;
  if (!showingEditFeeds && rssFeeds && rssFeeds?.length === 0) {
    addFeedButton = (
      <OutlinedButton
        fontSize="xs"
        display="block"
        shadow="none"
        pos="absolute"
        top="45%"
        left="50%"
        transform={"translateX(-50%) translateY(-50%)"}
        _hover={{
          transform: "translateX(-50%) translateY(-52%)",
        }}
        _active={{
          transform: "translateX(-50%) translateY(-50%)",
        }}
        border={`1px solid ${color}`}
        onClick={() => setShowingEditFeeds(true)}
      >
        Add an RSS feed
      </OutlinedButton>
    );
  } else if (!showingEditFeeds) {
    addFeedButton = (
      <OutlinedButton
        fontSize="xs"
        display="block"
        shadow="none"
        my="2"
        border="1px solid black"
        onClick={() => setShowingEditFeeds(true)}
      >
        Edit feeds
      </OutlinedButton>
    );
  }

  let toDisplay;
  if (error) {
    toDisplay = (
      <Box mt="12" textAlign="center">
        <Text>
          There was an error fetching RSS feed data, did you put in an invalid
          URL?
        </Text>
        <br />
        <Text>
          If this error continues to persist, please open a{" "}
          <Link
            style={{ textDecoration: "underline" }}
            href="https://github.com/allister-grange/startertab/issues"
          >
            GitHub issue.
          </Link>
        </Text>
      </Box>
    );
  } else if (showingEditFeeds) {
    toDisplay = (
      <RSSFeedForm
        rssFeeds={rssFeeds}
        setToDeleteFeedId={setToDeleteFeedId}
        onNewFeedSubmit={onNewFeedSubmit}
        toDeleteFeedId={toDeleteFeedId}
        handleRssFeedDelete={handleRssFeedDelete}
        color={color}
        setShowingEditFeeds={setShowingEditFeeds}
        refetch={refetch}
      />
    );
  } else if (isLoading) {
    toDisplay = <TextFeedSkeleton />;
  } else {
    toDisplay = (
      <Box>
        <Box pos="absolute" top="4" right="4" height="18px" width="18px">
          <RSSLogo color={color} />
        </Box>
        <Heading fontSize="xl" mt="3">
          Rss Feed
        </Heading>
        <Box height="1px" width="80%" bg={color} mt="2" />
        <UnorderedList margin="0" mt="4">
          {orderedRssFeedData?.map((feed) => (
            <ListItem listStyleType="none" key={feed.date + feed.author} mt="3">
              <Link href={feed.link}>{feed.title}</Link>
              <Flex justifyContent="space-between">
                <Text fontSize="xs">
                  {calculateTimeAgoString(new Date(feed.date))}
                </Text>
                <Text fontSize="xs">{feed.author ?? feed.feedName}</Text>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
        <Box height="1px" width="90%" bg={color} mt="4" />
      </Box>
    );
  }

  return (
    <Box px="4">
      {toDisplay}
      <Box>{addFeedButton}</Box>
    </Box>
  );
};
