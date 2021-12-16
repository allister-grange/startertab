import { Center, Heading, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface SwimmingPoolTimeTableProps {}

export const SwimmingPoolTimeTable: React.FC<SwimmingPoolTimeTableProps> =
  ({}) => {
    return (
      <Center height="100%" display="flex" flexDir="column">
        <Heading color="blue">swimming lanes</Heading>
        <Box mt="2">
          <Heading color="blue" fontSize="xl" display="inline-block">
            <Link href="https://wellington.govt.nz/recreation/facilities-and-centres/swimming-pools/keith-spry-pool#facilities">
              keith spry |
            </Link>
          </Heading>
          <Heading color="blue" fontSize="xl" display="inline-block">
            <Link href="https://wellington.govt.nz/recreation/facilities-and-centres/swimming-pools/freyberg-pool#facilities">
              &nbsp;freyberg
            </Link>
          </Heading>
        </Box>
      </Center>
    );
  };
