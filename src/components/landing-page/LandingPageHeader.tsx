import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";

export const LandingThemePageHeader: React.FC = () => {
  return (
    <Box>
      <Flex direction={["column", "column", "row"]} mb="2" alignItems="center">
        <Box>
          <Heading fontSize="40px" color="white">
            Stater Tab
          </Heading>
          <Heading as="h2" size="sm" color="gray.200">
            Your new tab productivity hack
          </Heading>
        </Box>
        <Link
          display="block"
          marginLeft={["0", "0", "auto"]}
          mt={["0", "0", "5"]}
          href="/"
          color="gray.100"
        >
          Take me to the app 👉
        </Link>
      </Flex>
      {/* <hr style={{ width: "100%", color: "white" }} /> */}
    </Box>
  );
};
