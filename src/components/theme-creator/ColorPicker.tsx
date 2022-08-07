import {
  Box,
  Center,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger as OrigPopoverTrigger,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";

const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

interface ColorPickerProps {
  value: string;
  onChange: (newColor: string) => void;
}

const Picker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <Stack>
      <Box
        backgroundColor="white"
        pos="absolute"
        left="50%"
        transform={"translateX(-50%)"}
        top="-18px"
        width="30px"
        height="18px"
        borderLeftWidth="15px"
        borderLeftColor="#F6F9F9"
        borderRightWidth="15px"
        borderRightColor="#F6F9F9"
        borderBottomWidth="15px"
        borderBottomColor="white"
        zIndex="999"
      />
      <Flex>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          width="110px"
        />
        <Box
          width="40px"
          height="40px"
          ml="4"
          background={value}
          borderRadius="5px"
        />
      </Flex>
      <HexColorPicker
        color={value}
        onChange={onChange}
        style={{
          width: "250px",
          height: "120px",
          marginTop: "10px",
          marginBottom: "5px",
        }}
      />
    </Stack>
  );
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Center
          height="9.2rem"
          width="9.2rem"
          borderRadius="50%"
          outline="1px solid rgba(0,0,0, .1)"
          _hover={{ cursor: "pointer" }}
          mt="4"
          pos="relative"
        >
          <Box
            minHeight="8rem"
            minWidth="8rem"
            borderRadius="50%"
            background={value}
            transition="all .2s"
            _hover={{ transform: "scale(1.1)" }}
            pos="absolute"
          />
        </Center>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          shadow="md"
          background="white"
          p="6"
          borderRadius="10px"
          width="300px"
          zIndex={999}
          pos="relative"
          _focus={{
            border: "none",
            outline: "none",
          }}
          mt="3"
        >
          <Picker value={value} onChange={onChange} />
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
