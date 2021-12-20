import { Box, Center, Heading, Link, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HackerNewsLinkHolder } from "../types/hackernews";

export const HackerNewsFeed: React.FC = () => {
  const [hackerNewsLinks, setHackerNewsLinks] = useState<
    undefined | HackerNewsLinkHolder[]
  >();

  useEffect(() => {
    const fetchHackerNewsLinks = async () => {
      const linksRes = await fetch("/api/hackerNews");
      const links = await linksRes.json();

      setHackerNewsLinks(links);
    };

    fetchHackerNewsLinks();
  }, []);

  return (
    <Box>
      <Heading p="2" fontSize="xl">Hacker News Feed</Heading>
      <Box w="80%" bg="white" height="1px" ml="2"/>
      {hackerNewsLinks ? (
        hackerNewsLinks.map((link) => (
          <Box key={link.title} p="2" pr="4">
            <Link to={link.url}>
              <Heading fontSize="md">{link.title}</Heading>
            </Link>
          </Box>
        ))
      ) : (
        <Center minH="450px">
          <Spinner color="white" />
        </Center>
      )}
    </Box>
  );
};
