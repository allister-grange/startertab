import { Header } from "@/components/landing-page/LandingPageHeader";
import { Footer } from "@/components/ui/Footer";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const FAQPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  return (
    <Box>
      <Header />

      <Flex
        width={["100%", "90%", "70%", "60%", "50%"]}
        mx="auto"
        pt="6"
        px="2"
        maxW="1000px"
        color="black"
        flexDir="column"
        height="100%"
        justifyContent="space-between"
        pb="10"
      >
        <Heading>FAQ</Heading>
        <Heading as="h2" color="gray.600" fontSize="xl">
          Your Ultimate Guide to Mastering Your StarterTab 🧐
        </Heading>

        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Settings
          </Heading>
          <Text>
            Located in the lower left-hand corner of your StarterTab, the cog
            icon is your gateway to customizing your experience. By simply
            clicking on it, you can easily tweak and adjust almost any aspect of
            your StarterTab, making it uniquely yours.
          </Text>

          <Heading as="h3" fontSize="md" mt="2" color="gray.600">
            How do I remove and add tiles to my grid?
          </Heading>
          <Text>
            Simply hold down a long click on any tile or head to the &apos;Edit
            Tile Grid&apos; option in the settings sidebar to modify your grid
            to your needs.
          </Text>

          <Heading as="h3" fontSize="md" mt="2" color="gray.600">
            How do I have a video for a background?
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>

          <Heading as="h3" fontSize="md" mt="2" color="gray.600">
            A color gradient for a background?
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>

          <Heading as="h3" fontSize="md" mt="2" color="gray.600">
            How are the tiles made transparent?
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Box>
        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Creating a New Theme
          </Heading>
        </Box>
        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Sharing a Theme
          </Heading>
        </Box>
        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Downloading Public Themes
          </Heading>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
};

export default FAQPage;
