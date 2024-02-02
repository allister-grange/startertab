import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export const OutlinedButton: React.FC<ButtonProps> = ({
  borderColor,
  children,
  ...props
}) => {
  return (
    <Button
      background="transparent"
      shadow="sm"
      border={`2px solid ${borderColor}`}
      color="inherit"
      transition="all .2s"
      _hover={{
        transform: "translateY(-2px)",
        cursor: "pointer",
      }}
      overflow="hidden"
      _focus={{
        border: `2px solid ${borderColor}`,
        transform: "translateY(-2px)",
        borderWidth: props.borderWidth,
      }}
      _active={{
        transform: "translateY(-1px)",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
