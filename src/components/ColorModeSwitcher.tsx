import {
  Button,
  Center,
  Heading,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const color = useColorModeValue("white", "#222222");

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
