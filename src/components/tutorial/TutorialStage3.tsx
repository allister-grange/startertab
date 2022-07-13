import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "../ui/BackArrow";

export const TutorialStage3: React.FC = ({}) => {
  return (
    <>
      {/* BACKGROUND */}
      <Box
        height="100vh"
        width="calc(100vw - 320px)"
        transition="width 0.44s ease-in-out"
        backdropFilter="blur(4.5px)"
        zIndex="9999"
        right="0"
        top="0"
        pos="fixed"
      />
      <Box
        width="100px"
        height="60px"
        backdropFilter="blur(4.5px)"
        position="fixed"
        top="0"
        left="0"
        zIndex="9999"
      />
      <Box
        width="320px"
        height="80px"
        backdropFilter="blur(4.5px)"
        position="fixed"
        top="250px"
        left="0"
        zIndex="9999"
      />
      <Box
        width="320px"
        height="100vh"
        backdropFilter="blur(4.5px)"
        position="fixed"
        top="390px"
        left="0"
        zIndex="9999"
      />
      <Fade in={true}>
        <Box
          fontSize={"24px"}
          color="black"
          background="rgba(240,240,240,.9)"
          pos="absolute"
          left="430px"
          top="325px"
          borderRadius="20px"
          p="4"
          zIndex="9999"
        >
          Click on a tile to change it up
        </Box>
        <Box
          pos="absolute"
          left="350px"
          top="340px"
          height="5rem"
          zIndex="9999"
          width="3rem"
          color="rgba(240,240,240,.9)"
        >
          <BackArrow />
        </Box>
      </Fade>
    </>
  );
};
