import { ThemeSettings } from "@/types";
import {
  Text,
  Box,
  BoxProps,
  Button,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";

interface TutorialThemePickerProps extends BoxProps {
  stopAnimationOfThemes: () => void;
  currentTheme: ThemeSettings;
}

export const TutorialThemePicker: React.FC<TutorialThemePickerProps> = ({
  currentTheme,
  stopAnimationOfThemes,
  ...props
}) => {
  return (
    <Box
      width="100%"
      height="100%"
      mt="-30px"
      background="white"
      borderRadius="30px"
      scrollSnapAlign="center"
      p="6"
      display="flex"
    >
      <Flex
        p="8"
        flexBasis={"40%"}
        flexDir="column"
        justifyContent={"center"}
        mb="40"
      >
        <Heading>Firstly, pick a color theme that feels right for you</Heading>
        <Text mt="6">
          This will set the initial color theme for the <i>Start Page</i>
        </Text>
        <Text mt="2">
          Don&apos;t worry, you can change the color theme any time you need to
          in the settings sidebar
        </Text>
      </Flex>
      <Center flexBasis="60%">
        <Button
          transition={"background 1s ease-in-out"}
          width="min(800px,70%)"
          height="70%"
          shadow="xl"
          onClick={stopAnimationOfThemes}
          background={currentTheme.globalSettings.backgroundColor}
          _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
          _focus={{ border: "" }}
          _active={{
            background: currentTheme.globalSettings.backgroundColor,
            transform: "translateY(-2px)",
          }}
          borderRadius="15px"
        >
          <Box
            transition={"background 1s ease-in-out"}
            background={currentTheme.tile1.backgroundColor}
            borderColor={currentTheme.globalSettings.borderColor!}
            border={currentTheme.globalSettings.tileBorder!}
            width="230px"
            height="330px"
            borderRadius="15px"
          ></Box>
        </Button>
      </Center>
    </Box>
  );
};
