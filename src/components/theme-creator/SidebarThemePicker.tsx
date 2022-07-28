import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonProps, Flex } from "@chakra-ui/react";
import React from "react";

interface SidebarThemePickerProps extends ButtonProps {
  isSelected: boolean;
}

export const SidebarThemePicker: React.FC<SidebarThemePickerProps> = ({
  isSelected,
  children,
  ...props
}) => {
  return (
    <Button
      width="580px"
      height="120px"
      borderRadius="15px"
      p="2"
      pos="relative"
      background="transparent"
      outline={isSelected ? "3px #B0AED0 solid" : "none"}
      _hover={{
        background: "transparent",
      }}
      _active={{
        background: "transparent",
      }}
      _focus={{
        border: "",
      }}
      {...props}
    >
      {isSelected ? (
        <Flex
          background="#B0AED0"
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

      <Box width="95%" height="160px" pos="relative">
        {children}
      </Box>
    </Button>
  );
};
