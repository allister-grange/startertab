import { Heading, Box, Text, Link } from "@chakra-ui/react";
import React from "react";

export const Update210: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.10 - Customize your grid
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        22<sup>nd</sup> Dec 2022
      </Text>
      <Text mt="2" color="black">
        You can now customize your grid to better suit your personal style.
      </Text>
      <Box mt="4" width={["100%", "90%", "90%", "90%"]} marginX="auto">
        <video
          loop
          autoPlay
          playsInline
          muted
          style={{
            width: "105%",
            aspectRatio: "1.393",
            objectFit: "cover",
            marginTop: "15px",
          }}
        >
          <source
            src="/updates_screenshots/tile_manipulation_demo.mp4"
            type="video/mp4"
          ></source>
        </video>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Resizing of Grids
        </Heading>
        <Text mt="2">
          You can enter into the editing mode by either holding down a click on
          a tile, or through the settings sidebar.
        </Text>
        <Text mt="2">
          In all honesty, I thought that this would be more difficult to build
          that it proved to be. I initially was building all out the logic for
          the grid manipulation myself; I should have realized there would be an
          open source library that perfectly suited my needs earlier.
        </Text>
        <Text mt="2">
          Thank you{" "}
          <Link
            style={{
              textDecoration: "underline",
              textDecorationColor: "#9CB79B",
            }}
            href="https://github.com/react-grid-layout/react-grid-layout"
          >
            react-grid-layout
          </Link>{" "}
          for saving me quite likely 10&apos;s of hours of work.
        </Text>
        <Text mt="2">
          It was still no mean feat to get this done. I had to re-work all of
          the tile rendering logic, along with changing the shape of the objects
          that are persisted into local storage. This required writing scripts
          to go into the{" "}
          <Link
            style={{
              textDecoration: "underline",
              textDecorationColor: "#9CB79B",
            }}
            href="https://startertab.com/themes"
          >
            Theme
          </Link>{" "}
          database and overwrite the old formatting for themes people had pushed
          up, and modifying people&apos;s local storage on the first site visit
          with the new grid. This was a lesson for writing forward-thinking
          code. I never expected to have dynamic tiles, let alone an arbitrary
          grid, so my early architectural designs weren&apos;t as resilient as
          they should be.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Other Changes
        </Heading>
        <Text mt="2">
          - You cannot go back to &quot;default&quot; settings anymore, as
          there&apos;s no default for user generated themes, so I took this
          option out
        </Text>
        <Text>- General bug fixes</Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Looking to the future
        </Heading>
        <Text mt="2">
          - I&apos;m going to have to come up with a funding model for this
          site, at the very least a donation page, it&apos;s used by too many to
          sit on a free tier of Vercel and is costing me a few hundred a year to
          run
        </Text>
        <Text>
          - I still want to implement all of the options suggested below in
          Update 2.0, I will work on those for now
        </Text>
        <Text>
          - Make some of the tiles more responsive in nature now that they can
          be re-sized
        </Text>
      </Box>
    </Box>
  );
};
