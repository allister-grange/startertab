import { useToast, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

interface ShowNewTabToastProps {}

export const ShowNewTabToast: React.FC<ShowNewTabToastProps> = ({}) => {
  const toast = useToast();

  const showNewTabToast = useCallback(() => {
    toast({
      title: "Want this to be your New Tab Page?",
      description: (
        <Text>
          You&apos;ll have to use{" "}
          <Link
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
      localStorage.setItem("hasVisitedBefore", "true");
      setTimeout(showNewTabToast, 45000);
    }
  }, [showNewTabToast]);

  return <div />;
};
