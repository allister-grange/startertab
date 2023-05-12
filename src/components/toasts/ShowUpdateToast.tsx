import { useToast, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

interface ShowUpdateToastProps {}

export const ShowUpdateToast: React.FC<ShowUpdateToastProps> = ({}) => {
  const toast = useToast();

  const showUpdateToast = useCallback(() => {
    toast({
      title: "I've made another update! v2.40",
      description: (
        <Text>
          You can now use a custom StarterTab extension! Get the links{" "}
          <Link color="coral" href="/landingpad">
            here
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
    const hasSeenNewUpdate = localStorage.getItem(
      "hasSeenNewUpdate2.40Counter"
    );
    if (!hasSeenNewUpdate) {
      localStorage.setItem("hasSeenNewUpdate2.40Counter", "1");
    } else {
      localStorage.setItem(
        "hasSeenNewUpdate2.40Counter",
        (parseInt(hasSeenNewUpdate) + 1).toString()
      );
      // only on the twelvth visit since the update do we want to show the toast
      // I don't want to spam people who just finished the tutorial with toasts
      if (hasSeenNewUpdate === "12") {
        showUpdateToast();
      }
    }
  }, [showUpdateToast]);

  return <div />;
};
