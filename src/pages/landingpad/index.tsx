import { LandingPageDemoSections } from "@/components/landing-page/LandingPageDemoSections";
import { LandingThemePageHeader } from "@/components/landing-page/LandingPageHeader";
import { LandingPageHero } from "@/components/landing-page/LandingPageHero";
import { LandingPageMainVideo } from "@/components/landing-page/LandingPageMainVideo";
import { Footer } from "@/components/ui/Footer";
import { Box, Center, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const LandingPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "#F3F4F6";
  }, []);

  return (
    <Box>
      <LandingThemePageHeader />
      <LandingPageHero />
      <LandingPageMainVideo />
      <LandingPageDemoSections />

      <Footer mt="40" />
    </Box>
  );
};

export default LandingPage;
