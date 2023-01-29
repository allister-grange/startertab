import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GithubSvg } from "../icons/GithubSvg";

export const Footer: React.FC<BoxProps> = (props) => {
  return (
    <Box
      background="white"
      height="min-content"
      color="gray.900"
      pb="4"
      {...props}
    >
      <hr style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }} />
      <Flex
        width="100%"
        marginX="auto"
        px="2"
        justifyContent={["center"]}
        flexDirection={["column", "column", "row"]}
        alignItems={["center", "center", "unset"]}
      >
        <Box mt={["4", "0"]} pr="4" pt="4">
          <Heading fontSize={["xl", "xl", "2xl"]} as="h3">
            Starter Tab
          </Heading>
          <Heading
            fontSize={["md", "md", "md"]}
            mt="2"
            as="h3"
            color="gray.600"
            whiteSpace="nowrap"
          >
            ©2022-23; all rights reserved
          </Heading>
          <Text fontSize="sm" width="70%" mt="2">
            <Link href="mailto:allistergrange@gmail.com">
              feedback is invaluable
            </Link>
          </Text>
        </Box>
        <Flex ml={["0", "0", "auto"]}>
          <Flex flexDir="column" mr="12">
            <Heading
              fontSize={["sm", "md", "lg"]}
              as="h3"
              mt="4"
              mb="1"
              whiteSpace="nowrap"
            >
              bad stuff
            </Heading>
            <Link href="/legal/privacy">privacy</Link>
            <Link href="/legal/terms">terms</Link>
          </Flex>
          <Flex flexDir="column" mr="12" whiteSpace="nowrap">
            <Heading fontSize={["sm", "md", "lg"]} as="h3" mt="4" mb="1">
              site things
            </Heading>
            <Link href="/themes">public themes</Link>
            <Link href="/updates">updates</Link>
          </Flex>
          <Flex flexDir="column">
            <Heading fontSize={["sm", "md", "lg"]} as="h3" mt="4" mb="1">
              code
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
            <Text mt="1" whiteSpace="nowrap">
              🥝 made in nz
            </Text>
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
