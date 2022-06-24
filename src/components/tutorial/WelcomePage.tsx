import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const WelcomePage: React.FC = ({}) => {
  return (
    <Box height="100vh" background={"#F4D748"} scrollSnapAlign="center">
      <Box width="90%" p="4" pl="18%" pos="relative" height="100%">
        <header>
          <Heading fontSize={"115px"} color="black" mt="6rem">
            Start Page ✌
          </Heading>
          <Text mt="2" fontSize={"24px"} color="#151515">
            Your &apos;New Tab&apos; page with a twist
          </Text>
        </header>

        <Box
          pos="absolute"
          right="35"
          bottom="130px"
          // height={["0%, 0%, 0%, 30%, 45%"]}
          height="38%"
          width={[
            "100%", // base
            "0%", // 480px upwards
            "0%", // 768px upwards
            "45%", // 992px upwards
          ]}
        >
          <Box
            height="100%"
            width={"100%"}
            // width={"743px"}
            borderRadius="12"
            _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
            _focus={{ transform: "scale(1.02)" }}
            transition="all .4s"
            overflow="hidden"
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            shadow={"lg"}
            position="relative"
          >
            <Image
              src={`/white.jpeg`}
              alt={`Preview of Start Page`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Text fontStyle={"italic"} mt="2" textAlign="right">
            Completely customizable, create your own experience
          </Text>
        </Box>

        {/* <Text mt="2" fontSize={"lg"} color="#202020" width="82%">
            This is a website designed to take over your new tab page to
            display you what you want to see whenever you open a browser. Any
            time you want to change the settings, look for the cog in the
            lower left hand corner. I use{" "}
            <a
              style={{ color: "blue" }}
              href="https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en"
            >
              this extension
            </a>{" "}
            to point to this website&apos;s URL. This is all open source,
            check out the GitHub repo{" "}
            <a
              style={{ color: "blue" }}
              href="https://github.com/allister-grange/startpage"
            >
              here.
            </a>{" "}
            All data is stored locally within your browser, pick a design
            below to get started!
          </Text> */}
      </Box>
    </Box>
  );
};
