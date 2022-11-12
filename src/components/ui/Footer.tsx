import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const Footer: React.FC = ({}) => {
  return (
    <Box background="#F7F8FA" height="150px" display="fixed" color="gray.900">
      <Flex
        height="100%"
        width={["100%", "100%", "90%", "70%"]}
        marginX="auto"
        p="6"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Heading fontSize={["lg", "lg", "2xl"]} as="h3">
            Starter Tab
          </Heading>
          <Heading
            fontSize={["md", "md", "lg"]}
            mt="2"
            as="h3"
            color="gray.600"
          >
            © whatever year it is lol; all rights reserved
          </Heading>
        </Box>
        <Box>
          <Box>
            <Link href="emailto:allistergrange@gmail.com">Email me</Link>
          </Box>
          <Box mt="2">
            <Link href="https://github.com/allister-grange/startertab">
              Code for this site
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
