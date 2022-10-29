import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

interface ResetAndRandomizeColorsProps {
  textColor: string;
  randomizeAllColorValues: () => void;
  resetAllColorsToDefault: () => void;
}

export const ResetAndRandomizeColors: React.FC<
  ResetAndRandomizeColorsProps
> = ({ resetAllColorsToDefault, randomizeAllColorValues, textColor }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mt="2"
      flexWrap="wrap"
    >
      <OutlinedButton
        display="block"
        onClick={randomizeAllColorValues}
        background="transparent"
        border={`1px solid ${textColor}`}
      >
        <Text fontSize="sm" color={textColor}>
          Randomize colors
        </Text>
      </OutlinedButton>

      <OutlinedButton
        display="block"
        onClick={resetAllColorsToDefault}
        background="transparent"
        border={`1px solid ${textColor}`}
      >
        <Text fontSize="sm" color={textColor}>
          Reset colors
        </Text>
      </OutlinedButton>
    </Flex>
  );
};
