import { TutorialThemeOption } from "@/components/tutorial/TutorialThemeOption";
import { SettingsContext } from "@/context/UserSettingsContext";
import { applyTheme, getCurrentTheme } from "@/helpers/settingsHelpers";
import { getHackerNewsData } from "@/pages/api/hackerNews";
import { getUVData } from "@/pages/api/weather";
import {
  HackerNewsLinkHolder,
  TileType,
  UserSettingsContextInterface,
} from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TutorialAccordion } from "./TutorialAccordion";
import { WelcomePage } from "./WelcomePage";

interface TutorialProps {
  setShowTutorial: (value: React.SetStateAction<boolean>) => void;
  hackerNewsData: HackerNewsLinkHolder[];
}

export const Tutorial: React.FC<TutorialProps> = ({
  setShowTutorial,
  hackerNewsData,
}) => {
  const [tutorialTileType, setTutorialTileType] = useState<TileType>("None");
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const { colorMode } = useColorMode();

  const currentTheme = getCurrentTheme(settings, colorMode);

  const showingThemeIndex = useRef(0);
  const animatingThemesTimer = useRef<undefined | NodeJS.Timeout>();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    applyTheme(currentTheme);
  }, [colorMode, currentTheme]);

  const changeColorTheme = () => {
    if (showingThemeIndex.current === settings.themes.length - 1) {
      showingThemeIndex.current = 0;
    } else {
      showingThemeIndex.current += 1;
    }

    setColorMode(settings.themes[showingThemeIndex.current].themeName);
  };

  useEffect(() => {
    const timeoutIdentifier = setInterval(changeColorTheme, 2500);
    animatingThemesTimer.current = timeoutIdentifier;

    return () => {
      clearInterval(timeoutIdentifier);
    };
  }, []);

  const stopAnimationOfThemes = () => {
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
            hackerNewsData={hackerNewsData}
            background={currentTheme.globalSettings.backgroundColor}
            innerBackgroundColor={currentTheme.tile1.backgroundColor}
            innerBorder={currentTheme.tile1.borderColor!}
            tutorialTileType={undefined}
            theme={currentTheme}
          />
        </Center>
      </Box>

      <Box
        height="calc(100vh)"
        mt="-30px"
        background={"#8b83fc"}
        borderTopRadius="30px"
        scrollSnapAlign="center"
        p="8"
      >
        <Box width="50%" ml="8">
          <Heading>Let&apos;s show you how to use the Start Page</Heading>
          <Text>
            While on the Start Page, click the cog in the bottom left corner to
            open up the settings, from here you can customize aspects of your
            own personal Start Page
          </Text>
        </Box>
        <Flex
          flexDir={"row"}
          height="100%"
          justifyContent={"space-around"}
          mt="10"
          p="6"
        >
          <TutorialAccordion
            borderRadius="10"
            width={350}
            height="70%"
            transition={"all 0.4s ease-in-out"}
            zIndex="10"
            bg={"#EEEEEE"}
            overflowY="auto"
            setTutorialTileType={setTutorialTileType}
            tutorialTileType={tutorialTileType!}
          />
          <TutorialThemeOption
            themeName="white"
            width="min(500px,70%)"
            height="70%"
            shadow="xl"
            selected={false}
            onClick={stopAnimationOfThemes}
            hackerNewsData={hackerNewsData}
            background={currentTheme.globalSettings.backgroundColor}
            innerBackgroundColor={currentTheme.tile1.backgroundColor}
            innerBorder={currentTheme.tile1.borderColor!}
            tutorialTileType={tutorialTileType}
            theme={currentTheme}
          />
        </Flex>
      </Box>
      {/* {selectedTheme !== "" ? (
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
      ) : null} */}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [uvData, hackerNewsData] = await Promise.all([
    getUVData("Wellington"),
    getHackerNewsData(),
  ]);

  return {
    props: { uvData, hackerNewsData },
  };
};
