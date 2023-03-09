import { Header } from "@/components/landing-page/LandingPageHeader";
import { Footer } from "@/components/ui/Footer";
import { Update110 } from "@/components/updates/Update110";
import { Update120 } from "@/components/updates/Update120";
import { Update200 } from "@/components/updates/Update200";
import { Update210 } from "@/components/updates/Update210";
import { Update220 } from "@/components/updates/Update220";
import { Update230 } from "@/components/updates/Update230";
import { Box, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
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
      <Header />
      <Box
        width={["100%", "90%", "70%", "60%", "50%"]}
        mx="auto"
        pt="6"
        px="2"
        maxW="1000px"
        color="black"
      >
        <Heading as="h1">Updates</Heading>
        <UnorderedList listStyleType={"none"} margin="0" mt="6">
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.3.0"
            >
              v2.3.0 - Exporting/Importing Themes
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.2.0"
            >
              v2.2.0 - New Tiles and Pages
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.1.0"
            >
              v2.1.0 - Customize your grid
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.00"
            >
              v2.0.0 - Build your themes in public
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v1.20"
            >
              v1.2.0 - RSS Feed Tile
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v1.10"
            >
              v1.1.0 - Markdown and Favorites Tile
            </Link>
          </ListItem>
        </UnorderedList>
        <Update230 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update220 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
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
