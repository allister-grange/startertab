import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonProps, Flex } from "@chakra-ui/react";
import React from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

interface SidebarThemePickerProps extends ButtonProps {
  isSelected: boolean;
}

export const SidebarThemePicker: React.FC<SidebarThemePickerProps> = ({
  isSelected,
  children,
  ...props
}) => {
  return (
    <OutlinedButton
      width="230px"
      height="140px"
      borderRadius="15px"
      border={isSelected ? "3px var(--chakra-colors-purple-500) solid" : "none"}
      p="2"
      pos="relative"
      {...props}
    >
      {isSelected ? (
        <Flex
          background="var(--chakra-colors-purple-500)"
          width="32px"
          height="32px"
          pos="absolute"
          borderRadius="50%"
          top="-3"
          right="-4"
          zIndex={999}
          alignItems="center"
          justifyContent="center"
        >
          <CheckIcon fontSize="17px" color="white" />
        </Flex>
      ) : null}

      <Box width="280px" height="160px" pos="relative">
        {children}
      </Box>
    </OutlinedButton>
  );
};
