import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

export const Update110: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" fontSize="2xl" mt="6">
        v1.10 - Adding in the Markdown Tile and Favorites Tile
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        4<sup>th</sup> Nov 2022
      </Text>
      <Text mt="2">
        In this update, we welcome two new tiles, along with some API
        optimizations
      </Text>
      <Flex width="100%" direction="column" gap="6" mt="6">
        <Box width="40%" overflow="hidden" marginX="auto">
          <Box>
            <Text mb="2">Favorites/Shortcuts Tile</Text>
            <video
              loop
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                aspectRatio: ".81",
                objectFit: "cover",
              }}
            >
              <source
                src="/updates_screenshots/favorite_links_tile_demo.mp4"
                type="video/mp4"
              ></source>
            </video>
          </Box>
        </Box>
        <Text mt="2">
          The Favorites Tile! To be honest this probably should have come
          through in this initial release of the website as it&apos;s such a
          no-brainer. I&apos;ll probably use this tile myself to keep track of
          sites I need to read.
        </Text>
        <Box
          width={["100%", "90%", "80%", "80%"]}
          overflow="hidden"
          marginX="auto"
        >
          <Box>
            <Text mb="2">Local Markdown Files Tile</Text>
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
                src="/updates_screenshots/markdown_tile_demo.mp4"
                type="video/mp4"
              ></source>
            </video>
          </Box>
        </Box>
      </Flex>
      <Box color="gray.700" mt="6">
        <Text mt="2">
          Next up is the Markdown Tile. A request from a user who wanted to open
          up local Markdown files for viewing came through, so here it is!
          Hopefully people find this handy for tracking todo lists that
          otherwise wouldn&apos;t go into the Todo List Tile.
        </Text>
        <Text mt="2">
          The update also came with some{" "}
          <a
            style={{ color: "green" }}
            href="https://github.com/allister-grange/startertab/commit/d4f95233d0bf4eebb98b37ead936268f6adbb750#diff-2253cd423eea18a81ea3bd654b9dc534b57c95ace204981c6ec03244cb675ed2"
          >
            fixes
          </a>{" "}
          made to the Spotify API. I was having an error ratio of nearly{" "}
          <i>50%</i>(!) on the Spotify endpoint. This was due to poor coding on
          my behalf, as an endpoint was trying to send back data to the client
          twice on the same response. I have refactored the API, and I&apos;m
          now seeing the error rate drop down to about 10%, something I&apos;d
          consider in the normal range.
        </Text>
        <Text mt="2">
          Please feel free to reach out to me at{" "}
          <a href="mailto:allistergrange@gmail.com" style={{ color: "green" }}>
            allistergrange@gmail.com
          </a>{" "}
          if you have any suggestions! I&apos;d love to hear them.
        </Text>
      </Box>
    </Box>
  );
};
