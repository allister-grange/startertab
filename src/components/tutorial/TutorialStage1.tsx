import { Box, Heading, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

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
      zIndex="3"
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
            color="black"
            mt="2.5rem"
          >
            Starter Tab ✌
          </Heading>
          <Text mt="2" fontSize={"28px"} color="gray.900">
            Your &apos;New Tab&apos; page with a twist
          </Text>
          <Text mt="4" fontSize={"21px"} color="gray.800" width="80%">
            Heads up, this website does not store any of your personal data
            outside of your own browser, you own everything. If you&apos;d like
            to see the code,{" "}
            <a
              href="https://github.com/allister-grange/startertab"
              style={{ textDecoration: "underline" }}
            >
              take a peek
            </a>
            .
          </Text>
          <Box alignItems="flex-start" mt="35px">
            <OutlinedButton
              alignSelf="flex-start"
              fontSize="xl"
              borderColor="tomato"
              onClick={() => {
                setShowingTutorial(false);
                setTutorialProgress(-1);
              }}
              background="white"
            >
              Skip Tutorial
            </OutlinedButton>
            <OutlinedButton
              ml="20px"
              onClick={() => setTutorialProgress(1)}
              fontSize="xl"
              borderColor="lightgreen"
              mr="2"
              background="white"
            >
              Start Tutorial
            </OutlinedButton>
          </Box>
        </Box>
      </header>
    </Box>
  );
};
