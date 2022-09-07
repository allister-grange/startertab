import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "@/components/ui/BackArrow";
import { MessageBubble } from "@/components/tutorial/MessageBubble";

export const TutorialStage3: React.FC = ({}) => {
  return (
    <Fade in={true}>
      <MessageBubble pos="absolute" left="430px" top="70px">
        Give changing the theme a try
      </MessageBubble>
      <Box
        pos="absolute"
        left="350px"
        top="89px"
        height="70px"
        zIndex="3"
        width="3rem"
      >
        <BackArrow />
      </Box>
    </Fade>
  );
};
