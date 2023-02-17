import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface ThemePageHeaderProps {
  showingPublicThemes: boolean;
}

export const ThemePageHeader: React.FC<ThemePageHeaderProps> = ({
  showingPublicThemes,
}) => {
  return (
    <Flex color="black" textAlign="center">
      <Flex direction={["column", "column", "row"]} mb="2" alignItems="center">
        <Box>
          <Heading as="h2" textAlign={["center", "center", "unset"]}>
            {showingPublicThemes ? "Public Themes" : "My Themes"}
          </Heading>
          <Heading
            as="h3"
            size="sm"
            color="gray.700"
            textAlign={["center", "center", "unset"]}
          >
            {showingPublicThemes
              ? "Find a new theme for yourself"
              : "Manage your themes from this page"}
          </Heading>
        </Box>
        {/* <Link
          marginLeft={["0", "0", "auto"]}
          mt={["1", "1", "5"]}
          href="/"
          fontSize={["sm", "sm", "md"]}
        >
          Take me back to StarterTab 👈
        </Link> */}
      </Flex>
      {/* <hr style={{ width: "100%" }} /> */}
    </Flex>
  );
};
