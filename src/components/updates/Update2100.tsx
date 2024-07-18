import { Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export const Update2100: React.FC = ({}) => {
  return (
    <Box id="v2.10.0" color="gray.700">
      <Heading as="h2" fontSize="2xl" mt="6" color="black">
        v2.10.0 - Todo categories & default search engines 🔍
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        18<sup>th</sup> July 2024
      </Text>
      <Text mt="2">
        Thanks to @MaximusPr&apos;s suggestion, you can now set a default search
        engine for the search bar
        <br />
        <br />A big shout out to @Ujjwal-Rohilla as well, for suggesting that we
        add categories to the todo lists
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Adding in categories to your todo lists
        </Heading>
        <Text mt="2">
          When in the editing mode, you will now see the option to add
          categories into your todo lists. These can nest up to 3 categories
          deep, and brings you more flexibility and organisation to your lists.
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
          src="/updates_screenshots/todo_category_demo.mp4"
          type="video/mp4"
        ></source>
      </video>
      <Text textAlign="center" fontSize="sm" color="gray.700">
        Add as many categories as you need in the editing mode
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Changing your default search engine
        </Heading>
        <Text mt="2">
          When in the editing mode, you will now see that an option pops up to
          change your default search engine, once an option is selected, this
          will be used as your website when performing searches from the Search
          Bar Tile.
        </Text>
        <Text mt="2">
          Let me know if you want any other engines added on the{" "}
          <Link href="/themes" target="_blank" style={{ color: "coral" }}>
            suggestions page 🗳️
          </Link>
        </Text>
      </Box>
      <video
        loop
        autoPlay
        playsInline
        muted
        style={{
          width: "115%",
          aspectRatio: "1.535",
          objectFit: "cover",
          marginTop: "15px",
          clipPath: "inset(1px 1px)",
        }}
      >
        <source
          src="/updates_screenshots/search_bar_demo.mp4"
          type="video/mp4"
        ></source>
      </video>
      <Text textAlign="center" fontSize="sm" color="gray.700">
        Quickly change the search engine in the editing mode
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
