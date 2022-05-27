import { TileId } from "@/types";
import {
  Box,
  BoxProps, Flex,
  useColorMode
} from "@chakra-ui/react";
import React from "react";

const ThemePickerBubble = (props: BoxProps) => {
  return (
    <Box
      borderRadius="50%"
      width="5"
      height="5"
      boxShadow={"2px 2px 1px rgba(0,0,0,.15)"}
      mr="2"
      _hover={{ cursor: "pointer" }}
      {...props}
    />
  );
};

const ColorModeSwitcher: React.FC = () => {
  const { setColorMode } = useColorMode();

  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Flex mb="2">
        <ThemePickerBubble
          bg="linear-gradient(90deg, white 50%, #E89B4B 50%);te"
          onClick={() => setColorMode("light")}
        />
        <ThemePickerBubble
          bg="linear-gradient(90deg, black 50%, #E89B4B 50%);"
          onClick={() => setColorMode("dark")}
        />
        <ThemePickerBubble bg="white" onClick={() => setColorMode("white")} />
        <ThemePickerBubble bg="black" onClick={() => setColorMode("black")} />
      </Flex>
      <Flex mt="2">
        <ThemePickerBubble
          bg="linear-gradient(90deg, white 50%, #77C9CA 50%);te"
          onClick={() => setColorMode("glassmorphism light")}
        />
        <ThemePickerBubble
          bg="linear-gradient(90deg, black 50%, #2E4C49 50%);"
          onClick={() => setColorMode("glassmorphism dark")}
        />
        <ThemePickerBubble
          bg="linear-gradient(90deg, white 50%, #f882ff 50%);"
          onClick={() => setColorMode("CMYK")}
        />
      </Flex>
    </Flex>
  );
};

export default ColorModeSwitcher;
