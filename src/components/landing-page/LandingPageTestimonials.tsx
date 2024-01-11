import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const LandingPageTestimonials: React.FC = ({}) => {
  return (
    <Box
      display="flex"
      gap="2rem"
      justifyContent="center"
      mt={["250px", "250px", "7rem"]}
      w={["90%", "70%", "90%"]}
      mx="auto"
      maxWidth="1170px"
      flexDir={["column", "column", "row", "row"]}
    >
      <Testimonial
        text="Started off wondering if I can build this extension to see HN feed, but this is absolutely wonderful."
        author="Venkat"
      />
      <Testimonial
        text="Wow. This add-on is amazing. Within a minute of seeing it I uninstalled my old new tab add-on, and it was a good move. Extremely useful AND highly aesthetic."
        author="Vedun"
      />
      <Testimonial
        text="Love the customisation and having the ability to create my own themes!"
        author="Natarsha"
      />
    </Box>
  );
};

function Testimonial({ text, author }: { text: string; author: string }) {
  return (
    <Box
      bg="#FFFFFF"
      p="8"
      borderRadius="16px"
      flex="1"
      alignItems="center"
      display="flex"
      fontWeight="600"
      color="gray.600"
      fontSize="md"
      pos="relative"
    >
      <Text pos="absolute" top="-2" left="2" fontSize="5xl" color="black">
        &quot;
      </Text>
      <Text>{text}</Text>
      <Text pos="absolute" bottom="2" right="4" fontSize="sm">
        - {author}
      </Text>
    </Box>
  );
}
