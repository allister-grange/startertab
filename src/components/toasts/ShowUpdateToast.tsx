import { useToast, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

interface ShowUpdateToastProps {}

export const ShowUpdateToast: React.FC<ShowUpdateToastProps> = ({}) => {
  const toast = useToast();

  const showUpdateToast = useCallback(() => {
    toast({
      title: "Todo categories & default search engines 🔍",
      description: (
        <Text>
          v2.11.0 - Introducing the Image Tile 🖼️ -{" "}
          <Link color="coral" href="/updates">
            new update!
          </Link>
          <br />
          Don&apos;t forget to keep adding in{" "}
          <Link color="coral" href="/suggestions">
            suggestions 🗳️
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
    localStorage.removeItem("hasSeenNewUpdate2.7.0Counter");
    localStorage.removeItem("hasSeenNewUpdate2.8.0Counter");
    localStorage.removeItem("hasSeenNewUpdate2.9.0Counter");
    localStorage.removeItem("hasSeenNewUpdate2.10.0Counter");
    const hasSeenNewUpdate = localStorage.getItem(
      "hasSeenNewUpdate2.11.0Counter"
    );
    if (!hasSeenNewUpdate) {
      localStorage.setItem("hasSeenNewUpdate2.11.0Counter", "1");
    } else {
      localStorage.setItem(
        "hasSeenNewUpdate2.11.0Counter",
        (parseInt(hasSeenNewUpdate) + 1).toString()
      );
      // I don't want to spam people who just finished the tutorial with toasts
      if (hasSeenNewUpdate === "24") {
        showUpdateToast();
      }
    }
  }, [showUpdateToast]);

  return <div />;
};
