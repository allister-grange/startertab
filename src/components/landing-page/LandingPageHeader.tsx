import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

export const LandingThemePageHeader: React.FC = () => {
  return (
    <Box bg="white" width="100%">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        bg="rgba(255,255,255,0.72)"
        backdropFilter="saturate(180%) blur(20px) !important"
        padding="1rem"
        maxWidth="1200px"
        margin="0 auto"
        color="black"
      >
        <Flex align="center" mr={5}>
          <Text fontSize={["lg", "3xl"]} fontWeight="800" color="black">
            Starter Tab
          </Text>
        </Flex>
        <Flex justify="flex-end" align="center">
          <Link
            display="block"
            href="/"
            color="gray.700"
            fontSize={["sm", "unset"]}
          >
            Take me to the app 👉
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
