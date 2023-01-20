import { ChromeLogo } from "@/components/icons/ChromeLogo";
import { LandingThemePageHeader } from "@/components/landing-page/LandingPageHeader";
import { Footer } from "@/components/ui/Footer";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const LandingPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  });

  return (
    <Box>
      <LandingThemePageHeader />
      <Box
        width={["100%", "95%", "90%", "80%", "70%"]}
        mx="auto"
        maxW="1500px"
        height="100%"
      >
        <Box mt="16" textAlign="center">
          <Heading
            fontWeight="800"
            color="coral"
            width={["100%", "90%"]}
            fontSize={["6xl", "7xl", "8xl", "8xl", "8xl"]}
            lineHeight={["52px", "60px", "78px", "78px", "78px"]}
            mx="auto"
          >
            Take control of your new tab page
          </Heading>
          <Heading
            as="h2"
            mt="14"
            fontSize="xl"
            color="gray.600"
            width={["100%", "70%"]}
            mx="auto"
          >
            Don&apos;t give away your new tab to some search engine. Completely
            customize your new tab, with feeds, todo lists, markdown files and
            more
          </Heading>

          <Button
            variant="soft-rounded"
            mt="10"
            fontSize="xl"
            color="coral"
            bg="#ffe8e0"
            borderRadius="3xl"
            py="6"
            _hover={{
              transform: "translateY(-2px)",
            }}
          >
            <ChromeLogo />
            <Text ml="2">Add to Chrome</Text>
          </Button>
        </Box>
        <Box
          width={"100%"}
          // height="30vh"
          mt="60"
          mx="auto"
          // outline="8px solid #C6F6D5"
          borderRadius="md"
        >
          <video
            height="200"
            width="360"
            loop
            autoPlay
            playsInline
            muted
            style={{
              width: "105%",
              aspectRatio: "17/12",
              objectFit: "cover",
            }}
          >
            <source src="/StarterTabDemoV3.mp4" type="video/mp4"></source>
          </video>
        </Box>
        <Footer mt="24" />
      </Box>
    </Box>
  );
};

export default LandingPage;
