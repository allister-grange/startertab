import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

const UpdatesPage: React.FC = ({}) => {
  React.useEffect(() => {
    document.body.style.background = "white";
  });

  return (
    <Box width={["100%", "100%", "90%", "70%"]} mx="auto" p="6">
      <Flex width="80%" direction={["column", "column", "row"]}>
        <Heading mb="2" fontSize="40px">
          Updates
        </Heading>
        <Link
          display="block"
          marginLeft={["0", "0", "auto"]}
          mt={["0", "0", "5"]}
          href="/"
        >
          Take me back to Starter Tab 👈
        </Link>
      </Flex>
      <hr style={{ width: "80%" }} />
      <Heading as="h2" fontSize="2xl" mt="6">
        Adding in the Markdown Tile and Favorites Tile{" "}
        <span
          style={{ fontSize: "16px", color: "var(--chakra-colors-gray-600)" }}
        >
          - v1.10
        </span>
      </Heading>
      <Text mt="2">
        In this update, we welcome two new tiles, along with some API
        optimizations
      </Text>
      <Flex
        width="100%"
        direction={["column", "column", "column", "row"]}
        gap="6"
        mt="6"
      >
        <Box
          width={["80%", "20%", "30%", "30%"]}
          minW="300px"
          overflow="hidden"
        >
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
        <Box
          width={["100%", "70%", "80%", "60%"]}
          minW="290px"
          overflow="hidden"
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
      <Box
        color="gray.700"
        width={["100%", "100%", "90%", "90%"]}
        maxW="700px"
        mt="6"
      >
        <Text mt="2">
          A request from a user who wanted to open up local Markdown files for
          viewing came through, so here it is! Hopefully people find this handy
          for tracking todo lists that otherwise wouldn&apos;t go into the Todo
          List Tile.
        </Text>
        <Text mt="2">
          Next up is the shortcuts tile. To be honest this probably should have
          come through in this initial release of the website as it&apos;s such
          a no-brainer. I&apos;ll probably use this tile myself to keep track
          sites I need to read.
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
          my behalf, so I have refactored the API. I&apos;m now seeing the error
          rate drop down to about 10%, something I&apos;d consider in the normal
          range.
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

export default UpdatesPage;
