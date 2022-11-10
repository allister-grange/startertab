import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { deepClone } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { TileId, TileSettings } from "@/types";
import { Box, Center, Heading, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

interface TileErrorBoundaryProps {
  tileId: TileId;
  setErrorKeys: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const TileErrorBoundary: React.FC<TileErrorBoundaryProps> = ({
  tileId,
  setErrorKeys,
}) => {
  const color = `var(--text-color-${tileId})`;
  const [settings, setSettings] = useRecoilState(userSettingState);
  const { colorMode } = useColorMode();

  const deleteSettingsForTile = () => {
    const currentSettingsClone = deepClone(settings);
    const currentTheme = currentSettingsClone.themes.find(
      (theme) => theme.themeName === colorMode
    );

    if (!currentTheme) {
      return;
    }

    Object.keys(currentTheme[tileId]).forEach(function (key: string, index) {
      const castedKey = key as keyof TileSettings;
      if (castedKey === "backgroundColor") {
        currentTheme[tileId][castedKey] = currentTheme[tileId][castedKey];
      } else if (castedKey === "textColor") {
        currentTheme[tileId][castedKey] = currentTheme[tileId][castedKey];
      } else if (castedKey === "tileType") {
        currentTheme[tileId][castedKey] = "Blank Tile";
      } else {
        currentTheme[tileId][castedKey] = undefined;
      }
    });

    setSettings(currentSettingsClone);
    // hack to reset the error boundary
    setErrorKeys((Math.random() * 100000).toString());
  };

  return (
    <Center
      height="90%"
      width="100%"
      display="flex"
      flexDir="column"
      p="2"
      color={color}
    >
      <Box textAlign="center">
        <Heading>Uh oh!</Heading>
        <Text fontSize="lg">I&apos;m in a bit of a mess 💩</Text>
        <Text fontSize="md">
          One solution is to clear the data from the tile, is it&apos;s likely
          corrupt
        </Text>
        <OutlinedButton
          border={`1px solid ${color}`}
          mt="2"
          onClick={deleteSettingsForTile}
        >
          Try deleting this tile&apos;s data
        </OutlinedButton>
        <Text width="100%" textAlign="center" mt="2">
          If this error keeps happening, please leave a ticket on{" "}
          <a
            href="https://github.com/allister-grange/startertab"
            style={{ textDecoration: "underline" }}
          >
            Github
          </a>
        </Text>
      </Box>
    </Center>
  );
};
