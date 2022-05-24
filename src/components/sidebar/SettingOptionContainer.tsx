import { ColorPicker } from "@/components/sidebar/ColorPicker";
import { SubRedditPicker } from "@/components/sidebar/SubRedditPicker";
import { Option, TileId, TileType } from "@/types";
import { AccordionPanel, Box, Text } from "@chakra-ui/react";
import React from "react";
import { BorderSelect } from "@/components/sidebar/BorderSelect";
import { CityInput } from "@/components/sidebar/CityInput";
import { DropShadowSelect } from "@/components/sidebar/DropShadowSelect";
import { SmallStockInput } from "@/components/sidebar/SmallStockInput";
import { TypePicker } from "@/components/sidebar/TypePicker";

interface SettingOptionContainerProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
  value: any;
  tileType: TileType;
}

export const SettingOptionContainer: React.FC<SettingOptionContainerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  resetOptionToDefault,
  tileType,
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
      if (tileType === "Reddit Feed") {
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
      }
      break;
    case "SmallTileTypePicker":
      optionToDisplay = (
        <TypePicker
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
          sizeOfTileForTypes={option.optionType}
        />
      );
      break;
    case "MediumTileTypePicker":
      optionToDisplay = (
        <TypePicker
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
          sizeOfTileForTypes={option.optionType}
        />
      );
      break;
    case "LargeTileTypePicker":
      optionToDisplay = (
        <TypePicker
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
          sizeOfTileForTypes={option.optionType}
        />
      );
      break;
    case "DropShadowInput":
      optionToDisplay = (
        <DropShadowSelect
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
        />
      );
      break;
    case "CityInput":
      if (tileType === "Weather") {
        optionToDisplay = (
          <CityInput
            option={option}
            changeSetting={changeSetting}
            textColor={textColor}
            subTextColor={subTextColor}
            value={value}
            resetOptionToDefault={resetOptionToDefault}
          />
        );
      }
      break;
    case "SmallStockInput":
      if (tileType === "Small Stock Tile") {
        optionToDisplay = (
          <SmallStockInput
            option={option}
            changeSetting={changeSetting}
            textColor={textColor}
            subTextColor={subTextColor}
            value={value}
            resetOptionToDefault={resetOptionToDefault}
          />
        );
      }
      break;
    case "BorderSelect":
      optionToDisplay = (
        <BorderSelect
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
  return optionToDisplay ? (
    <AccordionPanel p="2">
      {optionToDisplay}
      <Box mt="6" />
      <hr />{" "}
    </AccordionPanel>
  ) : null;
};

export default React.memo(SettingOptionContainer);
