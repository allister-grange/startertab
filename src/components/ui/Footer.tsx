import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GithubSvg } from "@/components/icons/GithubSvg";

export const Footer: React.FC<BoxProps> = (props) => {
  return (
    <Box
      height="min-content"
      color="gray.900"
      pb="16"
      borderTop="1px solid #ddd"
      {...props}
    >
      <Flex
        width="90%"
        marginX="auto"
        px="2"
        pt="10"
        justifyContent={["", "space-between"]}
        flexDirection={["column", "column", "row"]}
      >
        <Flex>
          <Flex flexDir="column" mt="4" pr="4" mb="4">
            <Heading fontSize={["xl", "xl", "2xl"]} as="h3">
              Starter Tab
            </Heading>
            <Heading
              fontSize={["sm", "md", "md"]}
              mt="2"
              as="h3"
              color="gray.600"
              whiteSpace="nowrap"
            >
              ©2022-23; all rights reserved
            </Heading>
            <Text fontSize="sm" mt="2" whiteSpace="nowrap">
              <Link href="mailto:allistergrange@gmail.com">
                Feedback is invaluable
              </Link>
            </Text>
          </Flex>
        </Flex>

        <Flex columnGap="12" flexWrap="wrap">
          <Flex flexDir="column">
            <Heading fontSize={["md", "lg"]} as="h3" mt="4" mb="1">
              Code
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
              🥝 Made in nz
            </Text>
            <Flex alignItems="center" mt="1">
              <GithubSvg height={16} width={16} fill={"black"} />
              <Box ml="2" />
              <Link href={"https://github.com/allister-grange/startertab"}>
                Code
              </Link>
            </Flex>
          </Flex>

          <Flex flexDir="column" whiteSpace="nowrap" mt="4">
            <Heading fontSize={["md", "lg"]} as="h3" mb="1">
              Product
            </Heading>
            <Link href="/themes">Public themes</Link>
            <Link href="/updates">Updates</Link>
          </Flex>

          <Flex flexDir="column" mr="12" mt="4">
            <Heading fontSize={["md", "lg"]} as="h3" mb="1" whiteSpace="nowrap">
              Legal
            </Heading>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
