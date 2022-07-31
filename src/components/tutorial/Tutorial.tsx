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
      {tutorialProgress === 0 && (
        <TutorialStage1
          setTutorialProgress={setTutorialProgress}
          setShowingTutorial={setShowingTutorial}
        />
      )}
      {tutorialProgress === 1 && <TutorialStage2 />}
      {tutorialProgress === 2 && <TutorialStage3 />}
      {tutorialProgress === 3 && <TutorialStage4 />}
    </>
  );
};
