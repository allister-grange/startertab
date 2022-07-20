import React from "react";
import { Box, BoxProps, Button } from "@chakra-ui/react";
import { CogIcon } from "@/components/icons/CogIcon";

interface SettingsToggleProps extends BoxProps {
  onOpen: () => void;
  color: string;
}

export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  onOpen,
  color,
  ...props
}) => {
  return (
    <Box
      pos="fixed"
      left={"3"}
      bottom={"5"}
      _hover={{ color: "orange" }}
      {...props}
    >
      <Button
        bg="transparent"
        transition="all .3s"
        _hover={{ bg: "transparent", transform: "scale(1.05)" }}
        onClick={onOpen}
        color={color}
        _active={{ bg: "transparent" }}
        _focus={{ border: "none" }}
        aria-label="Toggle sidebar"
      >
        <CogIcon width={30} height={50} />
      </Button>
    </Box>
  );
};
