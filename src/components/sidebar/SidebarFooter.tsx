import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { GithubSvg } from "@/components/ui/GithubSvg";

interface SidebarFooterProps {
  borderColor: string;
  textColor: string;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  borderColor,
  textColor,
}) => {
  return (
    <Box
      marginTop="auto"
      bottom="0"
      borderTop={`1px solid ${borderColor}`}
      height="3rem"
      p="4"
      display="flex"
      alignItems="center"
      color={textColor}
    >
      <a
        href="https://github.com/allister-grange/startpage"
        aria-label="Link to this website's code"
      >
        <GithubSvg fill={textColor} />
      </a>
      <Box
        ml="3"
        borderLeft={`1px solid ${textColor}`}
        height="160%"
        width="1px"
      />
      <Text ml="3" fontSize="smaller">
        &copy; 2022,{" "}
        <a href="https://allistergrange.com" aria-label="My personal website">
          Allister Grange
        </a>{" "}
        - v1.00
      </Text>
    </Box>
  );
};
