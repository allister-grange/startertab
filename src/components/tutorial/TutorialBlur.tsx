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
      <Center width={"90%"} height="70%" display="flex" flexDir="column">
        <header>
          <Fade in={tutorialProgress === 0}>
            <Heading fontSize={"120px"} color="white" mt="2.5rem">
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
          </Fade>
        </header>
      </Center>
    </Box>
  );
};
