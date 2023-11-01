import { SuggestionData } from "@/types/suggestions";
import { Box, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SuggestionCard } from "./SuggestionCard";

interface SuggestionListProps {
  suggestionsData?: SuggestionData;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestionsData,
}) => {
  return (
    <Grid
      my="6"
      gap="6"
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
      zIndex={-1}
    >
      {suggestionsData?.suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
      ))}
    </Grid>
  );
};
