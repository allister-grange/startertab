import { TileId } from "@/types";
import { Box, BoxProps, Flex, useColorMode } from "@chakra-ui/react";
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
          bg="linear-gradient(90deg, white 50%, #E89B4B 50%);"
          onClick={() => setColorMode("colored light")}
        />
        <ThemePickerBubble
          bg="linear-gradient(90deg, black 50%, #E89B4B 50%);"
          onClick={() => setColorMode("colored dark")}
        />
        <ThemePickerBubble bg="white" onClick={() => setColorMode("light")} />
        <ThemePickerBubble bg="black" onClick={() => setColorMode("dark")} />
      </Flex>
      <Flex mt="2">
        <ThemePickerBubble
          bg="linear-gradient(90deg, white 50%, #77C9CA 50%);"
          onClick={() => setColorMode("glassmorphism light")}
        />
        <ThemePickerBubble
          bg="linear-gradient(90deg, black 50%, #2E4C49 50%);"
          onClick={() => setColorMode("glassmorphism dark")}
        />
        <ThemePickerBubble
          bg="linear-gradient(90deg, #ABA1EE 50%, #f882ff 50%);"
          onClick={() => setColorMode("Pink")}
        />
        <ThemePickerBubble
          bg="linear-gradient(360deg, blue 50%, white 50%);"
          onClick={() => setColorMode("Wavy")}
        />
      </Flex>
    </Flex>
  );
};

export default ColorModeSwitcher;
