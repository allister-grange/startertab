import { Box, Fade } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { TutorialStage1 } from "@/components/tutorial/TutorialStage1";
import { TutorialStage2 } from "@/components/tutorial/TutorialStage2";
import { TutorialStage3 } from "@/components/tutorial/TutorialStage3";

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
      {tutorialProgress === 0 && (
        <TutorialStage1
          setTutorialProgress={setTutorialProgress}
          setShowingTutorial={setShowingTutorial}
        />
      )}
      <Box>{tutorialProgress === 1 && <TutorialStage2 />}</Box>
      <Box>{tutorialProgress === 2 && <TutorialStage3 />}</Box>
    </>
  );
};
