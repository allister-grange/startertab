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
      width={["100%", "90%", "70%", "50%", "50%"]}
      p="2"
      mt="24"
      mx="auto"
      color="black"
      textAlign="center"
    >
      <Flex>
        <Box my="auto" width="100%">
          <Heading color="black" fontSize="40px">
            I am in a pickle! ⚠️
          </Heading>
          <Text mt="4">
            It seems there is an error that has occurred. Give refreshing your
            browser a shot. There&apos;s probably an issue with the settings for
            your tile&apos;s.
          </Text>
          <Text mt="2">
            If refreshing doesn&apos;t help, please click this dangerous button
            below &darr; This will delete all of your settings data.
          </Text>
        </Box>
      </Flex>
      <Box textAlign="center" mt="16px">
        <OutlinedButton
          borderColor="red"
          fontWeight="800"
          onClick={deleteAllSettings}
          px="4"
          background="white"
          shadow="md"
          color="gray.900"
          fontSize="md"
          py="6"
          borderRadius="10"
        >
          CLEAR SETTINGS
        </OutlinedButton>
      </Box>
    </Box>
  );
};
