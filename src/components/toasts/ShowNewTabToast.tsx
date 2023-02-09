import { useToast, Text, Link, useColorMode } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface ShowNewTabToastProps {
  setTutorialProgress: Dispatch<SetStateAction<number>>;
  setShowingTutorial: Dispatch<SetStateAction<boolean>>;
}

export const ShowNewTabToast: React.FC<ShowNewTabToastProps> = ({
  setTutorialProgress,
  setShowingTutorial,
}) => {
  const toast = useToast();
  const { setColorMode } = useColorMode();

  const showNewTabToast = useCallback(() => {
    toast({
      title: "Want this to be your New Tab Page?",
      description: (
        <Text>
          You&apos;ll have to use{" "}
          <Link
            target="_top"
            color="coral"
            href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
          >
            this extension
          </Link>{" "}
          or a similar one. This notification will never appear again,
          don&apos;t worry 🙂
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
      setTutorialProgress(0);
      setShowingTutorial(true);
      localStorage.setItem("hasVisitedBefore", "true");
      setTimeout(showNewTabToast, 45000);
      setColorMode("colored light");
    }
  }, [setColorMode, setShowingTutorial, setTutorialProgress, showNewTabToast]);

  return <div />;
};
