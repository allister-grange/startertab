import { StarterTabLogo } from "@/components/ui/StarterTabLogo";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

export const Header: React.FC = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 900px)");

  return (
    <Box bg="white" width="100%">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        bg="rgba(255,255,255,0.72)"
        backdropFilter="saturate(180%) blur(20px) !important"
        padding="1"
        maxWidth="1200px"
        margin="0 auto"
        pt="6"
        px={[4, 6, 8, 12]}
        color="black"
      >
        <Flex align="center" mr={5}>
          <StarterTabLogo />
        </Flex>
        <HStack columnGap="5" justify="flex-end" align="center">
          {!isSmallScreen ? (
            <>
              <ChakraLink href="/themes#public" fontWeight="600">
                Themes
              </ChakraLink>
              <ChakraLink href="/updates" fontWeight="600">
                Updates
              </ChakraLink>
              <OutlinedButton
                borderColor="coral"
                onClick={() => (window.location.href = "/")}
              >
                <Link href="/">Take me to the app 👉</Link>
              </OutlinedButton>
            </>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                borderColor="coral"
                color="black"
              />
              <MenuList>
                <MenuItem
                  onClick={() => (window.location.href = "/themes#public")}
                >
                  Themes
                </MenuItem>
                <MenuItem onClick={() => (window.location.href = "/updates")}>
                  Updates
                </MenuItem>
                <MenuItem onClick={() => (window.location.href = "/")}>
                  Take me to the app 👉
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
