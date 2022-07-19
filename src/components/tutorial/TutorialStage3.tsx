import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "../ui/BackArrow";

export const TutorialStage3: React.FC = ({}) => {
  return (
    <Fade in={true}>
      <Box
        fontSize={"24px"}
        color="black"
        background="rgba(240,240,240,.9)"
        pos="absolute"
        left="430px"
        top="75px"
        borderRadius="20px"
        p="4"
        width="max-content"
        zIndex="9999"
      >
        Give changing the theme a try
      </Box>
      <Box
        pos="absolute"
        left="350px"
        top="89px"
        height="70px"
        zIndex="9999"
        width="3rem"
        color="coral"
      >
        <BackArrow />
      </Box>
    </Fade>
  );
};
