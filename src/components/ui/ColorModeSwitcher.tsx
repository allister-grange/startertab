import { TileId } from "@/types";
import {
  Button,
  Center,
  Heading,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type ColorModeSwitcherProps = {
  tileId: TileId;
}

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = ({tileId}) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const color = `var(--text-color-${tileId})`;

  return (
    <Center height="100%">
      <Button
        _hover={{ background: "transparent" }}
        _focus={{ border: "0px" }}
        _active={{ background: "transparent" }}
        backgroundColor={"transparent"}
        onClick={toggleColorMode}
        color={color}
      >
        <Heading fontSize="2xl">make me {text}</Heading>
      </Button>
    </Center>
  );
};

export default ColorModeSwitcher;
