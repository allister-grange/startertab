import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import React from "react";
import { LandingPagePhotoSection } from "./LandingPagePhotoSection";

interface LandingPageDemoSectionProps {}

export const LandingPageDemoSection: React.FC<
  LandingPageDemoSectionProps
> = ({}) => {
  return (
    <Box mt="52" mx="auto" width="100%">
      <Box bg="grey" width="100%" h="600"></Box>

      <LandingPagePhotoSection
        title="Productivity like no other."
        titleColor="#7961E3"
        description="Choose from 15+ tiles designed to give you all the information you
        need to get your shit done at a glance."
        image="ff"
        isPictureOnLeft={false}
      />
      <LandingPagePhotoSection
        title="Your tab, your way."
        titleColor="#F94892"
        description="You have complete customization of your tab. Colors, layouts,
        tiles, background, it's all up to you."
        image="ff"
        isPictureOnLeft={true}
      />
      <LandingPagePhotoSection
        title="Join the community."
        titleColor="#47CE8D"
        description="Share your themes publicly, take inspiration from others, or
        straight up use their theme."
        image="ff"
        isPictureOnLeft={false}
      />
    </Box>
  );
};
