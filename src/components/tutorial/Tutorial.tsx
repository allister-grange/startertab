import { TutorialThemeOption } from "@/components/tutorial/TutorialThemeOption";
import {
  Box,
  Button,
  Center, Flex, Heading, Text, useColorMode
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { WelcomePage } from "./WelcomePage";

interface TutorialProps {
  setShowTutorial: (value: React.SetStateAction<boolean>) => void;
}

const themes = [
  {
    themeName: "white",
    background: "white",
    innerBackgroundColor: "white",
    innerBorder: "2px solid black",
  },
  {
    themeName: "glassmorphism dark",
    background: "linear-gradient(160deg, black 0%, #80D0C7 100%)",
    innerBackgroundColor: "rgba(255, 255, 255, 0.2)",
    innerBorder: "2px solid white",
  },
  {
    themeName: "black",
    background: "black",
    innerBackgroundColor: "#444444",
    innerBorder: "",
  },
  {
    themeName: "CMYK",
    background: "white",
    innerBackgroundColor: "#F882FE",
    innerBorder: "",
  },
  {
    themeName: "glassmorphism light",
    background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    innerBackgroundColor: "rgba(255, 255, 255, 0.2)",
    innerBorder: "2px solid white",
  },
  {
    themeName: "light",
    background: "white",
    innerBackgroundColor: "#E89B4B",
    innerBorder: "",
  },
  {
    themeName: "dark",
    background: "#1B202B",
    innerBackgroundColor: "#E89B4B",
    innerBorder: "",
  },
];

export const Tutorial: React.FC<TutorialProps> = ({ setShowTutorial }) => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [colorThemeShowing, setColorThemeShowing] = useState(themes[0]);
  const showingThemeIndex = useRef(0);
  const animatingThemesTimer = useRef<undefined | NodeJS.Timeout>();
  const { setColorMode } = useColorMode();

  const changeColorTheme = () => {
    console.log("called");

    if (showingThemeIndex.current === themes.length - 1) {
      showingThemeIndex.current = 0;
    } else {
      showingThemeIndex.current += 1;
    }
    setColorThemeShowing(themes[showingThemeIndex.current]);
  };

  useEffect(() => {
    const timeoutIdentifier = setInterval(changeColorTheme, 1700);
    animatingThemesTimer.current = timeoutIdentifier;

    return () => {
      clearInterval(timeoutIdentifier);
    };
  }, []);

  const stopAnimationOfThemes = () => {
    console.log(animatingThemesTimer.current!);

    clearInterval(animatingThemesTimer.current!);
    changeColorTheme();
  };

  return (
    <Box scrollSnapType={"y mandatory"} overflowY="scroll" height="100vh">
      <WelcomePage />
      <Box
        width="100%"
        height="calc(100vh)"
        mt="-30px"
        background="white"
        borderRadius="30px"
        scrollSnapAlign="center"
        p="6"
        display="flex"
      >
        <Flex
          p="8"
          flexBasis={"40%"}
          flexDir="column"
          justifyContent={"center"}
          mb="40"
        >
          <Heading>
            Firstly, pick a color theme that feels right for you
          </Heading>
          <Text mt="6">
            This will set the initial color theme for the <i>Start Page</i>
          </Text>
          <Text mt="2">
            Don&apos;t worry, you can change the color scheme any time you need
            to in the settings sidebar
          </Text>
        </Flex>
        <Center flexBasis="60%">
          <TutorialThemeOption
            themeName="white"
            width="min(800px,70%)"
            height="70%"
            shadow="xl"
            selected={false}
            // selected={"white" === selectedTheme}
            // onClick={() => setSelectedTheme("white")}
            onClick={stopAnimationOfThemes}
            background={colorThemeShowing.background}
            innerBackgroundColor={colorThemeShowing.innerBackgroundColor}
            innerBorder={colorThemeShowing.innerBorder}
          />
        </Center>
      </Box>

      <Box
        height="calc(100vh)"
        mt="-30px"
        background={"#8b83fc"}
        borderTopRadius="30px"
        scrollSnapAlign="center"
      ></Box>
      {selectedTheme !== "" ? (
        <Button
          bottom="5"
          right="5"
          position="fixed"
          background={"blue"}
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
