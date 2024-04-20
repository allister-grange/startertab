import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { deepClone } from "@/helpers/tileHelpers";
import { TileSettings, UserSettings } from "@/types";
import { Box, Center, Text } from "@chakra-ui/react";
import React, { Component, ErrorInfo } from "react";
import { SetterOrUpdater } from "recoil";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  tileId: number;
  settings: UserSettings;
  setSettings: SetterOrUpdater<UserSettings>;
  color: string;
  themeName: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class TileErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  deleteSettingsForTile = () => {
    const { tileId, settings, themeName } = this.props;

    const currentSettingsClone = deepClone(settings);
    const currentTheme = currentSettingsClone.themes.find(
      (theme) => theme.themeName === themeName
    );

    if (!currentTheme) {
      return;
    }

    const objectKeys = Object.keys(currentTheme.tiles[this.props.tileId]);
    for (const objectKey of objectKeys) {
      const castedKey = objectKey as keyof TileSettings;

      if (castedKey === "backgroundColor" || castedKey === "textColor") {
        currentTheme.tiles[tileId][castedKey] =
          currentTheme.tiles[tileId][castedKey];
      } else if (castedKey === "tileType") {
        currentTheme.tiles[tileId][castedKey] =
          currentTheme.tiles[tileId][castedKey];
      } else if (castedKey === "tileId") {
        currentTheme.tiles[tileId][castedKey] =
          currentTheme.tiles[tileId][castedKey];
      } else if (castedKey === "tileSize") {
        currentTheme.tiles[tileId][castedKey] =
          currentTheme.tiles[tileId][castedKey];
      } else {
        currentTheme.tiles[tileId][castedKey] = undefined;
      }
    }

    this.props.setSettings(currentSettingsClone);
    this.setState({
      hasError: false,
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Center
          height="90%"
          width="100%"
          display="flex"
          flexDir="column"
          p="2"
          color={this.props.color}
        >
          <Box textAlign="center">
            <Text fontSize="3xl" fontWeight="700">
              Uh oh!
            </Text>
            <Text fontSize="lg">I&apos;m in a bit of a mess 💩</Text>
            <Text fontSize="md">
              One solution is to clear the data from the tile, is it&apos;s
              likely corrupt
            </Text>
            <OutlinedButton
              border={`1px solid ${this.props.color}`}
              mt="2"
              onClick={() => this.deleteSettingsForTile()}
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
    }

    return this.props.children;
  }
}
