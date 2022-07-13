import { Box, Heading, Button, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface TutorialStage1Props {
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
  setTutorialProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const TutorialStage1: React.FC<TutorialStage1Props> = ({
  setShowingTutorial,
  setTutorialProgress,
}) => {
  return (
    <Box
      height="100vh"
      width="100vw"
      transition="width 0.44s ease-in-out"
      backdropFilter="blur(4.5px)"
      zIndex="9999"
      right="0"
      top="0"
      pos="fixed"
    >
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
    </Box>
  );
};
