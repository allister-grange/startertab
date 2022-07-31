import { NumberedBubble } from "@/components/ui/NumberedBubble";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface SettingTitleProps {
  displayNumber: number;
  title: string;
}

export const SettingTitle: React.FC<SettingTitleProps> = ({
  displayNumber,
  title,
}) => {
  return (
    <Flex>
      <NumberedBubble displayNumber={displayNumber} />
      <Text
        ml="2"
        fontSize="sm"
        color="black"
        fontWeight="700"
        letterSpacing="-1px"
      >
        {title.toUpperCase()}
      </Text>
    </Flex>
  );
};
