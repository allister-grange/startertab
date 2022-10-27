import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

type MobileWarningProps = {
  setIsMobileView: Dispatch<SetStateAction<boolean>>;
};

export const MobileWarning: React.FC<MobileWarningProps> = ({
  setIsMobileView,
}) => {
  return (
    <Center height="95vh" bg="white" color="black" p="5">
      <Flex flexDir={"column"} justifyContent="center" alignItems="center">
        <Heading color="orange" size="xl" mb="3">
          🏄‍♂️🚀🧖
        </Heading>

        <Heading size="2xl">An apology,</Heading>
        <Heading mt="6" textAlign="center" color="gray.700" size="md">
          This website is not designed for mobile devices, it&apos;s a
          dashboarding website designed to replace your New Tab page.
        </Heading>
        <Heading mt="6" textAlign="center" color="gray.700" size="md">
          Please visit the site on a computer and check it out :)
        </Heading>
        <Box width={"100%"} height="30vh" pt="10">
          <video
            height="200"
            width="360"
            loop
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              aspectRatio: "17/12",
              objectFit: "cover",
            }}
          >
            <source src="/StarterTabDemoV3.mp4" type="video/mp4"></source>
          </video>
        </Box>
        <OutlinedButton
          border="2px solid purple"
          mt="20"
          onClick={() => {
            localStorage.setItem("isMobileView", "false");
            setIsMobileView(false);
          }}
        >
          Take me through anyway
        </OutlinedButton>
      </Flex>
    </Center>
  );
};
