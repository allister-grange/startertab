import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import { BackArrow } from "../ui/BackArrow";

export const TutorialStage4: React.FC = ({}) => {
  return (
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
        Click on a dropdown to personalize your tiles
      </Box>
      <Box
        fontSize={"24px"}
        color="black"
        background="rgba(240,240,240,.9)"
        pos="absolute"
        left="430px"
        top="150px"
        width="520px"
        borderRadius="20px"
        p="4"
        zIndex="9999"
      >
        You should now be good to go! If you want this page to act as your
        &apos;New Tab&apos; page you&apos;ll need an extension like{" "}
        <a
          href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
          style={{ color: "coral" }}
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
  );
};
