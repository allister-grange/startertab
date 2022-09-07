import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export const MessageBubble: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      width="500px"
      fontSize="30px"
      color="black"
      p="4"
      zIndex="5"
      textAlign="center"
      // background="white"
      outline="1px solid #cbd5e1"
      borderRadius="20px"
      position="relative"
      background="rgba(255,255,255,.8)"
      {...props}
    >
      {children}
    </Box>
  );
};
