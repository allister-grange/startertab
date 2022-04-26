import { Center, Link } from "@chakra-ui/react";
import React from "react";
import { WindIcon } from "@/components/icons/WindIcon";

interface WindFinderLinksProps {}

export const WindFinderLinks: React.FC<WindFinderLinksProps> = ({}) => {

  return (
    <Center height="100%">
      <Link href="https://www.windfinder.com/forecast/point_jerningham">
        <WindIcon h="70px" w="70px" />
      </Link>
    </Center>
  );
};
