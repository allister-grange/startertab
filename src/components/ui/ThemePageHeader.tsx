import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";

interface ThemePageHeaderProps {
  showingPublicThemes: boolean;
}

export const ThemePageHeader: React.FC<ThemePageHeaderProps> = ({
  showingPublicThemes,
}) => {
  return (
    <Box>
      <Flex direction={["column", "column", "row"]} mb="2" alignItems="center">
        <Box>
          <Heading fontSize="40px">
            {showingPublicThemes ? "Public Themes" : "Your Themes"}
          </Heading>
          <Heading as="h2" size="sm" color="gray.700">
            {showingPublicThemes
              ? "Find a new theme for yourself"
              : "Manage your themes from this page"}
          </Heading>
        </Box>
        <Link
          display="block"
          marginLeft={["0", "0", "auto"]}
          mt={["0", "0", "5"]}
          href="/"
        >
          Take me back to Starter Tab 👈
        </Link>
      </Flex>
      <hr style={{ width: "100%" }} />
    </Box>
  );
};
