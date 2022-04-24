import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface SideBarTitleProps {
  textColor: string;
  onSaveHandler: () => void;
  onExitHandler: () => void;
}

export const SideBarTitle: React.FC<SideBarTitleProps> = ({
  textColor,
  onSaveHandler,
  onExitHandler
}) => {
  const backgroundColor = useColorModeValue("gray.200", "#66727a");

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      bgColor={backgroundColor}
      py="3"
    >
      <Button onClick={onExitHandler} bg="gray.400">
        Exit
      </Button>
      <Text color={textColor}>Preferences</Text>
      <Button onClick={onSaveHandler} bg="gray.400">
        Save
      </Button>
    </Box>
  );
};
