import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

interface LandingPageDemoIFrameProps {}

export const LandingPageDemoIFrame: React.FC<
  LandingPageDemoIFrameProps
> = ({}) => {
  const [showingDemo, setShowingDemo] = useState(false);

  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      display={["none", "none", "block"]}
      alignItems="center"
      marginTop="17rem"
      textAlign="center"
      w="100%"
      mx="auto"
      transition={"all .6s"}
      mb={`${showingDemo ? "-10rem" : "0"}`}
    >
      <OutlinedButton
        w="13rem"
        bg="white"
        mb="5"
        color="coral"
        onClick={() => setShowingDemo(!showingDemo)}
        mx="auto"
      >
        {showingDemo ? "Hide me ↑" : "Give it a try now ↓"}
      </OutlinedButton>
      <iframe
        style={{
          height: `${showingDemo ? "55rem" : "10rem"}`,
          margin: "auto",
          borderRadius: ".8rem",
          transition: "all .6s",
          width: "110%",
          transform: "scale(.80)",
          transformOrigin: "30% 0 ",
        }}
        src="https://www.startertab.com?extension=true"
      ></iframe>
    </Flex>
  );
};
