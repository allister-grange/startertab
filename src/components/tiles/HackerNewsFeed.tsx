import { TileId } from "@/types";
import { HackerNewsLinkHolder } from "@/types/hackernews";
import { Badge, Box, Center, Heading, Link, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type PageProps = {
  tileId: TileId;
};

type HackerNewsFeed = "Ask" | "Top" | "Show";

export const HackerNewsFeed: React.FC<PageProps> = ({ tileId }) => {
  const [hackerNewsData, setHackerNewsData] = useState<
    HackerNewsLinkHolder[] | undefined
  >();
  const [hackerNewsFeed, setHackNewsFeed] = useState<HackerNewsFeed>("Ask");
  const color = `var(--text-color-${tileId})`;
  const underlineColor = color;

  useEffect(() => {
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

    console.log("fetching");

    fetchHackerNewsData();
  }, [hackerNewsFeed]);

  return (
    <Box p="2" color={color} position="relative">
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link href="https://news.ycombinator.com/ask">Hacker News Feed</Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={underlineColor} />
      {hackerNewsData ? (
        <>
          {hackerNewsData.map((link) => (
            <Box key={link.title} p="2" pr="4">
              <Link href={link.url}>
                <Heading fontSize="md" fontWeight="normal">
                  {link.title}
                </Heading>
              </Link>
            </Box>
          ))}
          <Box width="100%" mt="2" mb="4" textAlign="center">
            <Badge
              _hover={{ cursor: "pointer" }}
              _active={{ cursor: "pointer" }}
              fontSize="xs"
              onClick={() => setHackNewsFeed("Top")}
              background="transparent"
              border={`1px solid ${color}`}
              color={color}
            >
              Top Stories
            </Badge>
            <Badge
              _hover={{ cursor: "pointer" }}
              _active={{ cursor: "pointer" }}
              onClick={() => setHackNewsFeed("Show")}
              fontSize="xs"
              background="transparent"
              border={`1px solid ${color}`}
              color={color}
              ml="2"
              mr="2"
            >
              Show Stories
            </Badge>
            <Badge
              _hover={{ cursor: "pointer" }}
              _active={{ cursor: "pointer" }}
              onClick={() => setHackNewsFeed("Ask")}
              fontSize="xs"
              background="transparent"
              border={`1px solid ${color}`}
              color={color}
            >
              Ask Stories
            </Badge>
          </Box>
        </>
      ) : (
        <Center minH="300px">
          <Spinner color="white" />
        </Center>
      )}
    </Box>
  );
};
