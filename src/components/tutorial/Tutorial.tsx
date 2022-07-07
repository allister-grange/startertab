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
  Button,
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
import styles from "@/styles/Home.module.css";
import { TutorialThemePicker } from "./TutorialThemePicker";

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
    <Center
      transition={"background 1s ease-in-out"}
      background="#1B202B"
      height="100vh"
      width="100vw"
      overflow="hidden"
    >
      <Box
        scrollSnapType={"y mandatory"}
        overflowY="scroll"
        height="85vh"
        width="80%"
        borderRadius="15px"
        className={styles.disableScrollbars}
        shadow="xl"
      >
        <WelcomePage
          height="100%"
          background={"#F4D748"}
          scrollSnapAlign="center"
        />
        <TutorialThemePicker
          currentTheme={currentTheme}
          stopAnimationOfThemes={stopAnimationOfThemes}
        />
        <Box
          height="100%"
          mt="-30px"
          background={"#8b83fc"}
          borderTopRadius="30px"
          scrollSnapAlign="center"
          p="8"
        >
          <Box width="50%" ml="8">
            <Heading>Let&apos;s show you how to use the Start Page</Heading>
            <Text>
              While on the Start Page, click the cog in the bottom left corner
              to open up the settings, from here you can customize aspects of
              your own personal Start Page
            </Text>
          </Box>
          <Flex
            flexDir={"row"}
            height="100%"
            justifyContent={"space-around"}
            // mt="10"
            p="2"
          >
            <TutorialAccordion
              borderRadius="10"
              width={350}
              transition={"all 0.4s ease-in-out"}
              zIndex="10"
              bg={"#EEEEEE"}
              overflowY="auto"
              setTutorialTileType={setTutorialTileType}
              tutorialTileType={tutorialTileType!}
              height="380px"
              background="white"
            />
            <TutorialThemeOption
              themeName="white"
              width="40%"
              height="380px"
              shadow="xl"
              selected={false}
              hackerNewsData={hackerNewsData}
              background={currentTheme.globalSettings.backgroundColor}
              innerBackgroundColor={currentTheme.tile1.backgroundColor}
              innerBorder={currentTheme.tile1.borderColor!}
              tutorialTileType={tutorialTileType}
              theme={currentTheme}
            />
          </Flex>
        </Box>
        <Box
          height="100%"
          mt="-30px"
          background={"#7fe3ff"}
          borderTopRadius="30px"
          scrollSnapAlign="center"
        >
          <Box ml="3rem" p="8">
            <Heading fontSize={"55px"} color="black" mt="6rem">
              You&apos;re ready to go! 🚀
            </Heading>
            <Text size="2xl" color="#303030" mt="1rem">
              Just a note, if you want to have this webpage open whenever you
              create a new tab, you&apos;ll want to use an extension like{" "}
              <a
                style={{ color: "red" }}
                href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
              >
                this one
              </a>
            </Text>

            <Button
              // bottom="5"
              // right="5"
              // position="fixed"
              background={"blue"}
              color="white"
              mt="2rem"
              _hover={{ background: "white", color: "black" }}
              _focus={{ background: "white", color: "black" }}
              onClick={() => {
                setShowTutorial(false);
                localStorage.setItem("hasVisitedBefore", "true");
              }}
            >
              Take me through! &rarr;
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
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
