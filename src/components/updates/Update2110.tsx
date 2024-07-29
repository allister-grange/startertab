import { Heading, Text, Box } from "@chakra-ui/react";
import React from "react";

export const Update2110: React.FC = ({}) => {
  return (
    <Box id="v2.11.0" color="gray.700">
      <Heading as="h2" fontSize="2xl" mt="6" color="black">
        v2.11.0 - Introducing the Image Tile 🖼️
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        28<sup>th</sup> July 2024
      </Text>
      <Text mt="2">
        Thanks to @ironhak&apos;s suggestion, we now have an image tile!
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          The Image Tile
        </Heading>
        <Text mt="2">
          You can select to use an image on your device, or point to a url of an
          image on the internet. The image is supported on all tile sizes, give
          it a shot!
        </Text>
      </Box>
      <video
        loop
        autoPlay
        playsInline
        muted
        style={{
          width: "115%",
          aspectRatio: "1.47465437788",
          objectFit: "cover",
          marginTop: "15px",
          clipPath: "inset(1px 1px)",
        }}
      >
        <source
          src="/updates_screenshots/image_tile_demo.mp4"
          type="video/mp4"
        ></source>
      </video>
      <Text textAlign="center" fontSize="sm" color="gray.700">
        Add as many categories as you need in the editing mode
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          It&apos;s the little things
        </Heading>
        <Text mt="2">
          - Changed the weather tiles to have no decimals on celsius
          measurements
        </Text>
        <Text>
          - Fixed a bug where I was only fetching 10 suggestions from the db,
          whoops, now all suggestions will appear
        </Text>
        <Text>
          - Added in a button to jump to the form on the suggestions page
          encourage people to add ideas
        </Text>
        <Text>
          - Tidied up the instructions on how to contribute to the code base
        </Text>
      </Box>
    </Box>
  );
};
