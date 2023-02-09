import { Heading, Box, Text, Link } from "@chakra-ui/react";
import React from "react";

export const Update200: React.FC = () => {
  return (
    <Box id="v2.00">
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
        themes.{" "}
        <Link
          href="/themes"
          style={{
            textDecoration: "underline",
            textDecorationColor: "#9CB79B",
          }}
        >
          Check it out!
        </Link>
      </Text>
      <Box mt="4" width={["100%", "90%", "90%", "90%"]} marginX="auto">
        <video
          loop
          autoPlay
          playsInline
          muted
          style={{
            width: "105%",
            aspectRatio: "1.40",
            objectFit: "cover",
            marginTop: "15px",
          }}
        >
          <source
            src="/updates_screenshots/themes_demo.mp4"
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
          personal tool and has evolved into a very public one. With over 300
          people using this site now as their own personal New Tab page, I
          thought it was time to introduce a way to let people share their
          creativity.
        </Text>
        <Text mt="2">
          You are now able to share your own themes, as well as download other
          people&apos;s. Don&apos;t worry, all non-essential data is stripped
          out from tiles when you share them. Only the Tile Type background
          color and text color is shared. I am still quite passionate about not
          storing your personal data, and this update will not affect that in
          any way.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Other Changes
        </Heading>
        <Text mt="2">
          - You can now edit theme names in the Personal Themes page
        </Text>
        <Text>- General bug fixes</Text>
        <Text>- Updated the ChakraUi library to the latest version</Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Looking to the future
        </Heading>
        <Text mt="2">
          - I want to add in more &quot;Tile Layouts&quot; so that people can
          shape their page in more ways, or allow people to drag/drop and
          re-size tiles, whichever provides the best UX. If you have an opinion
          on this please let me know
        </Text>
        <Text>
          - Have a way to link to a specific theme so that people can share them
        </Text>
        <Text>
          - Make a larger time tile that contains information about the timezone
          and date
        </Text>
        <Text>- Build a landing page</Text>
        <Text>
          - Build my own browser extension to do the re-directing on the New Tab
        </Text>
      </Box>
    </Box>
  );
};
