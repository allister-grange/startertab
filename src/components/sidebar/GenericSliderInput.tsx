import React, { useEffect, useState } from "react";
import {
  Box,
  BoxProps,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { Option, TileSettings } from "@/types";

interface GenericSliderInputProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: number;
  tileId: number;
  min: number;
  max: number;
  changeSetting: (
    key: keyof TileSettings,
    value: number,
    tileId: number
  ) => void;
}

export const GenericSliderInput: React.FC<GenericSliderInputProps> = ({
  option,
  textColor,
  subTextColor,
  tileId,
  min,
  max,
  changeSetting,
  value,
  ...rest
}) => {
  const { title, subTitle, localStorageId } = option;
  const [sliderValue, setSliderValue] = useState(value ?? 0);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  useEffect(() => {
    if (value === sliderValue) {
      return;
    }
    const timeoutIdentifier = setTimeout(() => {
      changeSetting(
        option.localStorageId as keyof TileSettings,
        sliderValue,
        tileId
      );
    }, 500);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [changeSetting, sliderValue, option.localStorageId, tileId, value]);

  return (
    <Box key={localStorageId} my="2" {...rest}>
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
      </Text>
      <Box mt="1" mb="1">
        <Text fontSize="sm">{sliderValue}px</Text>
        <Slider
          id={localStorageId}
          defaultValue={sliderValue}
          min={min}
          max={max}
          colorScheme="teal"
          onChange={(val) => setSliderValue(val)}
        >
          <SliderTrack>
            <SliderFilledTrack bg="blue.200" />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="4" />
        </Slider>
      </Box>
    </Box>
  );
};
