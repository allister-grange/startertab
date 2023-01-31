import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import React from "react";
import { LandingPagePhotoSection } from "./LandingPagePhotoSection";

interface LandingPageDemoSectionProps {}

export const LandingPageDemoSection: React.FC<
  LandingPageDemoSectionProps
> = ({}) => {
  return (
    <Box mx="auto" width="100%">
      <Flex
        justifyContent="center"
        bg="white"
        pt="16"
        flex="0 0 auto"
        width="100%"
      >
        <Flex
          bg="rgb(224, 231, 255)"
          display="flex"
          pos="relative"
          maxW="1220px"
          borderRadius="16"
          mb="-80px"
          flex="0 0 auto"
          shadow="rgb(60 66 87 / 10%) 0px 1px 1px 0px, rgb(0 0 0 / 7%) 0px 2px 5px 0px"
        >
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            poster="https://static.conjure.so/_next/static/media/video-poster.430263f4.jpg"
            style={{
              overflow: "clip",
              aspectRatio: "17/12",
              width: "100%",
              overflowClipMargin: "content-box",
              objectFit: "contain",
              marginBottom: "-40px",
              maxHeight: "675px",
              maxWidth: "1070px",
              paddingInline: "40px",
              paddingTop: "40px",
              boxShadow:
                "rgb(60 66 87 / 10%) 0px 1px 1px 0px, rgb(0 0 0 / 7%) 0px 2px 5px 0px",
            }}
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </Flex>
      </Flex>

      <LandingPagePhotoSection
        title="Productivity like no other."
        titleColor="#7961E3"
        description="Choose from 15+ tiles designed to give you all the information you
        need to get your shit done at a glance."
      />
      <LandingPagePhotoSection
        title="Your tab, your way."
        titleColor="#F94892"
        description="You have complete customization of your tab. Colors, layouts,
        tiles, background, it's all up to you."
      />
      <LandingPagePhotoSection
        title="Join the community."
        titleColor="#47CE8D"
        description="Share your themes publicly, take inspiration from others, or
        straight up use their theme."
      />
    </Box>
  );
};
