import { useToast, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

interface ShowUpdateToastProps {}

export const ShowUpdateToast: React.FC<ShowUpdateToastProps> = ({}) => {
  const toast = useToast();

  const showUpdateToast = useCallback(() => {
    toast({
      title: "User's feedback, v2.8.0",
      description: (
        <Text>
          Thanks to your suggestions, we have a bunch of new features on
          StarterTab 🗳️ Check out the{" "}
          <Link color="coral" href="/updates">
            new Spotify background toggle!
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
    localStorage.removeItem("hasSeenNewUpdate1.10");
    localStorage.removeItem("hasSeenNewUpdate1.20");
    localStorage.removeItem("hasSeenNewUpdate2.00Counter");
    localStorage.removeItem("hasSeenNewUpdate2.10Counter");
    localStorage.removeItem("hasSeenNewUpdate2.20Counter");
    localStorage.removeItem("hasSeenNewUpdate2.40Counter");
    localStorage.removeItem("hasSeenNewUpdate2.60Counter");
    localStorage.removeItem("hasSeenNewUpdate2.70Counter");
    const hasSeenNewUpdate = localStorage.getItem(
      "hasSeenNewUpdate2.8.0Counter"
    );
    if (!hasSeenNewUpdate) {
      localStorage.setItem("hasSeenNewUpdate2.8.0Counter", "1");
    } else {
      localStorage.setItem(
        "hasSeenNewUpdate2.8.0Counter",
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
