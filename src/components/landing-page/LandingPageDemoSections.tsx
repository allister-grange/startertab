import { Box, Flex, HStack, Link, Stack } from "@chakra-ui/react";
import React from "react";
import { DuckDuckGoIcon, GoogleIcon, StackOverFlowIcon } from "../icons";
import { GithubSvg } from "../icons/GithubSvg";
import { GoogleCalendarLogo } from "../icons/GoogleCalendarLogo";
import { HackerNewsLogo } from "../icons/HackerNewsLogo";
import { OutlookLogo } from "../icons/OutlookLogo";
import { RSSLogo } from "../icons/RSSLogo";
import { SpotifyLogo } from "../icons/SpotifyLogo";
import { StravaLogo } from "../icons/StravaLogo";
import { TwitterLogo } from "../icons/TwitterLogo";
import { LandingPagePhotoSection } from "./LandingPagePhotoSection";

interface LandingPageDemoSectionsProps {}

export const LandingPageDemoSections: React.FC<
  LandingPageDemoSectionsProps
> = ({}) => {
  return (
    <Box mt="300px">
      <LandingPagePhotoSection
        title="Productivity like no other."
        titleColor="#7961E3"
        description="Choose from 15+ tiles designed to give you all the information you
        need to get your shit done at a glance."
        logos={
          <HStack
            mx={["auto", "auto", "auto", "0", "0"]}
            mt={["8", "8", "8", "8", "auto"]}
          >
            <GoogleCalendarLogo height={24} width={24} fill="#718096" />
            <SpotifyLogo height={24} width={24} fill="#718096" />
            <OutlookLogo height={24} width={24} fill="#718096" />
            <GithubSvg height={24} width={24} fill="#718096" />
            <DuckDuckGoIcon height={7} width={7} fill="#718096" />
            <GoogleIcon height={6} width={6} fill="#718096" />
            <HackerNewsLogo height={24} width={24} fill="#718096" />
            <RSSLogo height={24} width={24} fill="#718096" />
            <StackOverFlowIcon height={24} width={24} fill="#718096" />
            <StravaLogo height={24} width={24} fill="#718096" />
            <TwitterLogo height={24} width={24} fill="#718096" />
          </HStack>
        }
      />
      <LandingPagePhotoSection
        title="Join the community."
        titleColor="#47CE8D"
        description="Share your themes publicly, take inspiration from others, or
          straight up use their theme."
        button={
          <Link
            background="transparent"
            shadow="sm"
            border="2px solid #47CE8D"
            transition="all .2s"
            _hover={{
              transform: "translateY(-2px)",
              cursor: "pointer",
            }}
            p="2"
            borderRadius="16px"
            href="/themes#public"
            display="block"
            mx={["auto", "auto", "auto", "0", "0"]}
            width="max-content"
            mt="8"
          >
            Check them out
          </Link>
        }
      />
      <LandingPagePhotoSection
        title="Your tab, your way."
        titleColor="#F94892"
        description="You have complete customization of your tab. Colors, layouts,
        tiles, background, it's all up to you."
      />
    </Box>
  );
};
