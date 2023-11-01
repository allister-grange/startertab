import { Header } from "@/components/landing-page/LandingPageHeader";
import { SuggestionsContainer } from "@/components/suggestions/SuggestionsContainer";
import { Footer } from "@/components/ui/Footer";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";

const queryClient = new QueryClient();

export const SuggestionsPage: React.FC = ({}) => {
  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
          pb="6"
        >
          <Heading>Suggestions 🗳️</Heading>
          <Heading as="h2" color="gray.600" fontSize="xl">
            A place to suggest new tile ideas, as well as give general feedback
            for the app
          </Heading>
          <SuggestionsContainer />
        </Flex>

        <Footer />
      </Box>
    </QueryClientProvider>
  );
};

export default SuggestionsPage;
