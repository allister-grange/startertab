import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const LandingThemePageHeader: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="rgba(255,255,255,0.72)"
      backdropFilter="saturate(180%) blur(20px) !important"
      padding="1.5rem"
      maxWidth="1200px"
      margin="0 auto"
      color="black"
    >
      <Flex align="center" mr={5}>
        <Text fontSize="xl" fontWeight="800" color="black">
          Starter Tab
        </Text>
      </Flex>
      <Flex justify="flex-end" align="center">
        <Link display="block" href="/" color="gray.700">
          Take me to the app 👉
        </Link>
      </Flex>
    </Flex>
  );
};
