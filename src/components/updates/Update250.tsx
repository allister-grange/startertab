import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { ChromeLogo } from "../icons/ChromeLogo";

export const Update250: React.FC = ({}) => {
  return (
    <Box id="v2.5.0">
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.5.0 - Package Updates
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        16<sup>th</sup> October 2023
      </Text>
      <Text mt="2" color="black">
        Time for some housekeeping 🧹
      </Text>
      <Text mt="2">
        It&apos;s been some time since the last &quot;official&quot; update. I
        have been ad-hoc adding in minor features and squashing some bugs here
        and there.
      </Text>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Minor updates
        </Heading>
        <Text mt="2">
          - All the packages used in the code are now up to date on their latest
          available versions
        </Text>
        <Text>
          - Added in a stock graph tile that shows you the performance of a
          stock over the previous week
        </Text>
        <Text>- Fixed some minor bugs 🐞</Text>
      </Box>
    </Box>
  );
};
