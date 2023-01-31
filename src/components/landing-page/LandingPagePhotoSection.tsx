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
      <Flex
        columnGap="4"
        mt="8"
        width="80%"
        mx="auto"
        bg="white"
        p="6"
        py="16"
        borderRadius="16px"
        flexDir={["column", "column", "column", "row", "row"]}
      >
        <Flex
          flex="1"
          // maxH="350px"
          textAlign={["center", "center", "center", "unset", "unset"]}
          flexDir="column"
        >
          <Heading
            color={titleColor}
            fontWeight="800"
            fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]}
            lineHeight={["28px", "32px", "40px", "40px", "40px"]}
            as="h3"
          >
            {title}
          </Heading>
          <Text mt="8" fontSize="lg" color="gray.600" mb={logos && "auto"}>
            {description}
          </Text>
          {button}
          {logos}
        </Flex>
        <Image
          src="/black.jpg"
          maxW="600px"
          width="140%"
          borderRadius="16px"
          alt="Screenshot of Starter Tab"
          marginX={["auto", "auto", "auto", "0", "0"]}
          mt={["10", "10", "10", "0", "0"]}
        />
      </Flex>
    </section>
  );
};
