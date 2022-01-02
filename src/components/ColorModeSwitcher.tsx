import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const color = useColorModeValue("white", "#222222");

  return (
    <Center height="100%">
      <Button
        fontSize="xl"
        _hover={{ background: "transparent" }}
        _focus={{ border: "0px" }}
        _active={{ background: "transparent" }}
        backgroundColor={"transparent"}
        onClick={toggleColorMode}
        color={color}
      >
        make me {text}
      </Button>
    </Center>
  );
};

export default ColorModeSwitcher;
