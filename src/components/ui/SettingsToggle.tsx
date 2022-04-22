import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { CogIcon } from "@/components/icons/CogIcon";

interface SettingsToggleProps {
  onOpen: () => void;
}

export const SettingsToggle: React.FC<SettingsToggleProps> = ({ onOpen }) => {
  return (
    <Box pos="fixed" left="5" bottom="5" _hover={{ color: "orange" }}>
      <Button bg="transparent" _hover={{ bg: "transparent" }} onClick={onOpen}>
        <CogIcon width={30} height={50} />
      </Button>
    </Box>
  );
};
