import { Box, Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

export const PreviewThemeCardSkeleton: React.FC = () => {
  return (
    <Box
      maxW="420px"
      minW="450px"
      maxH="400px"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      shadow="md"
      minH="440px"
      bg="white"
      borderRadius="md"
      p="4"
    >
      <Skeleton h="250px" w="415px" borderRadius="md" shadow="md" />

      <Flex justifyContent="space-between" minH="120px">
        <Flex flexDir="column" justifyContent="center" mt="10">
          <Skeleton w="150px" h="30px" />
          <Skeleton w="130px" h="17px" mt="3" />
          <Skeleton w="130px" h="17px" mt="2" />
        </Flex>

        <Flex
          alignItems="center"
          color="gray.700"
          flexDir={"column"}
          gap="2"
          mt="6"
          justifyContent="center"
        >
          <Skeleton w="90px" h="30px" />
          <Skeleton w="120px" h="30px" />
        </Flex>
      </Flex>
    </Box>
  );
};
