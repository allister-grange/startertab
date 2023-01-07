import { useToast, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

interface ShowUpdateToastProps {}

export const ShowUpdateToast: React.FC<ShowUpdateToastProps> = ({}) => {
  const toast = useToast();

  const showUpdateToast = useCallback(() => {
    toast({
      title: "I've made another update! v2.10",
      description: (
        <Text>
          This is a another{" "}
          <span style={{ textDecoration: "underline" }}>huge</span> update. You
          can now drag, drop, delete and add tiles into your grid. Check it out{" "}
          <Link color="coral" href="/updates">
            here
          </Link>
          .
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
    const hasSeenNewUpdate = localStorage.getItem(
      "hasSeenNewUpdate2.10Counter"
    );
    if (!hasSeenNewUpdate) {
      localStorage.setItem("hasSeenNewUpdate2.10Counter", "1");
    } else {
      localStorage.setItem(
        "hasSeenNewUpdate2.10Counter",
        (parseInt(hasSeenNewUpdate) + 1).toString()
      );
      // only on the sixth visit since the update do we want to show the toast
      // I don't want to spam people who just finished the tutorial with toasts
      if (hasSeenNewUpdate === "6") {
        showUpdateToast();
      }
    }
  }, [showUpdateToast]);

  return <div />;
};
