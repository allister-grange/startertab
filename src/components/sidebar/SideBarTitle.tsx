import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface SideBarTitleProps {
  textColor: string;
  onSaveHandler: () => void;
  onExitHandler: () => void;
  backgroundColor: string;
  tutorialProgress: number;
}

export const SideBarTitle: React.FC<SideBarTitleProps> = ({
  textColor,
  onSaveHandler,
  onExitHandler,
  backgroundColor,
  tutorialProgress,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      bgColor={backgroundColor}
      py="3"
      borderBottom={`1px solid ${textColor}`}
    >
      <OutlinedButton
        onClick={onExitHandler}
        background="transparent"
        border={`1px solid ${textColor}`}
        color={textColor}
        disabled={tutorialProgress > 1 && tutorialProgress < 4}
      >
        <CloseIcon fontSize="xs" />
      </OutlinedButton>
      <Text color={textColor}>Preferences</Text>
      <OutlinedButton
        onClick={onSaveHandler}
        background="transparent"
        border={`1px solid ${textColor}`}
        color={textColor}
      >
        Save
      </OutlinedButton>
    </Box>
  );
};
