import { Box } from "@chakra-ui/react";
import React from "react";

interface LandingPageMainVideoProps {}

export const LandingPageMainVideo: React.FC<
  LandingPageMainVideoProps
> = ({}) => {
  return (
    <Box
      w={"100%"}
      display="flex"
      flex="0 0 auto"
      justifyContent="center"
      paddingInline="40px"
      marginBottom="120px"
      bg="white"
      pt="70px"
      pb="100px"
    >
      <Box
        display="flex"
        justifyContent="center"
        maxWidth="1220px"
        width="100%"
        bg="#FFE8E0"
        borderRadius="16px"
        position="relative"
        paddingTop="40px"
        paddingInline="40px"
        marginBottom="-190px"
      >
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          poster="https://static.conjure.so/_next/static/media/video-poster.430263f4.jpg"
          style={{
            overflow: "hidden",
            borderRadius: "16px",
            width: "100%",
            overflowClipMargin: "content-box",
            objectFit: "contain",
            marginBottom: "-40px",
            maxHeight: "675px",
            maxWidth: "1070px",
            boxShadow:
              "rgb(60 66 87 / 10%) 0px 1px 1px 0px, rgb(0 0 0 / 7%) 0px 2px 5px 0px",
          }}
        >
          <source src="/demo1.mp4" type="video/mp4" />
        </video>
      </Box>
    </Box>
  );
};
