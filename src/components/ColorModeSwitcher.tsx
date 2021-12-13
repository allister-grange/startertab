import {
  MoonIcon, SunIcon
} from "@chakra-ui/icons";
import {
  IconButton,
  IconButtonProps, useColorMode,
  useColorModeValue
} from "@chakra-ui/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const borderColor = useColorModeValue("purple.600", "purple.200");
  const backgroundColor = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("purple.600", "purple.200");

  return (
    <IconButton
      size="md"
      fontSize="lg"
      color={color}
      borderWidth="1px"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      position={"fixed"}
      top="5"
      right="5"
      {...props}
    />
  );
};

export default ColorModeSwitcher;
