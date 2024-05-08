import { Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export const Update290: React.FC = ({}) => {
  return (
    <Box id="v2.9.0" color="gray.700">
      <Heading as="h2" fontSize="2xl" mt="6" color="black">
        v2.9.0 - Font selection + bug fixin&apos; 🐞
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        7<sup>th</sup> May 2024
      </Text>
      <Text mt="2">
        Thanks to @pervenca&apos;s suggestion, you can now change the font for
        themes ✍️
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Changing your theme font
        </Heading>
        <Text mt="2">
          You can now use any built-in system font for your themes, adding in
          some interesting room for creativity on the site. If you create a new
          theme, make sure to push it up to the{" "}
          <Link href="/themes" target="_blank" style={{ color: "coral" }}>
            global themes
          </Link>{" "}
          to show it off to the world!
        </Text>
        <Text mt="2">
          You can find the new selection within the Global Settings for your
          theme, within the sidebar.
        </Text>
      </Box>
      <video
        loop
        autoPlay
        playsInline
        muted
        style={{
          width: "115%",
          aspectRatio: "1.47",
          objectFit: "cover",
          marginTop: "15px",
        }}
      >
        <source
          src="/updates_screenshots/font_change_demo.mp4"
          type="video/mp4"
        ></source>
      </video>{" "}
      <Text textAlign="center" mt="2" fontSize="sm" color="gray.700">
        Find the new font selection in the Global Settings of your theme!
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          It&apos;s the little things
        </Heading>
        <Text mt="2">
          - Fixed encoding issues where html was coming through in plain text on
          the feed tiles
        </Text>
        <Text>- Turning off relative links in the Favorite links tile</Text>
        <Text>
          - Adding in a confirmation dialog when you&apos;ve made changes in the
          sidebar so that you don&apos;t lose them
        </Text>
        <Text>- Fixed some build warnings within the code</Text>
        <Text>- Allowing you to turn off/on 24 time on the timer tile</Text>
        <Text>- Added in night time icons for the weather reports</Text>
      </Box>
    </Box>
  );
};
