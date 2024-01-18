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
      maxWidth="1170px"
      w={["90%", "70%", "90%"]}
      mx="auto"
      transition={"all .6s"}
      mb={`${showingDemo ? "-10rem" : "0"}`}
    >
      <OutlinedButton
        width={`${showingDemo ? "7rem" : "17rem"}`}
        bg="white"
        mb="5"
        color="coral"
        onClick={() => setShowingDemo(!showingDemo)}
        mx="auto"
      >
        {showingDemo ? "Hide me ↑" : "Expand me and give it a try now ↓"}
      </OutlinedButton>
      <iframe
        style={{
          height: `${showingDemo ? "55rem" : "10rem"}`,
          width: "133.333%",
          margin: "auto",
          borderRadius: ".8rem",
          transition: "all .6s",
          transform: "scale(.75)",
          transformOrigin: "0% 0 ",
          boxShadow: "var(--chakra-shadows-lg)",
        }}
        src="https://startertab.com/?preview=true"
      ></iframe>
    </Flex>
  );
};
