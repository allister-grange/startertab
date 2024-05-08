import { Header } from "@/components/landing-page/LandingPageHeader";
import { Footer } from "@/components/ui/Footer";
import {
  Update290,
  Update280,
  Update270,
  Update260,
  Update250,
  Update240,
  Update230,
  Update220,
  Update210,
  Update200,
  Update120,
  Update110,
} from "@/components/updates";
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
              href="#v2.9.0"
            >
              v2.9.0 - Font Selection and Bug Fixin&apos;
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.8.0"
            >
              v2.8.0 - User&apos;s Feedback!
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.7.0"
            >
              v2.7.0 - System Theming
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.6.0"
            >
              v2.6.0 - Feedback
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.5.0"
            >
              v2.5.0 - Package Updates
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.4.0"
            >
              v2.4.0 - Extensions
            </Link>
          </ListItem>
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
              v2.1.0 - Customize Your Grid
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={onAnchorClick}
              style={{ color: "coral" }}
              href="#v2.00"
            >
              v2.0.0 - Build Your Themes in Public
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
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update290 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update280 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update270 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update260 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update250 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Update240 />
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
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
