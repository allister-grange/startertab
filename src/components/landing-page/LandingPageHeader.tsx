import { OutlinedButton } from "@/components/ui/OutlinedButton";
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
              <Link href="/faq" passHref={true}>
                <ChakraLink href="/faq" fontWeight="600">
                  FAQ
                </ChakraLink>
              </Link>
              <Link href="/themes#public" passHref={true}>
                <ChakraLink href="/themes#public" fontWeight="600">
                  Themes
                </ChakraLink>
              </Link>
              <Link href="/updates" passHref={true}>
                <ChakraLink href="/updates" fontWeight="600">
                  Updates
                </ChakraLink>
              </Link>
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
                <Link href="/faq" passHref={true}>
                  <MenuItem>FAQ</MenuItem>
                </Link>
                <Link href="/themes#public" passHref={true}>
                  <MenuItem>Themes</MenuItem>
                </Link>
                <Link href="/updates" passHref={true}>
                  <MenuItem>Updates</MenuItem>
                </Link>
                <Link href="/" passHref={true}>
                  <MenuItem>Take me to the app 👉</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
