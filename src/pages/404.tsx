import { Center, Heading, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Custom404: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  return (
    <Center height="90%" flexDir="column" color="black">
      <Heading>Page not found 🤕</Heading>
      <Link fontSize="md" mt="2" href="/" color="gray.700">
        Take me home &larr;
      </Link>
    </Center>
  );
};

export default Custom404;
