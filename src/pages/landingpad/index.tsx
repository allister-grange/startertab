import { ChromeLogo } from "@/components/icons/ChromeLogo";
import { LandingPageDemoSection } from "@/components/landing-page/LandingPageDemoSection";
import { LandingPageDemoSections } from "@/components/landing-page/LandingPageDemoSections";
import { LandingThemePageHeader } from "@/components/landing-page/LandingPageHeader";
import { LandingPageHero } from "@/components/landing-page/LandingPageHero";
import { LandingPageMainVideo } from "@/components/landing-page/LandingPageMainVideo";
import { Footer } from "@/components/ui/Footer";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const LandingPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "#F3F4F6";
  }, []);

  return (
    <Box>
      <LandingThemePageHeader />
      <Box mx="auto" height="100%">
        <LandingPageHero />
        <LandingPageMainVideo />
        <LandingPageDemoSections />

        <Footer
          mt="40"
          mx="auto"
          bg="#F3F4F6"
          width={["100%", "95%", "90%", "80%", "70%"]}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
