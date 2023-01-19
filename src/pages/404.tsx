import { Center, Heading, Link } from "@chakra-ui/react";
import React from "react";

const Custom404: React.FC = ({}) => {
  return (
    <Center height="90%" flexDir="column">
      <Heading>Page not found 🤕</Heading>
      <Link fontSize="md" mt="2" href="/">
        Take me home &larr;
      </Link>
    </Center>
  );
};

export default Custom404;
