import { Heading, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const Update120: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" fontSize="2xl" mt="6">
        v1.20 - Adding in the RSS Feed Tile
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        10<sup>th</sup> Nov 2022
      </Text>
      <Text mt="2" color="black">
        Another tile type! Along with a slew of minor updates to the feed tiles.
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
          Feed Tile Changes
        </Heading>
        <Text mt="2">
          You will notice that on the feed tiles (Reddit, HackerNews, RSS,
          Twitter) that you can now see the time posted, along with the author
          of the link is included on the tile. This gives more information at a
          glance, and provides a cleaner aesthetic in my opnion. I think it
          would be a step too far to include the &quot;scores&quot; that various
          sites have. The re-tweets, the upvotes and the like. This takes away
          from the semi-unbiased view the data comes through in the feed tiles
          at the moment, which is something I personally find pleasing.
        </Text>
        <Text mt="2">
          All of the feed tile types are now available on the large tiles. I
          believe the wide format does no harm for the links. Let me know what
          your thoughts are on this, I personally prefer the text on a larger
          stage. I may have to come up with more tile ideas for the taller tiles
          now, as I will likely switch over my feeds to the large ones.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Minor Changes
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
    </Box>
  );
};
