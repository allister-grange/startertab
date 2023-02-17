import React from "react";
import { Link as CharkaLink, TextProps } from "@chakra-ui/react";
import Link from "next/link";

export const StarterTabLogo: React.FC<TextProps> = ({}) => {
  return (
    <Link href="/landingpad" passHref={true}>
      <CharkaLink
        fontSize={["2xl", "3xl"]}
        fontWeight="900"
        color="black"
        _hover={{ textDecoration: "none" }}
      >
        Starter<span style={{ color: "coral" }}>Tab</span>
      </CharkaLink>
    </Link>
  );
};
