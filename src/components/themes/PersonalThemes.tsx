import { ThemeSettings } from "@/types";
import { CopyIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import { Grid, Text } from "@chakra-ui/react";
import React from "react";
import { OutlinedButton } from "../ui/OutlinedButton";
import { PersonalThemeCard } from "./PersonalThemeCard";

interface PersonalThemesProps {
  themes: ThemeSettings[];
  copyToClipboard: (value: string, message?: string) => void;
  deleteTheme: (theme: ThemeSettings) => void;
}

export const PersonalThemes: React.FC<PersonalThemesProps> = ({
  themes,
  copyToClipboard,
  deleteTheme,
}) => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
      gap="4"
      mt="8"
      justifyItems="center"
    >
      {themes.map((theme) => (
        <PersonalThemeCard
          key={theme.themeName}
          theme={theme}
          buttons={
            <>
              <OutlinedButton
                border={`1px solid black`}
                onClick={() =>
                  copyToClipboard(JSON.stringify(theme), undefined)
                }
              >
                <Text fontSize="xs" mr="2">
                  Copy theme
                </Text>
                <CopyIcon />
              </OutlinedButton>
              <OutlinedButton
                border={`1px solid black`}
                onClick={() => console.log("share")}
              >
                <Text fontSize="xs" mr="2">
                  Share to Themes
                </Text>
                <ExternalLinkIcon />
              </OutlinedButton>
              <OutlinedButton
                border={`1px solid red`}
                onClick={() => deleteTheme(theme)}
              >
                <Text fontSize="xs" mr="2">
                  Delete theme
                </Text>
                <DeleteIcon />
              </OutlinedButton>
            </>
          }
        />
      ))}
    </Grid>
  );
};
