import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import React from "react";

interface LandingPagePhotoSectionProps {
  title: string;
  titleColor: string;
  description: string;
  image: string;
  isPictureOnLeft: boolean;
}

export const LandingPagePhotoSection: React.FC<
  LandingPagePhotoSectionProps
> = ({ title, titleColor, description, image, isPictureOnLeft }) => {
  return (
    <section>
      <Flex columnGap="4" mt="32" flexDir={["column", "column", "row"]}>
        <Box flex="1">
          <Heading
            color={titleColor}
            fontWeight="800"
            fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]}
            lineHeight={["28px", "32px", "40px", "40px", "40px"]}
            as="h3"
          >
            {title}
          </Heading>
          <Text mt="4" fontSize="lg" color="gray.700">
            {description}
          </Text>
        </Box>
        <Box
          bg="blue"
          width={["100%", "100%", "70%"]}
          h="400"
          mt={["10", "10", "0"]}
          flex={["unset", "unset", "2"]}
        ></Box>
      </Flex>
    </section>
  );
};
