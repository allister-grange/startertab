import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GithubSvg } from "../icons/GithubSvg";

export const Footer: React.FC<BoxProps> = (props) => {
  return (
    <Box
      background="white"
      height="min-content"
      display="fixed"
      color="gray.900"
      pb="4"
      {...props}
    >
      <Flex
        width="100%"
        marginX="auto"
        px="2"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={["column", "row"]}
        flexWrap={["nowrap", "wrap"]}
      >
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Box mt={["4", "0"]}>
          <Heading fontSize={["lg", "lg", "2xl"]} as="h3">
            Starter Tab
          </Heading>
          <Heading
            fontSize={["md", "md", "md"]}
            mt="2"
            as="h3"
            color="gray.600"
          >
            ©2022; all rights reserved
          </Heading>
          <Text fontSize="sm" width="70%" mt="2">
            <Link href="mailto:allistergrange@gmail.com">
              feedback is invaluable
            </Link>
          </Text>
        </Box>
        <Flex>
          <Flex flexDir="column" mr="12">
            <Heading fontSize={["sm", "md", "lg"]} as="h3" mt="4" mb="1">
              bad stuff
            </Heading>
            <Link href="/legal/privacy">privacy</Link>
            <Link href="/legal/terms">terms</Link>
          </Flex>
          <Flex flexDir="column">
            <Heading fontSize={["sm", "md", "lg"]} as="h3" mt="4" mb="1">
              good stuff
            </Heading>

            <Flex alignItems="center">
              <Box w="2" h="2" bg="lightgreen" borderRadius="100%" />
              <Box ml="2" />
              <Link
                href="mailto:allistergrange@gmail.com"
                style={{ marginLeft: "2" }}
              >
                allig256
              </Link>
            </Flex>
            <Text mt="1">🥝 made in nz</Text>
            <Flex alignItems="center" mt="1">
              <GithubSvg height={16} width={16} fill={"black"} />
              <Box ml="2" />
              <Link href={"https://github.com/allister-grange/startertab"}>
                code
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
