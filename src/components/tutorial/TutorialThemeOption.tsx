import { Box, BoxProps, Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface TutorialThemeOptionProps extends ButtonProps {
  selected: boolean;
  themeName: string;
  background: string;
  innerBackgroundColor: string;
  innerBorder: string;
}

export const TutorialThemeOption: React.FC<TutorialThemeOptionProps> = ({
  selected,
  themeName,
  background,
  innerBackgroundColor,
  innerBorder,
  ...props
}) => {
  return (
    // put perspective shift on these
    <Button
      background={background}
      outline={selected ? "4px solid #8B83FB" : undefined}
      borderRadius="12"
      transition={"background width height .3s ease-in"}
      _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
      _focus={{ border: "" }}
      _active={{ background, transform: "translateY(-2px)" }}
      overflow="hidden"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      shadow={"md"}
      position="relative"
      {...props}
    >
      <Box
        transition={"background .3s ease-in"}
        width="350px"
        height="max(400px, 70%)"
        background={innerBackgroundColor}
        borderRadius="15px"
        border={innerBorder}
      ></Box>
    </Button>
  );
};
