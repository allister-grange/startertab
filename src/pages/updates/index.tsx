import { Layout } from "@/components/ui/Layout";
import { Update110 } from "@/components/updates/Update110";
import { Update120 } from "@/components/updates/Update120";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";

const UpdatesPage: React.FC = ({}) => {
  return (
    <Box
      width={["100%", "90%", "70%", "60%", "50%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1000px"
    >
      <Flex direction={["column", "column", "row"]}>
        <Heading mb="2" fontSize="40px">
          Updates
        </Heading>
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
      <Update120 />
      <hr style={{ width: "100%", marginTop: "18px" }} />
      <Update110 />
    </Box>
  );
};

export default UpdatesPage;
