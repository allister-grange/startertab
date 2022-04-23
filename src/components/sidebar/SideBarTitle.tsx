import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface SideBarTitleProps {
  onClose: () => void;
  textColor: string;
}

export const SideBarTitle: React.FC<SideBarTitleProps> = ({onClose, textColor}) => {
  const backgroundColor = useColorModeValue("gray.200", "#66727a");

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      bgColor={backgroundColor}
      py="3"
    >
      <Button onClick={onClose} bg="gray.400">
        Exit
      </Button>
      <Text color={textColor}>Preferences</Text>
      <Button onClick={onClose} bg="gray.400">
        Save
      </Button>
    </Box>
  );
};
