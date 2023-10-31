import { SuggestionsWithVotes } from "@/types/suggestions";
import { Box } from "@chakra-ui/react";
import React from "react";

interface SuggestionCardProps {
  suggestion: SuggestionsWithVotes;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
}) => {
  return (
    <Box shadow="md" border="1px solid black">
      {suggestion.suggestion}
    </Box>
  );
};
