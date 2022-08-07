import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

export const AppErrorBoundary: React.FC = ({}) => {
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
    <Box height="100%" width="65%" p="2" mt="10" mx="auto">
      <Flex>
        <span style={{ fontSize: "140px" }}>⚠️</span>
        <Box my="auto" ml="8" width="55%">
          <Heading color="black">I am in a pickle!</Heading>
          <Text mt="2">
            It seems there is an error that has occurred. Give refreshing your
            browser a shot. If that doesn&apos;t work, please click this
            dangerous button below &darr;. This will delete all of your settings
            data, as I have likely pushed out a new version of the site and
            caused you issues.
          </Text>
        </Box>
      </Flex>
      <Box textAlign="center">
        <OutlinedButton
          borderColor="red"
          fontWeight="800"
          onClick={deleteAllSettings}
          px="4"
        >
          CLEAR SETTINGS
        </OutlinedButton>
      </Box>
    </Box>
  );
};
