import { Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";

export const MobileWarning: React.FC = ({}) => {
  return (
    <Center height="80vh" bg="white" color="black" p="5">
      <Flex flexDir={"column"} justifyContent="center" alignItems="center">
        <Heading color="orange" size="xl" mb="3">🏄‍♂️🚀🧖</Heading>
        <Heading size="2xl">An apology,</Heading>
        <Heading mt="6" textAlign="center" color="#202020" size="md">
          This website is not designed for mobile devices, it&apos;s a
          dashboarding website designed to replace your New Tab page.
        </Heading>
        <Heading mt="6" textAlign="center" color="#202020" size="md">
          Please come back on another device.
        </Heading>
        <Heading color="orange" size="xl" mt="3">🦧🐕🦆</Heading>
      </Flex>
    </Center>
  );
};
