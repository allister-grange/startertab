import { optionsStyles } from "@/helpers/selectOptionStyles";
import { setNewThemeName } from "@/helpers/themes";
import { tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import { themeNameSelector } from "@/recoil/UserSettingsSelectors";
import { Flex, Select } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { OutlinedButton } from "../ui/OutlinedButton";

interface ThemeToChangeSelectorProps {
  themeNames: string[];
  textColor: string;
}

export const ThemeToChangeSelector: React.FC<ThemeToChangeSelectorProps> = ({
  themeNames,
  textColor,
}) => {
  const [themeName, setThemeName] = useRecoilState(themeNameSelector);
  const [settings, setSettings] = useRecoilState(userSettingState);

  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

  const onThemeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // for the tutorial, if we change the theme we want to progress the tutorial
    setTutorialProgress((prevState) => (prevState === 2 ? 3 : prevState));
    setNewThemeName(e.target.value, setThemeName, settings, setSettings);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt="3"
      pb="4"
      color={textColor}
    >
      <Select
        value={themeName}
        width="75%"
        onChange={onThemeSelectChange}
        outline={`1px solid ${textColor}`}
        _focus={{ border: `1px solid ${textColor}` }}
      >
        {themeNames.map((theme) => (
          <option key={theme} value={theme} style={optionsStyles}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </Select>
      <OutlinedButton
        mr="1"
        borderColor={textColor}
        borderWidth="1px"
        onClick={() => Router.push("/newTheme")}
        isDisabled={tutorialProgress === 2 || tutorialProgress === 3}
        paddingY="20px"
      >
        +
      </OutlinedButton>
    </Flex>
  );
};
