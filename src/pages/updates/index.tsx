import { Footer } from "@/components/ui/Footer";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Update110 } from "@/components/updates/Update110";
import { Update120 } from "@/components/updates/Update120";

const UpdatesPage: React.FC = ({}) => {
  React.useEffect(() => {
    document.body.style.background = "white";
  });

  return (
    <Box>
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
      <Footer />
    </Box>
  );
};

export default UpdatesPage;
