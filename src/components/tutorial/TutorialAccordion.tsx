import { SettingsContext } from "@/context/UserSettingsContext";
import {
  getThemeNames,
  sortOptionsIntoTileGroups,
} from "@/helpers/settingsHelpers";
import { sideBarOptions } from "@/helpers/sideBarOptions";
import {
  ThemeSettings,
  TileId,
  TileType,
  UserSettings,
  UserSettingsContextInterface,
} from "@/types";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  BoxProps,
  Select,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import SettingOptionContainer from "../sidebar/SettingOptionContainer";
import { ThemeToChangeSelector } from "../sidebar/ThemeToChangeSelector";
import { TypePicker } from "../sidebar/TypePicker";
import { Option } from "@/types";

interface TutorialAccordionProps extends BoxProps {
  setTutorialTileType: React.Dispatch<
    React.SetStateAction<TileType>
  >;
  tutorialTileType: string;
}

export const TutorialAccordion: React.FC<TutorialAccordionProps> = ({
  setTutorialTileType,
  tutorialTileType,
  ...props
}) => {
  const sortedOptions = sortOptionsIntoTileGroups(sideBarOptions);
  const { settings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;

  const options: Option[] = [
    {
      title: "Type of tile",
      subTitle: "Choose what you want this tile to display",
      localStorageId: "tileType",
      optionType: "MediumTileTypePicker",
      tileId: "tile1",
    },
  ];

  return (
    <Box
      {...props}
      // style={isOpen ? openStyle : closedStyle}
      // className={styles.disableScrollbars}
    >
      <Box
        // textColor={textColor}
        // backgroundColor={backgroundColor}
        // onSaveHandler={onSaveHandler}
        // onExitHandler={onExitHandler}
        borderBottom={"1px solid black"}
        textAlign="center"
        p="3"
      >
        Preferences
      </Box>
      <Box p="3">
        <ThemeToChangeSelector
          textColor={"#202020"}
          themes={getThemeNames(settings)}
        />
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          // onChange={onAccordionChange}
          // index={accordionIndex}
        >
          <AccordionItem>
            <AccordionButton _expanded={{ backdropFilter: "brightness(0.90)" }}>
              <Box flex="1" textAlign="left">
                Tile Settings
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <SettingOptionContainer
              key={options[0].localStorageId}
              option={options[0]}
              tileType={"None"}
              changeSetting={(key: string, value: string, tileId: TileId) => {
                setTutorialTileType(value as TileType);
              }}
              textColor={"black"}
              subTextColor={"#303030"}
              resetOptionToDefault={(option: Option) => {}}
              value={tutorialTileType}
            />
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
