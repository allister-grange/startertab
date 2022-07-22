import { Text, Center, Heading } from "@chakra-ui/react";
import React from "react";

interface TileErrorBoundaryProps {}

export const TileErrorBoundary: React.FC<TileErrorBoundaryProps> = ({}) => {
  return (
    <Center height="100%" width="100%" display="flex" flexDir="column" p="2">
      <Heading>Uh oh!</Heading>
      <Text width="80%" textAlign="center">
        I&apos;m in a bit of a mess 💩
      </Text>
      <Text width="100%" textAlign="center">
        If this error keeps happening, please leave a ticket on{" "}
        <a
          href="https://github.com/allister-grange/startpage"
          style={{ textDecoration: "underline" }}
        >
          Github
        </a>
      </Text>
    </Center>
  );
};
