import { Footer } from "@/components/ui/Footer";
import { Update110 } from "@/components/updates/Update110";
import { Update120 } from "@/components/updates/Update120";
import { Update200 } from "@/components/updates/Update200";
import { Update210 } from "@/components/updates/Update210";
import {
  Box,
  Flex,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const UpdatesPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
    if (window.location.hash) {
      const anchor = document.getElementById(
        window.location.hash.split("#")[1]!
      );
      anchor?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const onAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const anchor = document.getElementById(
      e.currentTarget.getAttribute("href")?.split("#")[1]!
    );
    window.location.href = e.currentTarget.getAttribute("href")!;
    anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Box
        width={["100%", "90%", "70%", "60%", "50%"]}
        mx="auto"
        pt="6"
        px="2"
        maxW="1000px"
        color="black"
      >
        <Flex direction={["column", "column", "row"]}>
          <Heading mb="2" fontSize="40px">
            Updates
          </Heading>
          <Link
            display="block"
            marginLeft={["0", "0", "auto"]}
            mt={["0", "0", "5"]}
            href="/"
          >
            Take me back to Starter Tab 👈
          </Link>
        </Flex>
        <hr style={{ width: "100%", background: "#e2e8f0" }} />
        <UnorderedList mt="2" ml="6">
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "green" }}
              href="#v2.10"
            >
              v2.10
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "green" }}
              href="#v2.00"
            >
              v2.00
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "green" }}
              href="#v1.20"
            >
              v1.20
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "green" }}
              href="#v1.10"
            >
              v1.10
            </Link>
          </ListItem>
        </UnorderedList>
        <Update210 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update200 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update120 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update110 />
      </Box>
      <Footer mt="20" />
    </>
  );
};

export default UpdatesPage;
