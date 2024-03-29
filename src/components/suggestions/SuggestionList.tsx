import { SuggestionData } from "@/types/suggestions";
import { Alert, AlertIcon, Grid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { SuggestionCard } from "./SuggestionCard";

interface SuggestionListProps {
  suggestionsData?: SuggestionData;
  isLoading: boolean;
  error: unknown;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestionsData,
  isLoading,
  error,
}) => {
  let toDisplay;

  if (error) {
    toDisplay = (
      <Alert status="error" borderRadius="md" my="12" py="4">
        <AlertIcon />
        <Text>Sorry, I can&apos;t pull down suggestions right now 🤕</Text>
      </Alert>
    );
  } else if (isLoading) {
    toDisplay = <Spinner color="orange" mx="auto" my="4" size="md" />;
  } else {
    toDisplay = (
      <Grid
        my="6"
        gap="6"
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
      >
        {suggestionsData?.suggestions
          // we want the completed suggestions to appear last, and the most votes to come first
          .sort((a, b) => {
            if (a.completed === b.completed) {
              return b.votes.length - a.votes.length;
            }

            return a.completed ? 1 : -1;
          })
          .map((suggestion) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} />
          ))}
      </Grid>
    );
  }

  return toDisplay;
};
