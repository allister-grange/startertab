import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { ChromeLogo } from "../icons/ChromeLogo";

export const Update240: React.FC = ({}) => {
  return (
    <Box id="v2.4.0">
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.4.0 - Extensions
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        12<sup>th</sup> May 2023
      </Text>
      <Text mt="2" color="black">
        Welcome to Chrome and Firefox extensions!
      </Text>
      <Box
        mt="8"
        width={["60%", "40%", "45%", "40%"]}
        marginX="auto"
        shadow="md"
        overflow="hidden"
        borderRadius="16px"
      >
        <Image
          src="/updates_screenshots/extension_preview.png"
          alt="Demo of what the new calendar tile looks like"
          objectFit="cover"
          layout="responsive"
          width={"392"}
          height={"209"}
          style={{
            width: "100%",
            borderRadius: "16px",
          }}
        />
      </Box>

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
      <Text textAlign="center" mt="2" fontSize="sm" color="gray.700">
        Please use the new extensions and leave a review!
      </Text>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Chrome and Fireox
        </Heading>
        <Text mt="2">
          Finally, I got around to creating my own extensions for the site
          rather than relying on a third-party redirect extension. The extension
          is lightweight and only requires your storage to enable the ability to
          turn off the redirection to StarterTab. I must say, working with
          Firefox is a much smoother experience than Chrome.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Minor updates
        </Heading>
        <Text mt="2">
          - You can now offset your Reddit feed results to avoid stickied posts,
          check out the sidebar settings for the new feature
        </Text>
        <Text>- Randomizing the widths of the skeletons on the feed tiles</Text>
        <Text>
          - Fixing minor bugs on the landing page with redirects on mobile
        </Text>
        <Text>- Fixed bug with links not opening in iFrames</Text>
      </Box>
    </Box>
  );
};
