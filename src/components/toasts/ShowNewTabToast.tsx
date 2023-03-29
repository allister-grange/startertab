import { colorModeState } from "@/recoil/UserSettingsAtoms";
import { Link, Text, useToast } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface ShowNewTabToastProps {
  setTutorialProgress: Dispatch<SetStateAction<number>>;
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
}

export const ShowNewTabToast: React.FC<ShowNewTabToastProps> = ({
  setTutorialProgress,
  setShowingTutorial,
}) => {
  const toast = useToast();
  const setColorModeState = useSetRecoilState(colorModeState);

  const showNewTabToast = useCallback(() => {
    toast({
      title: "Want this to be your New Tab Page?",
      description: (
        <Text>
          Install{" "}
          <Link
            target="_blank"
            color="coral"
            href="https://chrome.google.com/webstore/detail/startertab/hklfanmakojdijomofibaiepoeobioni"
          >
            the extension!
          </Link>{" "}
          This notification will never appear again, don&apos;t worry 🙂
        </Text>
      ),
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }, [toast]);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setColorModeState("Colored Light");
      setTutorialProgress(0);
      setShowingTutorial(true);
      localStorage.setItem("hasVisitedBefore", "true");
      setTimeout(showNewTabToast, 45000);
    }
  }, [
    setColorModeState,
    setShowingTutorial,
    setTutorialProgress,
    showNewTabToast,
  ]);

  return <div />;
};
