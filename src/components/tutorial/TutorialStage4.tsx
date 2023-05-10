import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "@/components/icons/BackArrow";
import { MessageBubble } from "@/components/tutorial/MessageBubble";

export const TutorialStage4: React.FC = ({}) => {
  return (
    <Fade in={true}>
      <MessageBubble
        fontSize="24px"
        pos="absolute"
        left="430px"
        top="480px"
        width="520px"
      >
        You&apos;re now ready to go! Click on a dropdown to personalize your
        tiles, this will end the tutorial.
      </MessageBubble>
      <MessageBubble
        fontSize="24px"
        pos="absolute"
        left="430px"
        top="270px"
        width="520px"
      >
        See, it&apos;s a breeze to customize the site. If you want this page to
        act as your &apos;New Tab&apos; page you&apos;ll need the{" "}
        <a
          href="https://chrome.google.com/webstore/detail/startertab/hklfanmakojdijomofibaiepoeobioni"
          style={{ textDecorationLine: "underline" }}
          target="_blank"
          rel="noreferrer"
        >
          Chrome extension
        </a>
        &nbsp;or the&nbsp;
        <a
          href="https://chrome.google.com/webstore/detail/startertab/hklfanmakojdijomofibaiepoeobioni"
          style={{ textDecorationLine: "underline" }}
          target="_blank"
          rel="noreferrer"
        >
          Firefox extension
        </a>
        .
      </MessageBubble>
      <Box
        pos="absolute"
        left="350px"
        top="380px"
        height="70px"
        zIndex="3"
        width="3rem"
      >
        <BackArrow />
      </Box>
    </Fade>
  );
};
