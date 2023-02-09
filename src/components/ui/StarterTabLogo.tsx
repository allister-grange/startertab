import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

export const StarterTabLogo: React.FC<TextProps> = ({}) => {
  return (
    <Text fontSize={["2xl", "3xl"]} fontWeight="900" color="black">
      Starter<span style={{ color: "coral" }}>Tab</span>
    </Text>
  );
};
