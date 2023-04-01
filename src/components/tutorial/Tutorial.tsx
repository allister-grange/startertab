import { TutorialStage1 } from "@/components/tutorial/TutorialStage1";
import { TutorialStage2 } from "@/components/tutorial/TutorialStage2";
import { TutorialStage3 } from "@/components/tutorial/TutorialStage3";
import { TutorialStage4 } from "@/components/tutorial/TutorialStage4";
import { tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface TutorialBlurProps {
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
}

export const Tutorial: React.FC<TutorialBlurProps> = ({
  setShowingTutorial,
}) => {
  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

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
      {[0, 1, 2, 3].find((num) => num === tutorialProgress) ? (
        <Button
          pos="absolute"
          top="5"
          right="5"
          bg="transparent"
          onClick={() => {
            setShowingTutorial(false);
            setTutorialProgress(-1);
          }}
        >
          <CloseIcon color="black" boxSize="26" />
        </Button>
      ) : null}
    </>
  );
};
