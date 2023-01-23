import { Heading, Button, Box, Text } from "@chakra-ui/react";
import React from "react";
import { ChromeLogo } from "../icons/ChromeLogo";

interface LandingPageHeroProps {}

export const LandingPageHero: React.FC<LandingPageHeroProps> = ({}) => {
  return (
    <Box mt="14" textAlign="center">
      <Heading
        color="coral"
        width={["100%", "90%", "80%"]}
        fontWeight="800"
        fontSize={["6xl", "7xl", "8xl", "8xl", "8xl"]}
        lineHeight={["52px", "60px", "78px", "78px", "78px"]}
        mx="auto"
      >
        Take control of your new tab page
      </Heading>
      <Heading
        as="h2"
        mt="12"
        fontSize="2xl"
        color="#666"
        width={["100%", "70%"]}
        lineHeight="38px"
        fontWeight="500"
        mx="auto"
      >
        Don&apos;t give away your new tab to some search engine. Completely
        customize your new tab, with feeds, todo lists, markdown files and more
        😎
      </Heading>

      <Button
        variant="soft-rounded"
        mt="10"
        fontSize="xl"
        color="#ff652d"
        bg="#ffe8e0"
        borderRadius="3xl"
        py="6"
        _hover={{
          transform: "translateY(-2px)",
        }}
      >
        <ChromeLogo />
        <Text ml="2">Add to Chrome</Text>
      </Button>
    </Box>
  );
};
