import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "../ui/BackArrow";

export const TutorialStage2: React.FC = ({}) => {
  return (
    <Fade in={true}>
      <Box
        fontSize={"34px"}
        color="black"
        background="rgba(240,240,240,.9)"
        pos="absolute"
        bottom="110px"
        width="500px"
        left="8rem"
        borderRadius="20px"
        p="4"
        zIndex="9999"
      >
        Click the settings toggle at any time to change things up ⚙️
      </Box>
      <Box
        pos="absolute"
        bottom="35px"
        left="90px"
        height="5rem"
        width="3rem"
        transform={"rotate(320deg)"}
        color="coral"
        zIndex="9999"
      >
        <BackArrow />
      </Box>
    </Fade>
  );
};
