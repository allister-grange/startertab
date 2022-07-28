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
      mt="430px"
      zIndex={999}
    >
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

  console.log(showingPicker);

  return (
    <Center
      height="9.2rem"
      width="9.2rem"
      borderRadius="50%"
      outline="1px solid rgba(0,0,0, .1)"
      _hover={{ cursor: "pointer" }}
      mt="4"
      onClick={() => {
        console.log("helloo");
        setShowingPicker((showingPicker) => true);
      }}
    >
      <Box
        height="8rem"
        width="8rem"
        borderRadius="50%"
        backgroundColor={value}
        transition="all .2s"
        _hover={{ transform: "scale(1.1)" }}

        // onMouseLeave={() => setShowingPicker(false)}
      />
      {showingPicker && (
        <Picker value={value} onChange={onChange} title={title} />
      )}
    </Center>
  );
};
