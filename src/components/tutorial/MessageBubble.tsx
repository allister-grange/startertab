import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export const MessageBubble: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      fontSize="30px"
      color="black"
      background="rgba(240,240,240,.6)"
      outline="4px solid #B0AED0"
      width="500px"
      borderRadius="20px"
      p="4"
      zIndex="3"
      {...props}
    >
      {children}
    </Box>
  );
};
