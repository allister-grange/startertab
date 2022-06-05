import {
  Box,
  Center,
  Text,
  Heading,
  Button,
  Grid,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TutorialThemeOption } from "@/components/tutorial/TutorialThemeOption";

interface TutorialProps {
  setShowTutorial: (value: React.SetStateAction<boolean>) => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ setShowTutorial }) => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const { setColorMode } = useColorMode();

  return (
    <Box width="80%" p="4" pl="18%" mt="5rem">
      <header>
        <Heading size={"4xl"} color="black">
          Start Page
        </Heading>
        <Text mt="2" fontSize={"2xl"} color="#4f4e4e">
          Your &apos;New Tab&apos; page with a twist
        </Text>
        <Text mt="2" fontSize={"lg"} color="#4f4e4e" width="82%">
          This is a website designed to take over your new tab page to display
          you what you want to see whenever you open a browser. Any time you
          want to change the settings, look for the cog in the lower left hand
          corner. I use{" "}
          <a
            style={{ color: "orange" }}
            href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
          >
            this extension
          </a>{" "}
          to point to this website&apos;s URL. This is all open source, check
          out the GitHub repo{" "}
          <a
            style={{ color: "orange" }}
            href="https://github.com/allister-grange/startpage"
          >
            here.
          </a>{" "}
          All data is stored locally within your browser, pick a design below to
          get started! 🏎
        </Text>
      </header>

      <Center mt="8" width="100%">
        <Grid
          width="100%"
          templateColumns={"repeat(auto-fill, 497px)"}
          gridGap="5"
          justifyContent="flex-start"
        >
          <TutorialThemeOption
            themeName="white"
            selected={"white" === selectedTheme}
            onClick={() => setSelectedTheme("white")}
          />
          <TutorialThemeOption
            themeName="glassmorphism dark"
            selected={"glassmorphism dark" === selectedTheme}
            onClick={() => setSelectedTheme("glassmorphism dark")}
          />
          <TutorialThemeOption
            themeName="glassmorphism light"
            selected={"glassmorphism light" === selectedTheme}
            onClick={() => setSelectedTheme("glassmorphism light")}
          />
          <TutorialThemeOption
            themeName="black"
            selected={"black" === selectedTheme}
            onClick={() => setSelectedTheme("black")}
          />
          <TutorialThemeOption
            themeName="dark"
            selected={"dark" === selectedTheme}
            onClick={() => setSelectedTheme("dark")}
          />
          <TutorialThemeOption
            themeName="light"
            selected={"light" === selectedTheme}
            onClick={() => setSelectedTheme("light")}
          />
          <TutorialThemeOption
            themeName="CMYK"
            selected={"CMYK" === selectedTheme}
            onClick={() => setSelectedTheme("CMYK")}
          />
        </Grid>
      </Center>
      {selectedTheme !== "" ? (
        <Button
          bottom="5"
          right="5"
          position="fixed"
          background={"orange"}
          color="white"
          _hover={{ background: "white", color: "black" }}
          _focus={{ background: "white", color: "black" }}
          onClick={() => {
            setColorMode(selectedTheme);
            setShowTutorial(false);
            localStorage.setItem("hasVisitedBefore", "true");
          }}
        >
          Continue &rarr;
        </Button>
      ) : null}
    </Box>
  );
};
