import { useToast, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

interface ShowUpdateToastProps {}

export const ShowUpdateToast: React.FC<ShowUpdateToastProps> = ({}) => {
  const toast = useToast();

  const showUpdateToast = useCallback(() => {
    toast({
      title: "System theming, v2.70",
      description: (
        <Text>
          Take a look in the sidebar and you will see you can now toggle between
          themes to match your system light and dark mode ☀️ Thanks to{" "}
          <i>pojntfx</i> for the suggestion on the{" "}
          <Link color="coral" href="/suggestions">
            on the new suggestions page 🗳️
          </Link>
        </Text>
      ),
      status: "info",
      duration: 10000,
      isClosable: true,
      position: "top",
    });
  }, [toast]);

  useEffect(() => {
    showUpdateToast();

    localStorage.removeItem("hasSeenNewUpdate1.10");
    localStorage.removeItem("hasSeenNewUpdate1.20");
    localStorage.removeItem("hasSeenNewUpdate2.00Counter");
    localStorage.removeItem("hasSeenNewUpdate2.10Counter");
    localStorage.removeItem("hasSeenNewUpdate2.20Counter");
    localStorage.removeItem("hasSeenNewUpdate2.40Counter");
    const hasSeenNewUpdate = localStorage.getItem(
      "hasSeenNewUpdate2.60Counter"
    );
    if (!hasSeenNewUpdate) {
      localStorage.setItem("hasSeenNewUpdate2.60Counter", "1");
    } else {
      localStorage.setItem(
        "hasSeenNewUpdate2.60Counter",
        (parseInt(hasSeenNewUpdate) + 1).toString()
      );
      // only on the twelfth visit since the update do we want to show the toast
      // I don't want to spam people who just finished the tutorial with toasts
      if (hasSeenNewUpdate === "12") {
        showUpdateToast();
      }
    }
  }, [showUpdateToast]);

  return <div />;
};
