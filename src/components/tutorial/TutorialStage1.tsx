import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

interface TutorialStage1Props {
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
  setTutorialProgress: SetterOrUpdater<number>;
}

export const TutorialStage1: React.FC<TutorialStage1Props> = ({
  setShowingTutorial,
  setTutorialProgress,
}) => {
  return (
    <Box
      transition="width 0.44s ease-in-out"
      zIndex="3"
      left="50%"
      top="40%"
      transform={"translate(-50%, -50%)"}
      pos="absolute"
    >
      <header>
        <Box display="flex" flexDir="column">
          <Heading
            alignItems="flex-start"
            fontSize={["50px", "70px", "100px", "100px", "120px"]}
            color="black"
            mt="2.5rem"
            whiteSpace="nowrap"
          >
            StarterTab ✌
          </Heading>
          <Text
            mt="-4"
            fontSize={["20px", "26px", "30px", "34px", "38px"]}
            // fontSize={"38"}
            color="gray.900"
          >
            Your &apos;New Tab&apos; page with a twist
          </Text>
          {/* <Text mt="4" fontSize={"28px"} color="gray.800" width="80%">
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
          </Text> */}
          <Box mt="20px" display="flex" alignItems="center">
            <OutlinedButton
              fontSize={["20px", "md", "lg", "xl", "xl"]}
              onClick={() => {
                setShowingTutorial(false);
                setTutorialProgress(-1);
              }}
              outlineColor="black"
              borderRadius="30"
              mr="2"
              px={["4", "4", "6"]}
            >
              Skip Tutorial
            </OutlinedButton>
            <OutlinedButton
              onClick={() => setTutorialProgress(1)}
              fontSize={["20px", "md", "md", "xl", "xl"]}
              background="white"
              borderRadius="30"
              px={["4", "4", "6"]}
              py="24px"
            >
              📚 Start Tutorial (30 sec)
            </OutlinedButton>
          </Box>
        </Box>
      </header>
    </Box>
  );
};
