import { SuggestionData } from "@/types/suggestions";
import { Box, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SuggestionCard } from "./SuggestionCard";

interface SuggestionListProps {}

const fetchSuggestions = async () => {
  try {
    const res = await fetch(`/api/suggestions`);
    if (res.status >= 400) {
      throw new Error("Failed request");
    }

    const data = (await res.json()) as SuggestionData;
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const SuggestionList: React.FC<SuggestionListProps> = ({}) => {
  const { data, error, isLoading } = useQuery(["suggestions"], () =>
    fetchSuggestions()
  );

  React.useEffect(() => {
    try {
      fetchSuggestions();
    } catch {}
  }, []);

  return (
    <Grid
      my="6"
      gap="6"
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
    >
      {data?.suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
      ))}
    </Grid>
  );
};
