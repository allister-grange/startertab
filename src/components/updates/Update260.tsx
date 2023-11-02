import { Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Update260Props {}

export const Update260: React.FC<Update260Props> = ({}) => {
  return (
    <Box id="v2.6.0">
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.6.0 - Feedback
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        2<sup>nd</sup> November 2023
      </Text>
      <Text mt="2" color="black">
        A place to suggest new tile ideas, as well as give general feedback for
        the app 🗳️
      </Text>
      <Text mt="2">
        Please consider leaving feedback for the application{" "}
        <Link href="/suggestions" style={{ color: "coral" }}>
          on the new suggestions page
        </Link>
        , I&apos;d love to hear anything and everything from users of
        StarterTab!
      </Text>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Ideas for feedback
        </Heading>
        <Text mt="2">- New tiles you&apos;d like to see</Text>
        <Text>- How the website can be improved</Text>
        <Text>- Any bugs that you&apos;ve dealing with</Text>
      </Box>
      <Box
        mt="4"
        width={["70%", "70%", "70%", "60%"]}
        marginX="auto"
        shadow="md"
        overflow="hidden"
        borderRadius="16px"
      >
        <Image
          src="/updates_screenshots/feedback_screenshot.png"
          alt="Preview of the form for submitting feedback for the site"
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
        Please leave your feedback for the site!
      </Text>
    </Box>
  );
};
