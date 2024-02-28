import { Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export const Update270: React.FC = ({}) => {
  return (
    <Box id="v2.7.0">
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.7.0 - System Theming
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        1<sup>st</sup> December 2023
      </Text>
      <Text mt="2" color="black">
        You can now use your system theme to switch between light and dark modes
        for your StarterTab!
      </Text>
      <Text mt="2">
        This is set in the <b>Sidebar</b>, using the{" "}
        <i>Use system theme to toggle light/dark modes?</i> toggle to get
        started.
      </Text>
      <Box
        mt="4"
        width={["60%", "60%", "60%", "50%"]}
        marginX="auto"
        shadow="md"
        overflow="hidden"
        borderRadius="16px"
      >
        <Image
          src="/updates_screenshots/theme_toggle.png"
          alt="Preview of the toggle for using the system theme"
          objectFit="cover"
          layout="responsive"
          width={"316"}
          height={"316"}
          style={{
            width: "100%",
            borderRadius: "16px",
          }}
        />
      </Box>
      <Text textAlign="center" mt="2" fontSize="sm" color="gray.700">
        You can now choose a theme to switch to based off of your system
        settings
      </Text>
    </Box>
  );
};
