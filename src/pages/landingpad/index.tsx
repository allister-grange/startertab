import { ChromeLogo } from "@/components/icons/ChromeLogo";
import { LandingPageDemoSection } from "@/components/landing-page/LandingPageDemoSection";
import { LandingThemePageHeader } from "@/components/landing-page/LandingPageHeader";
import { LandingPageHero } from "@/components/landing-page/LandingPageHero";
import { Footer } from "@/components/ui/Footer";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const LandingPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  });

  return (
    <Box>
      <LandingThemePageHeader />
      <Box
        width={["100%", "95%", "90%", "80%", "70%"]}
        mx="auto"
        maxW="1500px"
        height="100%"
      >
        <LandingPageHero />
        <LandingPageDemoSection />

        <Footer mt="24" />
      </Box>
    </Box>
  );
};

export default LandingPage;
