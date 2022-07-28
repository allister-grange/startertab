import { Box, Center, Flex, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onChange: (newColor: string) => void;
  title: string;
}

const Picker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <Stack
      shadow="md"
      background="white"
      p="6"
      borderRadius="10px"
      width="300px"
      spacing="2"
      mt="415px"
      zIndex={999}
      pos="relative"
    >
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
          backgroundColor={value}
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
  title,
}) => {
  const [showingPicker, setShowingPicker] = useState(false);

  return (
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
        backgroundColor={value}
        transition="all .2s"
        _hover={{ transform: "scale(1.1)" }}
        pos="absolute"
        onClick={() => {
          setShowingPicker((showingPicker) => !showingPicker);
        }}
      />
      {showingPicker && (
        <Picker value={value} onChange={onChange} title={title} />
      )}
    </Center>
  );
};
