import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { HackerNewsLogo } from "@/components/ui/HackerNewsLogo";
import { OptionBadge } from "@/components/ui/OptionBadge";
import { TileId } from "@/types";
import { HackerNewsLinkHolder } from "@/types/hackernews";
import { Box, Heading, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { redditFeedSelector } from "../recoil/UserSettingsSelectors";

type PageProps = {
  tileId: TileId;
};

type HackerNewsFeed = "Ask" | "Top" | "Show";

export const HackerNewsFeedTile: React.FC<PageProps> = ({ tileId }) => {
  const [hackerNewsFeed, setHackerNewsFeed] = useRecoilState(
    redditFeedSelector(tileId)
  );
  const [hackerNewsData, setHackerNewsData] = useState<
    HackerNewsLinkHolder[] | undefined
  >();

  const color = `var(--text-color-${tileId})`;
  const underlineColor = color;

  useEffect(() => {
    if (!hackerNewsFeed) {
      setHackerNewsFeed("Top");
    }

    const fetchHackerNewsData = async () => {
      try {
        const res = await fetch(
          `/api/hackerNews?hackerNewsFeed=${hackerNewsFeed}`
        );
        const data = (await res.json()) as HackerNewsLinkHolder[];

        setHackerNewsData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHackerNewsData();
  }, [hackerNewsFeed, setHackerNewsFeed]);

  const changeFeedType = (feed: HackerNewsFeed) => {
    setHackerNewsFeed(feed);
  };

  return (
    <Box p="2" color={color} position="relative">
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link
          href="https://news.ycombinator.com"
          aria-label="Link to Hacker News"
        >
          Hacker News Feed
        </Link>
      </Heading>
      <Box position="absolute" right="4" top="4" height="10px" width="20px">
        <HackerNewsLogo color={color} />
      </Box>

      <Box w="80%" bg="white" height="1px" ml="2" bgColor={underlineColor} />
      {hackerNewsData && hackerNewsData.length > 1 ? (
        <>
          {hackerNewsData.map((link) => (
            <Box key={link.id} p="2" pr="4">
              <Link href={link.url}>
                <Heading fontSize="md" fontWeight="normal">
                  {link.title}
                </Heading>
              </Link>
            </Box>
          ))}
          <Box width="100%" mt="2" mb="4" textAlign="center">
            <OptionBadge onClick={() => changeFeedType("Top")} color={color}>
              Top Stories
            </OptionBadge>
            <OptionBadge
              onClick={() => changeFeedType("Show")}
              color={color}
              ml="2"
              mr="2"
            >
              Show Stories
            </OptionBadge>
            <OptionBadge
              onClick={() => changeFeedType("Ask")}
              color={color}
              mt="2"
            >
              Ask Stories
            </OptionBadge>
          </Box>
        </>
      ) : (
        <TextFeedSkeleton />
      )}
    </Box>
  );
};
