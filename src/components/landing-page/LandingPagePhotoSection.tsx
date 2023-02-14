import { Flex, Heading, Box, Text, Image } from "@chakra-ui/react";
import React from "react";

interface LandingPagePhotoSectionProps {
  title: string;
  titleColor: string;
  description: string;
  subText?: string;
  button?: JSX.Element;
  logos?: JSX.Element;
  imagePath: string;
  isVideo?: boolean;
}

export const LandingPagePhotoSection: React.FC<
  LandingPagePhotoSectionProps
> = ({
  title,
  titleColor,
  description,
  subText,
  button,
  logos,
  imagePath,
  isVideo,
}) => {
  return (
    <section>
      <Box width={["93%", "80%"]} mx="auto" maxW="1170px">
        <Flex
          columnGap="4"
          mt="8"
          bg="white"
          p="6"
          py={["10", "16"]}
          borderRadius="16px"
          flexDir={["column", "column", "column", "row", "row"]}
          ml={["0", "0", "0", "-50px", "-50px"]}
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
              lineHeight={["1.9rem", "2.5rem", "2.8rem", "2.8rem", "2.8rem"]}
              as="h3"
              minW={["0", "350px"]}
            >
              {title}
            </Heading>
            <Text
              mt={["4", "8"]}
              fontSize="lg"
              color="gray.600"
              mb={logos && "auto"}
            >
              {description}
            </Text>
            <Text
              mt={["4", "8"]}
              fontSize="lg"
              color="gray.600"
              mb={logos && "auto"}
            >
              {subText}
            </Text>
            {button}
            {logos}
          </Flex>
          <Box
            ml={["0", "0", "0", "80px", "80px"]}
            mt={["8", "10", "10", "0", "0"]}
          >
            <Box width={["100%", "100%", "100%", "120%"]}>
              {isVideo ? (
                <video
                  loop
                  autoPlay
                  playsInline
                  muted
                  poster="https://startertab.com/landing_page/AnimatedDemoPoster.png"
                  style={{
                    width: "100%",
                    overflowClipMargin: "content-box",
                    objectFit: "contain",
                    maxWidth: "800px",
                    overflow: "hidden",
                    borderRadius: "16px",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <source src={imagePath} type="video/mp4" />
                </video>
              ) : (
                <Image
                  maxW="800px"
                  src={imagePath}
                  w="100%"
                  alt="Screenshot of StarterTab"
                  marginX={["auto", "auto", "auto", "0", "0"]}
                  overflow="hidden"
                  borderRadius="16px"
                  boxShadow="xl"
                />
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </section>
  );
};
