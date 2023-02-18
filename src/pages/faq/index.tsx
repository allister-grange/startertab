import { Header } from "@/components/landing-page/LandingPageHeader";
import { Footer } from "@/components/ui/Footer";
import {
  Box,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

export const FAQPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  return (
    <Box>
      <Header />

      <Flex
        width={["100%", "90%", "70%", "60%", "50%"]}
        mx="auto"
        pt="6"
        px="2"
        maxW="1000px"
        color="black"
        flexDir="column"
        height="100%"
        justifyContent="space-between"
        pb="10"
      >
        <Heading>FAQ</Heading>
        <Heading as="h2" color="gray.600" fontSize="xl">
          Your Ultimate Guide to Mastering Your StarterTab 🧐
        </Heading>

        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Settings
          </Heading>
          <Text>
            Located in the lower left-hand corner of your StarterTab, the cog
            icon is your gateway to customizing your experience. By clicking on
            it, you can easily tweak and adjust almost any aspect of your
            StarterTab, making it uniquely yours. If you want to change a
            setting that&apos;s not there, let me know!
          </Text>

          <Heading as="h3" fontSize="md" mt="4" color="gray.600">
            How do I remove and add tiles to my grid?
          </Heading>
          <Text>
            Simply long click on any tile or head to the &apos;Edit Tile
            Grid&apos; option in the settings sidebar to modify your grid to
            your needs.
          </Text>
          <Box mt="4">
            <Box
              overflow="hidden"
              borderRadius="16px"
              boxShadow="lg"
              // width="60%"
              height="min-content"
            >
              <video
                src={"/faq/EditTileGrid.mp4"}
                autoPlay
                playsInline
                muted
                loop
              ></video>
            </Box>
            <Text textAlign="center" fontSize="sm" mt="2">
              How to remove and add tiles to your grid
            </Text>
          </Box>

          <Heading as="h3" fontSize="md" mt="4" color="gray.600">
            How do I have a video for a background?
          </Heading>
          <Text>
            In the Background color input within Global Settings, you can point
            it to a url to have a video for your background. Just surround your
            url with &quot;url(&lt;YOUR URL HERE&gt;)&quot;. Like this
            url(https://i.redd.it/glmqqqagx4891.gif). You should now have a
            video for your background.
          </Text>

          <Heading as="h3" fontSize="md" mt="4" color="gray.600">
            A color gradient for a background?
          </Heading>
          <Text>
            Much like a video background, you have to enter in a special key
            into the Background color input. This time you will need to use some
            css for a linear gradient. This is an example that you can try out:
            linear-gradient(to bottom right, #ABA1EE , #F29AD8).
          </Text>

          <Heading as="h3" fontSize="md" mt="4" color="gray.600">
            How can I make transparent tiles?
          </Heading>
          <Text>
            In any tile, set the Background color to: rgba(255, 255, 255, 0.2).
          </Text>
        </Box>
        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Creating a New Theme
          </Heading>
          <Text mt="1">
            To create a new theme, follow these steps:
            <OrderedList>
              <ListItem>
                Open up the settings sidebar with the settings cog in the lower
                left hand side of your page
              </ListItem>
              <ListItem>
                Click the + icon that is next to the current theme name
                <ListItem>Enter in the details of your new theme</ListItem>
                <ListItem>
                  Click the &quot;Create Theme&quot; button at the bottom of the
                  page, you should now be redirected to your new theme page{" "}
                </ListItem>
              </ListItem>
            </OrderedList>
          </Text>
        </Box>
        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Sharing a Theme
          </Heading>
          <Text mt="1">
            To share one of your themes publically, follow these steps:
            <OrderedList>
              <ListItem>
                Open up the settings sidebar with the settings cog in the lower
                left hand side of your page
              </ListItem>
              <ListItem>
                Click the &quot;Manage Themes&quot; button on the sidebar
              </ListItem>
              <ListItem>Find the theme you want to share</ListItem>
              <ListItem>
                Click the &quot;Share publically&quot; button on the theme you
                would like to share
              </ListItem>
              <ListItem>
                Enter in some details of the theme, have no fear, all your
                personal items (like your Todo List details) will be stripped
                out before being published
              </ListItem>
              <ListItem>
                Click &quot;Share!&quot; and you&apos;re good to go!{" "}
              </ListItem>
            </OrderedList>
          </Text>
        </Box>
        <Box mt="6">
          <Heading as="h3" fontSize="lg">
            Downloading Public Themes
          </Heading>
          <Text mt="1">To download a public theme, follow these steps:</Text>
          <OrderedList>
            <ListItem>
              Open up the settings sidebar with the settings cog in the lower
              left hand side of your page
            </ListItem>
            <ListItem>
              Click the &quot;Manage Themes&quot; button on the sidebar
            </ListItem>
            <ListItem>
              Click the &quot;Public themes&quot; button at the top of the page
            </ListItem>
            <ListItem>
              Find the theme you like and click &quot;Save theme&quot;
            </ListItem>
            <ListItem>
              You should now see a happy message saying you&apos;ve downloaded
              the theme, and you should now see the theme alongside the rest of
              your own
            </ListItem>
          </OrderedList>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
};

export default FAQPage;
