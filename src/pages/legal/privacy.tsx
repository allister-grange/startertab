import { Footer } from "@/components/ui/Footer";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface indexProps {}

const PrivacyPage: React.FC<indexProps> = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  return (
    <Box>
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
        minH="100vh"
      >
        <Box>
          <Heading fontWeight="800">Privacy Statement</Heading>
          <Text fontSize="sm" color="gray.500" mt="2">
            Last update: 27/01/2023
          </Text>
          <Text mt="6">
            At StarterTab, we value your privacy. Our open-source codebase does
            not collect, store, or share any personal information from users.
          </Text>
          <Text mt="6">
            Our software is designed to operate without the need for any
            personal information, and we do not request any personal information
            from users. We may access or use some information during the
            operation of the software, this is used to track how many visits are
            made to the website. This is not personal information.
          </Text>
          <Text mt="6">
            The source code for our software is available for review, and we
            encourage users to review it to verify that the software does not
            collect or store any personal information. If you have any concerns
            or questions about the privacy of our software, please contact me at{" "}
            <a
              href="mailto:allistergrange@gmail.com"
              style={{ textDecoration: "underline" }}
            >
              allistergrange@gmail.com
            </a>
            .
          </Text>
          <Text mt="6">
            Our software is licensed under GNU General Public License v3.0,
            which can be viewed{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://www.gnu.org/licenses/gpl-3.0.en.html"
            >
              here
            </a>
            .
          </Text>
          <Text mt="6">Thank you for using StarterTab 😎</Text>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default PrivacyPage;
