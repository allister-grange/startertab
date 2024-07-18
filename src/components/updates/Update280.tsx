import { Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export const Update280: React.FC = ({}) => {
  return (
    <Box id="v2.8.0" color="gray.700">
      <Heading as="h2" fontSize="2xl" mt="6" color="black">
        v2.8.0 - User&apos;s feedback!
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        28<sup>th</sup> February 2024
      </Text>
      <Text mt="2">
        Thanks to your suggestions, we have a bunch of new features on
        StarterTab 🗳️
      </Text>
      <Text mt="2">
        I read all of the feedback and suggestions for the application{" "}
        <Link href="/suggestions" style={{ color: "coral" }}>
          on the suggestions page
        </Link>
        , so please put up any ideas you have brewing!
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Using the Spotify Album for your background color
        </Heading>
        <Text mt="2">
          The most exciting feature this release is allowing you to have a
          dynamic colored background that changes with the album that
          you&apos;re listening to.
        </Text>
        <Text mt="2">
          Just flick the switch in the Large Spotify Tile options, and the
          background will change with your album!
        </Text>
      </Box>
      <video
        loop
        autoPlay
        playsInline
        muted
        style={{
          width: "115%",
          aspectRatio: "1.74",
          objectFit: "cover",
          marginTop: "15px",
        }}
      >
        <source
          src="/updates_screenshots/spotify_background_demo.mp4"
          type="video/mp4"
        ></source>
      </video>
      <Text textAlign="center" mt="2" fontSize="sm" color="gray.700">
        Quickly turn on the Spotify Album feature
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Other smaller changes
        </Heading>
        <Text mt="2">
          - You can now disable the Spotify media controls on the Spotify tile
          (useful if you don&apos;t have premium)
        </Text>
        <Text>
          - Allowing you to be able to turn off the timer on the time tile
        </Text>
        <Text>
          - You can now toggle the seconds displaying on the timer tile
        </Text>
        <Text>- The timer on the time tile now works across tabs</Text>
        <Text>- Allowing you to turn off/on 24 time on the timer tile</Text>
        <Text>- Adding in a playground to the landing page</Text>
        <Text>
          - Added in a &quot;completed&quot; state onto the suggestion tiles, so
          you can see when your suggestion was completed!
        </Text>
        <Text>- Fixed some buttons not being visible on dark themes</Text>
      </Box>
    </Box>
  );
};
