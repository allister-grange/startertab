import { Heading, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const Update2120: React.FC = ({}) => {
  return (
    <Box id="v2.12.0" color="gray.700">
      <Heading as="h2" fontSize="2xl" mt="6" color="black">
        v2.12.0 - Animated Backgrounds 🤮
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        31<sup>st</sup> August 2024
      </Text>
      <Text mt="2">
        It pains me to say it, but thanks to @ThatUnknownDude&apos;s suggestion,
        we now have some animated backgrounds! Different folks, different
        strokes, right? Taking it back to the 00&apos;s with these backgrounds.
      </Text>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          The Backgrounds
        </Heading>
        <Text mt="2">Find it in the sidebar, give it a whirl!</Text>
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
          src="/updates_screenshots/animated_background_demo.mp4"
          type="video/mp4"
        ></source>
      </video>
      <Text textAlign="center" fontSize="sm" color="gray.700">
        Find the animated backgrounds in the sidebar 🔍
      </Text>

      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Outlook and Google Calendar&apos;s in the Day Planner Tile
        </Heading>
        <Text mt="2">
          Through a sidebar setting, you can now pull in your Google and Outlook
          calendar events into the Day Planner tile! There is a request in the{" "}
          <Link href="/suggestions">suggestions</Link> to have a standalone tile
          for both Google and Outlook calendars, and yes, that&apos;s coming as
          well!
        </Text>
        <Text mt="2">
          Turn it on in the Sidebar using the{" "}
          <i>Use external calendars on day planner</i> option in the{" "}
          <b>Day Planner Tile</b> settings.
        </Text>
      </Box>
      <Box mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          It&apos;s the little things
        </Heading>
        <Text mt="2">
          - Fixed the Strava graph not taking up the full height in some windows
        </Text>
        <Text>
          - Added more instructions in on how to contribute to the code base
        </Text>
        <Text>
          - Changed all feed tiles to say &apos;1 hour ago &apos; rather than
          &apos;1 hours ago &apos;
        </Text>
      </Box>
    </Box>
  );
};
