import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "@/components/ui/BackArrow";
import { MessageBubble } from "@/components/tutorial/MessageBubble";

export const TutorialStage2: React.FC = ({}) => {
  return (
    <Fade in={true}>
      <MessageBubble pos="absolute" bottom="110px" left="8rem">
        <p>Click the settings toggle at any time to change things up ⚙️</p>
      </MessageBubble>
      <Box
        pos="absolute"
        bottom="35px"
        left="90px"
        height="5rem"
        width="3rem"
        transform={"rotate(320deg)"}
        zIndex="2"
      >
        <BackArrow />
      </Box>
    </Fade>
  );
};
