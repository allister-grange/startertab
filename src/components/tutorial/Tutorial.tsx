import { Box, Fade } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { TutorialStage1 } from "@/components/tutorial/TutorialStage1";
import { TutorialStage2 } from "@/components/tutorial/TutorialStage2";
import { TutorialStage3 } from "@/components/tutorial/TutorialStage3";
import { TutorialStage4 } from "@/components/tutorial/TutorialStage4";

interface TutorialBlurProps {
  tutorialProgress: number;
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
  setTutorialProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const Tutorial: React.FC<TutorialBlurProps> = ({
  setShowingTutorial,
  setTutorialProgress,
  tutorialProgress,
}) => {
  return (
    <>
      <Fade in={tutorialProgress === 0}>
        {tutorialProgress === 0 && (
          <TutorialStage1
            setTutorialProgress={setTutorialProgress}
            setShowingTutorial={setShowingTutorial}
          />
        )}
      </Fade>
      <Box>{tutorialProgress === 1 && <TutorialStage2 />}</Box>
      <Box>{tutorialProgress === 2 && <TutorialStage3 />}</Box>
      <Box>{tutorialProgress === 3 && <TutorialStage4 />}</Box>
      {/* <Fade in={tutorialProgress === 1}>
        <TutorialStage2 />
      </Fade>
      <Fade in={tutorialProgress === 2}>
        <TutorialStage3 />
      </Fade>
      <Fade in={tutorialProgress === 3}>
        <TutorialStage4 />
      </Fade> */}
    </>
  );
};
