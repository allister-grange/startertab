import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const MobileWarning: React.FC = ({}) => {
  return (
    <Center height="70vh" bg="white" color="black" p="5">
      <Flex flexDir={"column"} justifyContent="center" alignItems="center">
        <Heading color="orange" size="xl" mb="3">
          🏄‍♂️🚀🧖
        </Heading>

        <Heading size="2xl">An apology,</Heading>
        <Heading mt="6" textAlign="center" color="gray.700" size="md">
          This website is not designed for mobile devices, it&apos;s a
          dashboarding website designed to replace your New Tab page.
        </Heading>
        <Box width={"100%"} height="30vh" pt="10">
          <video height="200" width="360" loop autoPlay muted>
            <source src="/StarterTabDemoV3.mp4" type="video/mp4"></source>
          </video>
        </Box>
      </Flex>
    </Center>
  );
};
