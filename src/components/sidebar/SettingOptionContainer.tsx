import { ColorPicker } from "@/components/sidebar/ColorPicker";
import { Option, TileId, TileType } from "@/types";
import { AccordionPanel, Box, Text } from "@chakra-ui/react";
import React from "react";
import { TypePicker } from "@/components/sidebar/TypePicker";
import { GenericSelect } from "@/components/sidebar/GenericSelect";
import { GenericInput } from "@/components/sidebar/GenericInput";

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
      if (tileType !== "Bonsai" && option.localStorageId.includes("bonsai")) {
        break;
      }
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
          <GenericInput
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
    case "BorderRadiusInput":
    case "GridGapInput":
      optionToDisplay = (
        <GenericInput
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
        />
      );
      break;
    case "SmallTileTypePicker":
    case "MediumTileTypePicker":
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
        <GenericSelect
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
          options={
            <>
              <option value="">No shadow</option>
              <option value="2px 2px 6px rgba(0,0,0,.3)">
                Small blurred shadow
              </option>
              <option value="3px 3px 10px rgba(0,0,0,.3)">
                Medium blurred shadow
              </option>
              <option value="4px 4px 10px rgba(0,0,0,.3)">
                Large blurred shadow
              </option>
              <option value="4px 4px 0 rgba(0,0,0,.3)">
                Small block shadow
              </option>
              <option value="6px 6px 0 rgba(0,0,0,.3)">
                Medium block shadow
              </option>
              <option value="8px 8px 0 rgba(0,0,0,.3)">
                Large block shadow
              </option>
            </>
          }
        />
      );
      break;
    case "CityInput":
      if (tileType === "Weather" || tileType === "UV Graph") {
        
        optionToDisplay = (
          <GenericInput
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
          <GenericInput
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
        <GenericSelect
          option={option}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          resetOptionToDefault={resetOptionToDefault}
          options={
            <>
              <option value="">No border</option>
              <option value="1px solid black">Small border</option>
              <option value="2px solid black">Medium border</option>
              <option value="3px solid black">Large border</option>
            </>
          }
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
