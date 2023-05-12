import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const Update230: React.FC = ({}) => {
  return (
    <Box id="v2.3.0">
      <Heading as="h2" fontSize="2xl" mt="6">
        v2.3.0 - Exporting/Importing Themes
      </Heading>
      <Text
        mt="1"
        style={{ fontSize: "12px", color: "var(--chakra-colors-gray-600)" }}
      >
        7<sup>th</sup> Mar 2023
      </Text>
      <Text mt="2" color="black">
        Who needs the public Themes marketplace? You can now backup your own
        themes.
      </Text>
      <Box
        mt="4"
        width={["60%", "40%", "45%", "40%"]}
        marginX="auto"
        shadow="md"
        overflow="hidden"
        borderRadius="16px"
      >
        <Image
          src="/updates_screenshots/import_export.png"
          alt="Demo of what the new calendar tile looks like"
          objectFit="cover"
          layout="responsive"
          width={"316"}
          height={"316"}
          style={{
            width: "100%",
            borderRadius: "16px",
          }}
        />
      </Box>
      <Text textAlign="center" mt="2" fontSize="sm" color="gray.700">
        Import/Export feature now found in the sidebar
      </Text>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          Main changes
        </Heading>
        <Text mt="2">
          First off, there&apos;s an added import/export button to make it
          easier for you to manage your data. With this new feature, you can
          quickly transfer your settings and preferences from one device to
          another.
        </Text>
        <Text mt="2">
          There was some feedback about tile modification buttons being a bit
          annoying, so now they only display when you&apos;re in edit mode. This
          means you can focus on enjoying your content without getting
          distracted by buttons in the bottom of the tiles.
        </Text>
        <Text mt="2">
          You can now set optional titles for your RSS and Favorites Tiles. This
          gives you more control over how your tiles are displayed and
          organized, making it easier to find the content you love.
        </Text>
        <Text mt="2">
          Lastly, you can now choose your preferred sorting value on Reddit,
          including &quot;hot,&quot; &quot;top,&quot; &quot;best,&quot; or
          &quot;new&quot;. This makes it easier to find the most popular or
          newest posts on your favorite subreddits.
        </Text>
      </Box>
      <Box color="gray.700" mt="6">
        <Heading fontSize="xl" as="h3" color="black">
          No bugs?
        </Heading>
        <Text mt="2">
          I don&apos;t believe there were any bug fixes this update, is that
          possible?! Murphy&apos;s law, there&apos;s probably going about 15 now
          that I said that.
        </Text>
        <Text mt="2">
          I hope these updates make your experience with StarterTab even better.
          As always, I appreciate your feedback and suggestions for how I can
          continue to improve the website. Thank you for using StarterTab 😎
        </Text>
      </Box>
    </Box>
  );
};
