import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GithubSvg } from "./GithubSvg";
import { OutlinedButton } from "./OutlinedButton";

export const Footer: React.FC = ({}) => {
  return (
    <Box background="white" height="150px" display="fixed" color="gray.900">
      <Flex
        height="100%"
        width="100%"
        marginX="auto"
        px="2"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box>
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
        <Box>
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
          <Flex alignItems="center" mt="2">
            <GithubSvg height={16} width={16} fill={"black"} />
            <Box ml="2" />
            <Link href={"https://github.com/allister-grange/startertab"}>
              code
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
