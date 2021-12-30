import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
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
  // const borderColor = useColorModeValue("purple.600", "purple.200");
  const backgroundColor = useColorModeValue("white", "gray.700");
  // const color = useColorModeValue("purple.600", "purple.200");

  return (
    <Center height="100%">
      <IconButton
        size="3xl"
        fontSize="50px"
        _hover={{background: "transparent"}}
        _focus={{border: "0px"}}
        _active={{background: "transparent"}}
        color="#222834"
        backgroundColor={"transparent"}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </Center>
  );
};

export default ColorModeSwitcher;
