import { ColorPicker } from "@/components/sidebar/ColorPicker";
import { SubRedditPicker } from "@/components/sidebar/SubRedditPicker";
import { Option, TileId } from "@/types";
import { Text } from "@chakra-ui/react";
import React from "react";
import { TypePicker } from "./TypePicker";

interface SettingOptionContainerProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
  value: string;
}

export const SettingOptionContainer: React.FC<SettingOptionContainerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  resetOptionToDefault,
  value,
}) => {
  let optionToDisplay;

  switch (option.optionType) {
    case "ColorPicker":
      optionToDisplay = (
        <ColorPicker
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
        />
      );
      break;
    case "SubRedditPicker":
      optionToDisplay = (
        <SubRedditPicker
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
        />
      );
      break;
    case "TypePicker":
      optionToDisplay = (
        <TypePicker
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
        />
      );
      break;
    default:
      optionToDisplay = <Text>No option built for this type of tile yet</Text>;
  }
  return optionToDisplay;
};
