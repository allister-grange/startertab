import { Heading, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Update220Props {}

export const Update220: React.FC<Update220Props> = ({}) => {
  return (
    <Box id="v2.2.0">
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.2.0 - New Tiles and Pages
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        17<sup>th</sup> Feb 2023
      </Text>
      <Text mt="2" color="black">
        Here&apos;s some exciting new features to make your StarterTab
        experience even better 😎
      </Text>
      <Box
        mt="4"
        width={["100%", "90%", "90%", "90%"]}
        marginX="auto"
        shadow="md"
        overflow="hidden"
        borderRadius="16px"
      >
        <Image
          src="/updates_screenshots/calendar_demo.png"
          alt="Demo of what the new calendar tile looks like"
          objectFit="cover"
          layout="responsive"
          width={"1360"}
          height={"646"}
          style={{
            width: "100%",
            borderRadius: "16px",
          }}
        />
      </Box>
      <Text textAlign="center" mt="2" fontSize="sm" color="gray.700">
        Check out the Google Calendar Tile paired with the Todo Tile
      </Text>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          New Tiles
        </Heading>
        <Text mt="2">
          We&apos;ve added two new tiles to help you keep track of your
          meetings. The Outlook Meetings tile lets you see your upcoming
          meetings in Outlook, and the Google Meetings tile lets you see your
          upcoming meetings in Google Calendar. Both tiles can be added to your
          grid by selecting them from the tile type selector in the settings
          sidebar.
        </Text>
        <Text mt="2">
          Getting through the Google approval process took a good 2 weeks,
          apologies for the delay of the update!
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          New Pages
        </Heading>
        <Text mt="2">
          A{" "}
          <Link href="/landingpad" passHref={true}>
            <ChakraLink
              textDecoration={"underline"}
              textDecorationColor="coral"
            >
              landing page
            </ChakraLink>
          </Link>{" "}
          has been built to give you an introduction to StarterTab and its
          features. You can access it by clicking the &quot;StarterTab&quot;
          logo in the top left corner. There&apos;s also now an{" "}
          <Link href="/faq" passHref={true}>
            <ChakraLink
              textDecoration={"underline"}
              textDecorationColor="coral"
            >
              FAQ page
            </ChakraLink>
          </Link>{" "}
          to answer some common questions. This too can be accessed from the
          header.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Smaller Changes
        </Heading>
        <Text mt="2">
          - Fixed a bug where the page background would flash when using
          server-side rendering.
        </Text>
        <Text>
          - Added a table of contents to the updates page to make it easier to
          navigate.
        </Text>
        <Text>
          - Cleaned up the error boundary page to make it more user-friendly.
        </Text>
        <Text>
          - Generalized the rendering of options in the tile type selectors to
          make it easier to add new tile types in the future.
        </Text>
        <Text>- Added a 404 page to handle invalid URLs.</Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Looking to the future
        </Heading>
        <Text mt="2">
          - Create a chrome extension exclusively for StarterTab
        </Text>
      </Box>
    </Box>
  );
};
