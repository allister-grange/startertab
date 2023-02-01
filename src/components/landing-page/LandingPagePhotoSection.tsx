import { Flex, Heading, Box, Text, Image } from "@chakra-ui/react";
import React from "react";

interface LandingPagePhotoSectionProps {
  title: string;
  titleColor: string;
  description: string;
  subText?: string;
  button?: JSX.Element;
  logos?: JSX.Element;
}

export const LandingPagePhotoSection: React.FC<
  LandingPagePhotoSectionProps
> = ({ title, titleColor, description, subText, button, logos }) => {
  return (
    <section>
      <Box width="80%" mx="auto">
        <Flex
          columnGap="4"
          mt="8"
          bg="white"
          p="6"
          py="16"
          borderRadius="16px"
          flexDir={["column", "column", "column", "row", "row"]}
          ml={["0", "0", "0", "-50px", "-50px"]}
          maxW="100%"
        >
          <Flex
            flex="1"
            textAlign={["center", "center", "center", "unset", "unset"]}
            flexDir="column"
          >
            <Heading
              color={titleColor}
              fontWeight="800"
              fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]}
              lineHeight={["28px", "32px", "40px", "40px", "40px"]}
              as="h3"
              minW="350px"
            >
              {title}
            </Heading>
            <Text mt="8" fontSize="lg" color="gray.600" mb={logos && "auto"}>
              {description}
            </Text>
            {button}
            {logos}
          </Flex>
          <Box ml={["0", "0", "0", "80px", "80px"]}>
            <Image
              boxShadow="xl"
              maxW="800px"
              src="/black.jpg"
              width={["100%", "100%", "100%", "120%"]}
              borderRadius="16px"
              alt="Screenshot of Starter Tab"
              marginX={["auto", "auto", "auto", "0", "0"]}
              mt={["10", "10", "10", "0", "0"]}
            />
          </Box>
        </Flex>
      </Box>
    </section>
  );
};
