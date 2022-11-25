import { Heading, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const Update200: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.00 - Build your themes in public
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        24<sup>th</sup> Nov 2022
      </Text>
      <Text mt="2" color="black">
        3 weeks in the making, we now have a way to publicly share our favorite
        themes.
      </Text>
      <Box mt="4" width={["100%", "90%", "80%", "80%"]} marginX="auto">
        <Text>RSS Feed Tile</Text>
        <video
          loop
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            aspectRatio: "1.63",
            objectFit: "cover",
            marginTop: "15px",
          }}
        >
          <source
            src="/updates_screenshots/rss_feed_tile_demo.mp4"
            type="video/mp4"
          ></source>
        </video>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Public Themes
        </Heading>
        <Text mt="2">
          I am very pleased to introduce public themes. This site began as a
          personal tool, and has evolved into a very public one. With other 300
          people using this site now as their own personal New Tab page, I
          thought it was time to introduce a way to let people share their
          creativity.
        </Text>
        <Text mt="2">
          You are now able to share your themes, and download others so that
          everyone&apos;s experience on the site can be shared. Don&apos;t
          worry, all non-essential data is stripped out from tiles when you
          share them. Only the Tile Type (feed, todo list etc), background color
          and text color are shared. I am still quite passionate about not
          storing your personal data, and this update will not affect that.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Other Changes
        </Heading>
        <Text mt="2">
          - The Bonsai Tile is now available on the larger tiles
        </Text>
        <Text>- There&apos;s a footer on the updates page</Text>
        <Text>- The error messages across the tiles are more informative</Text>
        <Text>
          - More tweaks to the API endpoints to make them more reliable
        </Text>
        <Text>
          - Added truncation of longer titles on the feed tiles, as to not take
          up 1/3 of your view with a large link
        </Text>
        <Text>
          - A user can now reset the data for a specific tile if it is causing
          an error caught by the ErrorBoundary
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Looking to the future
        </Heading>
        <Text mt="2">
          - I want to add in more &quot;Tile Layouts&quot; so that people can
          shape their page in more ways
        </Text>
        <Text>
          - Write up a Chrome Store extension that will do the re-directing
          myself, that was this is a complete product
        </Text>
        <Text>- I will build a landing page</Text>
      </Box>
    </Box>
  );
};
