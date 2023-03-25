import { ColorPicker } from "@/components/sidebar/ColorPicker";
import { GenericInput } from "@/components/sidebar/GenericInput";
import { GenericSelect } from "@/components/sidebar/GenericSelect";
import { TileTypePicker } from "@/components/sidebar/TileTypePicker";
import { Option, TileSettings, TileType } from "@/types";
import { AccordionPanel, Box, Text } from "@chakra-ui/react";
import React from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

interface SettingOptionContainerProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  tileId: number;
  changeSetting: (
    key: keyof TileSettings,
    value: string,
    tileId: number
  ) => void;
  value: any;
  tileType: TileType;
  randomizeAllColorValues: () => void;
}

const optionsStyles = {
  color: "white",
  background: "var(--chakra-colors-gray-600)",
};

const SettingOptionContainer: React.FC<SettingOptionContainerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  randomizeAllColorValues,
  tileType,
  tileId,
  value,
}) => {
  let optionToDisplay;

  switch (option.optionType) {
    case "RandomizeColors":
      optionToDisplay = (
        <OutlinedButton
          mx="auto"
          mt="2"
          display="block"
          onClick={randomizeAllColorValues}
          background="transparent"
          border={`1px solid ${textColor}`}
        >
          <Text fontSize="sm" color={textColor}>
            Randomize colors
          </Text>
        </OutlinedButton>
      );
      break;
    case "ColorPicker":
      if (tileType !== "Bonsai" && option.localStorageId.includes("bonsai")) {
        break;
      }
      optionToDisplay = (
        <ColorPicker
          option={option}
          tileId={tileId}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
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
            tileId={tileId}
            subTextColor={subTextColor}
            value={value}
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
          tileId={tileId}
        />
      );
      break;
    case "SmallTileTypePicker":
    case "MediumTileTypePicker":
    case "LargeTileTypePicker":
    case "LongTileTypePicker":
      optionToDisplay = (
        <TileTypePicker
          option={option}
          changeSetting={changeSetting}
          tileId={tileId}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          sizeOfTileForTypes={option.optionType}
        />
      );
      break;
    case "DropShadowInput":
      optionToDisplay = (
        <GenericSelect
          option={option}
          tileId={tileId}
          changeSetting={changeSetting}
          textColor={textColor}
          subTextColor={subTextColor}
          value={value}
          options={
            <>
              <option value="" style={optionsStyles}>
                No shadow
              </option>
              <option value="2px 2px 6px rgba(0,0,0,.3)" style={optionsStyles}>
                Small blurred shadow
              </option>
              <option value="3px 3px 10px rgba(0,0,0,.3)" style={optionsStyles}>
                Medium blurred shadow
              </option>
              <option value="4px 4px 10px rgba(0,0,0,.3)" style={optionsStyles}>
                Large blurred shadow
              </option>
              <option value="4px 4px 0 rgba(0,0,0,.3)" style={optionsStyles}>
                Small block shadow
              </option>
              <option value="6px 6px 0 rgba(0,0,0,.3)" style={optionsStyles}>
                Medium block shadow
              </option>
              <option value="8px 8px 0 rgba(0,0,0,.3)" style={optionsStyles}>
                Large block shadow
              </option>
            </>
          }
        />
      );
      break;
    case "CityInputForWeather":
      if (
        tileType === "Small Weather Tile" ||
        tileType === "Large Weather Tile"
      ) {
        optionToDisplay = (
          <GenericInput
            option={option}
            changeSetting={changeSetting}
            textColor={textColor}
            tileId={tileId}
            subTextColor={subTextColor}
            value={value}
          />
        );
      }
      break;
    case "CityInputForUV":
      if (tileType === "UV Graph") {
        optionToDisplay = (
          <GenericInput
            option={option}
            changeSetting={changeSetting}
            textColor={textColor}
            tileId={tileId}
            subTextColor={subTextColor}
            value={value}
          />
        );
      }
      break;
    case "TitleForFavorites":
      if (tileType === "Favorite Links Tile") {
        optionToDisplay = (
          <GenericInput
            option={option}
            changeSetting={changeSetting}
            textColor={textColor}
            tileId={tileId}
            subTextColor={subTextColor}
            value={value}
          />
        );
      }
      break;
    case "TitleForRSSFeed":
      if (tileType === "RSS Feed Tile") {
        optionToDisplay = (
          <GenericInput
            option={option}
            changeSetting={changeSetting}
            textColor={textColor}
            tileId={tileId}
            subTextColor={subTextColor}
            value={value}
          />
        );
      }
      break;
    case "HackerNewsFeedType":
      if (tileType === "Hacker News Feed") {
        optionToDisplay = (
          <GenericSelect
            option={option}
            tileId={tileId}
            changeSetting={changeSetting}
            textColor={textColor}
            subTextColor={subTextColor}
            value={value}
            options={
              <>
                <option style={optionsStyles} value="Top">
                  Top Stories
                </option>
                <option style={optionsStyles} value="Show">
                  Show Stories
                </option>
                <option style={optionsStyles} value="Ask">
                  Ask Stories
                </option>
              </>
            }
          />
        );
      }
      break;
    case "SpotifyTopArtistsTimeLength":
      if (tileType === "Spotify Top Artist Tile") {
        optionToDisplay = (
          <GenericSelect
            option={option}
            tileId={tileId}
            changeSetting={changeSetting}
            textColor={textColor}
            subTextColor={subTextColor}
            value={value}
            options={
              <>
                <option style={optionsStyles} value="short_term">
                  Short Term
                </option>
                <option style={optionsStyles} value="medium_term">
                  Medium Term
                </option>
                <option style={optionsStyles} value="long_term">
                  Long Term
                </option>
              </>
            }
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
            tileId={tileId}
            subTextColor={subTextColor}
            value={value}
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
          tileId={tileId}
          value={value}
          options={
            <>
              <option style={optionsStyles} value="">
                No border
              </option>
              <option style={optionsStyles} value="1px solid black">
                Small border
              </option>
              <option style={optionsStyles} value="2px solid black">
                Medium border
              </option>
              <option style={optionsStyles} value="3px solid black">
                Large border
              </option>
            </>
          }
        />
      );
      break;
    default:
      optionToDisplay = <Text>No option built for this type of tile yet</Text>;
  }
  return optionToDisplay ? (
    <Box p="2" color={textColor}>
      {optionToDisplay}
      <Box mt="6" />
      <hr />
    </Box>
  ) : null;
};

export default React.memo(SettingOptionContainer);
