import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box width="100%" bg="#F7F8FA" height="80px">
      <Flex
        alignItems="center"
        p="4"
        mx="auto"
        width={["90%"]}
        justifyContent="space-between"
      >
        <Box>
          <Heading fontSize="3xl">Starter Tab</Heading>
          <Heading fontSize="sm" color="gray.600">
            Your New Tab solution
          </Heading>
        </Box>
        <Flex>
          <Heading fontSize="lg" color="gray.700">
            Updates
          </Heading>
          <Box height="20px" borderLeft="1px solid black" width="1px" mx="2" />
          <Heading fontSize="lg" color="gray.700">
            Themes
          </Heading>
          <Box height="20px" borderLeft="1px solid black" width="1px" mx="2" />
          <Heading fontSize="lg" color="gray.700">
            Code
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};
