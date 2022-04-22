import { Center, Link, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { WindIconDark } from "@/components/icons/WindIconDark";
import { WindIconLight } from "@/components/icons/WindIconLight";

interface WindFinderLinksProps {}

export const WindFinderLinks: React.FC<WindFinderLinksProps> = ({}) => {

  const SwitchIcon = useColorModeValue(WindIconLight, WindIconDark);

  return (
    <Center height="100%">
      <Link href="https://www.windfinder.com/forecast/point_jerningham">
        <SwitchIcon h="70px" w="70px" />
      </Link>
    </Center>
  );
};
