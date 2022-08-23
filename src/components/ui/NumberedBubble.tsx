import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface NumberedBubbleProps extends TextProps {
  displayNumber: number;
}

export const NumberedBubble: React.FC<NumberedBubbleProps> = ({
  displayNumber,
  ...props
}) => {
  return (
    <Text
      borderRadius="50%"
      background="var(--chakra-colors-purple-500)"
      width="24px"
      height="24px"
      color="white"
      textAlign="center"
      {...props}
    >
      {displayNumber}
    </Text>
  );
};
