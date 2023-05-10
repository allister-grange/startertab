import { Heading, Button, Box, Text, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { ChromeLogo } from "@/components/icons/ChromeLogo";
import { FirefoxLogo } from "@/components/icons/FirefoxLogo";
import Image from "next/image";

interface LandingPageHeroProps {}

export const LandingPageHero: React.FC<LandingPageHeroProps> = ({}) => {
  return (
    <Box pt="14" textAlign="center" bg="white">
      <Flex flexDir="column">
        <Heading
          color="coral"
          fontWeight="800"
          width={["90%", "90%", "80%", "60%", "50%"]}
          fontSize={["5xl", "7xl", "7xl", "8xl", "8xl"]}
          lineHeight={["2.9rem", "3.5rem", "3.5rem", "5rem", "4xl"]}
          mx="auto"
        >
          Take control of your new tab page
        </Heading>
        <Heading
          as="h2"
          mt="12"
          fontSize={["lg", "xl", "2xl"]}
          color="#666"
          width={["85%", "90%", "80%", "55%"]}
          lineHeight={["24px", "38px"]}
          fontWeight="500"
          mx="auto"
        >
          Don&apos;t give away your new tab to some search engine. Completely
          customize your new tab, with feeds, todo lists, markdown files and
          more 😎
        </Heading>
      </Flex>

      <Flex
        justifyContent="space-around"
        w="min-content"
        mx="auto"
        columnGap="4"
        pt="3"
        pb="3"
        flexDir={["column", "row"]}
      >
        <Link
          display="flex"
          width="225px"
          mt="10"
          fontSize="xl"
          color="#ff652d"
          bg="#ffe8e0"
          borderRadius="3xl"
          py="2"
          px="6"
          _hover={{
            transform: "translateY(-2px)",
          }}
          href="https://chrome.google.com/webstore/detail/startertab/hklfanmakojdijomofibaiepoeobioni?hl=en&authuser=0"
          target="_blank"
          alignItems="center"
          whiteSpace="nowrap"
        >
          <ChromeLogo />
          <Text ml="2" fontWeight="semibold">
            Add to Chrome
          </Text>
        </Link>
        <Link
          display="flex"
          width="225px"
          mt="10"
          fontSize="xl"
          color="#ff652d"
          bg="#ffe8e0"
          borderRadius="3xl"
          py="2"
          px="6"
          _hover={{
            transform: "translateY(-2px)",
          }}
          href="https://addons.mozilla.org/en-US/firefox/addon/startertab-your-next-new-tab/"
          target="_blank"
          alignItems="center"
          whiteSpace="nowrap"
        >
          <Image
            src={"/firefox_logo.png"}
            alt="Firefox logo"
            height="28"
            width="28"
          />
          <Text ml="2" fontWeight="semibold">
            Add to Firefox
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};
