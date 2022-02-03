import {
  Box,
  Center,
  Heading,
  Link,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { HackerNewsLinkHolder } from "../types/hackernews";

type PageProps = {
  hackerNewsData: HackerNewsLinkHolder[];
};

export const HackerNewsFeed: React.FC<PageProps> = ({ hackerNewsData }) => {
  const textColor = useColorModeValue("white", "#222222");
  const underlineColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box p="2" color={textColor}>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link href="https://news.ycombinator.com/ask">Hacker News Feed</Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={underlineColor} />
      {hackerNewsData ? (
        hackerNewsData.map((link) => (
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
    </Box>
  );
};
