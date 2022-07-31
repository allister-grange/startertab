import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "@/components/ui/BackArrow";
import { MessageBubble } from "@/components/tutorial/MessageBubble";

export const TutorialStage4: React.FC = ({}) => {
  return (
    <Fade in={true}>
      <MessageBubble
        fontSize="24px"
        pos="absolute"
        left="430px"
        top="315px"
        width="520px"
      >
        Click on a dropdown to personalize your tiles
      </MessageBubble>
      <MessageBubble
        fontSize="24px"
        pos="absolute"
        left="430px"
        top="150px"
        width="520px"
      >
        See, it&apos;s a breeze to customize the site. If you want this page to
        act as your &apos;New Tab&apos; page you&apos;ll need an extension like{" "}
        <a
          href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
          style={{ textDecorationLine: "underline" }}
        >
          this one
        </a>
      </MessageBubble>
      <Box
        pos="absolute"
        left="350px"
        top="240px"
        height="70px"
        zIndex="9999"
        width="3rem"
        color="#B0AED0"
      >
        <BackArrow />
      </Box>
    </Fade>
  );
};
