import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "../ui/BackArrow";

export const TutorialStage3: React.FC = ({}) => {
  return (
    <>
      {/* BACKGROUND */}
      <Box
        height="100vh"
        width="calc(100vw - 340px)"
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
        transition="width 0.44s ease-in-out"
      />
      <Box
        width="320px"
        height="80px"
        backdropFilter="blur(4.5px)"
        position="fixed"
        top="250px"
        left="0"
        zIndex="9999"
        transition="width 0.44s ease-in-out"
      />
      <Box
        width="320px"
        height="100vh"
        backdropFilter="blur(4.5px)"
        position="fixed"
        top="390px"
        left="0"
        zIndex="9999"
        transition="width 0.44s ease-in-out"
      />
      <Fade in={true}>
        <Box
          fontSize={"24px"}
          color="black"
          background="rgba(240,240,240,.9)"
          pos="absolute"
          left="430px"
          top="315px"
          borderRadius="20px"
          p="4"
          width="520px"
          zIndex="9999"
        >
          Click on a dropdown to personalise your Start Page
        </Box>
        <Box
          fontSize={"24px"}
          color="black"
          background="rgba(240,240,240,.9)"
          pos="absolute"
          left="430px"
          top="430px"
          width="520px"
          borderRadius="20px"
          p="4"
          zIndex="9999"
        >
          You should now be good to go! If you want this page to act as your
          &apos;New Tab&apos; page you&apos;ll need an extension like{" "}
          <a
            href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
            style={{ textDecoration: "underline", color: "coral" }}
          >
            this one
          </a>
        </Box>
        <Box
          pos="absolute"
          left="350px"
          top="340px"
          height="70px"
          zIndex="9999"
          width="3rem"
          color="coral"
        >
          <BackArrow />
        </Box>
      </Fade>
    </>
  );
};
