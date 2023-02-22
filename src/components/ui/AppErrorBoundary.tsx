import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";

export const AppErrorBoundary: React.FC = ({}) => {
  document.body.style.background = "white";

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
      width={["100%", "90%", "70%", "60%", "60%"]}
      p="2"
      mt="24"
      mx="auto"
      textAlign="center"
      color="gray.700"
    >
      <Flex>
        <Box my="auto" width="100%">
          <Heading fontSize="4xl" fontWeight="600" color="gray.600">
            Looks like something went wrong!
          </Heading>
          <Flex mt="4" textAlign="center" justifyContent="center">
            <Text fontSize="2xl">
              Open an issue on{" "}
              <a
                href="https://github.com/allister-grange/startertab"
                target="_black"
                style={{ textDecoration: "underline" }}
              >
                GitHub
              </a>
            </Text>
          </Flex>
          <Text mt="8" fontSize="xl">
            It seems there is an error that has occurred. Give refreshing your
            browser a try. There&apos;s probably an issue with the settings for
            your tile&apos;s.
          </Text>
          <Text mt="4" fontSize="lg">
            If refreshing doesn&apos;t help, please click this dangerous button
            below &darr; This will delete all of your data. Please back up your
            localstorage if you have themes that you care about. In the future,
            it might be a good idea to publically list themes you care about.
          </Text>
        </Box>
      </Flex>
      <Box textAlign="center" mt="8">
        <OutlinedButton
          fontWeight="800"
          border="1px solid black"
          onClick={deleteAllSettings}
          px="4"
          background="white"
          shadow="md"
          color="gray.900"
          fontSize="md"
          py="6"
          borderRadius="10"
        >
          Clear all settings! ⚠️
        </OutlinedButton>
      </Box>
    </Box>
  );
};
