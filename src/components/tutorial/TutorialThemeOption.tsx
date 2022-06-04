import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface TutorialThemeOptionProps extends BoxProps {
  selected: boolean;
  themeName: string;
}

export const TutorialThemeOption: React.FC<TutorialThemeOptionProps> = ({
  selected,
  themeName,
  ...props
}) => {
  return (
    <Box
      outline={selected ? "3px solid orange" : undefined}
      height="280px"
      borderRadius="12"
      transition="all .4s"
      _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
      _focus={{ transform: "scale(1.02)" }}
      overflow="hidden"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      shadow={"md"}
      position="relative"
      {...props}
    >
      <Image
        src={`/${themeName}.png`}
        alt={`Preview of ${themeName}`}
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
};
