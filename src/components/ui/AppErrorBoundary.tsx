import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect } from "react";

export const AppErrorBoundary: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  const deleteAllSettings = () => {
    localStorage.clear();

    const cookies = document.cookie;

    for (const myCookie of cookies.split(";")) {
      if (myCookie.includes("chakra-ui-color-mode")) {
        const pos = myCookie.indexOf("=");
        const name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }

    Router.push("/");
  };

  return (
    <Box
      height="100%"
      width={["100%", "90%", "70%", "60%", "50%"]}
      p="2"
      mt="10"
      mx="auto"
      color="black"
    >
      <Flex>
        <span style={{ fontSize: "140px" }}>⚠️</span>
        <Box my="auto" width="100%">
          <Heading color="black">I am in a pickle!</Heading>
          <Text mt="2">
            It seems there is an error that has occurred. Give refreshing your
            browser a shot. If that doesn&apos;t work, please click this
            dangerous button below &darr;. This will delete all of your settings
            data.
          </Text>
        </Box>
      </Flex>
      <Box textAlign="center">
        <OutlinedButton
          borderColor="red"
          fontWeight="800"
          onClick={deleteAllSettings}
          px="4"
          background="white"
          shadow="2xl"
          color="gray.900"
          fontSize="2xl"
        >
          CLEAR SETTINGS
        </OutlinedButton>
      </Box>
    </Box>
  );
};
