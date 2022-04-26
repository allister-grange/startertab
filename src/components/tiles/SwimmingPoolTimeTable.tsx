import { Box, Center, Heading, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface SwimmingPoolTimeTableProps {}

export const SwimmingPoolTimeTable: React.FC<SwimmingPoolTimeTableProps> =
  ({}) => {
    const color = "var(--text-color-tile-4)";

    return (
      <Center height="100%" display="flex" flexDir="column" color={color} textAlign='center'>
        <Heading fontSize="3xl">swimming lanes</Heading>
        <Box mt="2">
          <Heading fontSize="lg" display="inline-block">
            <Link href="https://wellington.govt.nz/recreation/facilities-and-centres/swimming-pools/keith-spry-pool#facilities">
              keith spry
            </Link>
            &nbsp; | &nbsp;
          </Heading>
          <Heading fontSize="lg" display="inline-block">
            <Link href="https://wellington.govt.nz/recreation/facilities-and-centres/swimming-pools/freyberg-pool#facilities">
              freyberg
            </Link>
          </Heading>
        </Box>
      </Center>
    );
  };
