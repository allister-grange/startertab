import { ThemeSettings, TileSettingsKey } from "@/types";
import { Box, BoxProps, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface ThemePreviewProps {
  theme: ThemeSettings;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  theme: localTheme,
}) => {
  // need to take a clone of the theme so we can modify the layouts below
  const theme = JSON.parse(JSON.stringify(localTheme)) as ThemeSettings;
  const borderRadius = parseInt(theme.globalSettings.borderRadius ?? "1") / 5;
  const shadow = theme.globalSettings.dropShadow;
  const border = theme.globalSettings.tileBorder;
  const borderColor = theme.globalSettings.borderColor;
  const gridGap = theme.globalSettings.gridGap;

  // we only want to show the large layout on the preview
  for (const key in theme.tileLayout) {
    theme.tileLayout[key] = theme.tileLayout["lg"];
  }

  return (
    <Flex
      alignItems="center"
      mx="auto"
      maxW="420px"
      minW="420px"
      maxH="250px"
      minH="250px"
      background={theme.globalSettings.backgroundColor}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box w="100%">
        <ResponsiveGridLayout
          className="layout"
          // we only want the 'lg' layout to display here
          layouts={theme.tileLayout}
          cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
          rowHeight={15}
          margin={[
            gridGap ? parseInt(gridGap) / 1.5 : 2,
            gridGap ? parseInt(gridGap) / 1.5 : 2,
          ]}
          isDraggable={false}
          isResizable={false}
        >
          {theme.tiles.map((tile, i) => (
            <CustomGridItemComponent key={tile.tileId}>
              <Box
                borderRadius={borderRadius}
                shadow={shadow}
                border={border}
                borderColor={borderColor}
                backgroundColor={theme.tiles[tile.tileId].backgroundColor}
                height="100%"
              />
            </CustomGridItemComponent>
          ))}
        </ResponsiveGridLayout>
      </Box>
    </Flex>
  );
};

const CustomGridItemComponent = React.forwardRef(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      ...props
    }: BoxProps,
    ref
  ) => {
    CustomGridItemComponent.displayName = "CustomGridItemComponent";
    return (
      <div
        style={{ ...style }}
        className={className}
        ref={ref as any}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    );
  }
);
