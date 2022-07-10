import {
  Badge,
  Box,
  Button,
  Center,
  Fade,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TutorialBlurProps {
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
}

export const TutorialBlur: React.FC<TutorialBlurProps> = ({
  setShowingTutorial,
}) => {
  const [tutorialProgress, setTutorialProgress] = useState(0);

  return (
    <Box
      height="100vh"
      width="100vw"
      backdropFilter="blur(4.5px)"
      zIndex="9999"
      pos={"fixed"}
    >
      <Fade in={tutorialProgress === 0}>
        <header>
          <Box
            height="70%"
            display="flex"
            flexDir="column"
            width="65%"
            minWidth="min-content"
            marginX="auto"
            pl="40px"
            mt="10%"
          >
            <Heading
              alignItems="flex-start"
              fontSize={"120px"}
              color="white"
              mt="2.5rem"
            >
              Start Page ✌
            </Heading>
            <Text mt="2" fontSize={"28px"} color="#dee0e5">
              Your &apos;New Tab&apos; page with a twist
            </Text>
            <Box alignItems="flex-start" mt="35px">
              <Button
                alignSelf="flex-start"
                _hover={{ cursor: "pointer", transform: "translateY(-2px)" }}
                _active={{ cursor: "pointer", transform: "translateY(-2px)" }}
                transition="all .2s"
                fontSize="xl"
                colorScheme="purple"
                onClick={() => setShowingTutorial(false)}
              >
                Skip Tutorial
              </Button>
              <Button
                ml="20px"
                _hover={{ cursor: "pointer", transform: "translateY(-2px)" }}
                _active={{ cursor: "pointer", transform: "translateY(-2px)" }}
                transition="all .2s"
                onClick={() => setTutorialProgress(1)}
                fontSize="xl"
                colorScheme="green"
                mr="2"
              >
                Start Tutorial
              </Button>
            </Box>
          </Box>
        </header>
      </Fade>
      <Fade in={tutorialProgress === 1}>
        <Box
          fontSize={"34px"}
          color="black"
          background="rgba(240,240,240,.9)"
          pos="absolute"
          bottom="7rem"
          width="30rem"
          left="7rem"
          borderRadius="20px"
          p="4"
        >
          Click the settings toggle at any time to change things up ⚙️
        </Box>
      </Fade>
    </Box>
  );
};
