import { ChromeLogo } from "@/components/icons/ChromeLogo";
import { LandingThemePageHeader } from "@/components/landing-page/LandingPageHeader";
import { Footer } from "@/components/ui/Footer";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const LandingPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "#1B202B";
  });

  return (
    <Box
      width={["100%", "90%", "90%", "80%", "70%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1500px"
      height="100%"
    >
      <LandingThemePageHeader />
      <Box mt="24" textAlign="center">
        <Heading fontSize="5xl" color="white" width={["100%", "80%"]} mx="auto">
          Take control of your new tab page and let your browser work for you
        </Heading>
        <Heading
          as="h2"
          mt="8"
          fontSize="xl"
          color="gray.200"
          width={["100%", "70%"]}
          mx="auto"
        >
          Completely customize your new tab, with internet feeds, todo lists,
          markdown files and more
        </Heading>

        <Button
          variant="soft-rounded"
          mt="12"
          fontSize="xl"
          color="#1f543a"
          bg="#C6F6D5"
          borderRadius="3xl"
          py="6"
        >
          <ChromeLogo />
          <Text ml="2">Add to Chrome</Text>
        </Button>

        <Heading
          as="h2"
          mt="6"
          fontSize="md"
          fontWeight="300"
          color="gray.300"
          width={["100%", "70%"]}
          mx="auto"
        >
          OPEN SOURCE, FREE FOREVER
        </Heading>
      </Box>
      <Box
        width={"100%"}
        // height="30vh"
        mt="14"
        mx="auto"
        outline="8px solid #C6F6D5"
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
            width: "100%",
            aspectRatio: "17/12",
            objectFit: "cover",
          }}
        >
          <source src="/StarterTabDemoV3.mp4" type="video/mp4"></source>
        </video>
      </Box>
      <Footer />
      <Box mt="12"></Box>
    </Box>
  );
};

export default LandingPage;
