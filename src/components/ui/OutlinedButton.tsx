import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface OutlinedButtonProps extends ButtonProps {
  borderColor: string;
}

export const OutlinedButton: React.FC<ButtonProps> = ({
  borderColor,
  children,
  ...props
}) => {
  return (
    <Button
      background="transparent"
      shadow="md"
      border={`2px solid ${borderColor}`}
      transition="all .2s"
      _hover={{
        transform: "translateY(-2px)",
      }}
      _focus={{
        border: `2px solid ${borderColor}`,
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