import { SuggestionForm } from "@/components/suggestions/SuggestionForm";
import { SuggestionList } from "@/components/suggestions/SuggestionList";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SuggestionData } from "@/types/suggestions";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SuggestionsContainerProps {}

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

export const SuggestionsContainer: React.FC<
  SuggestionsContainerProps
> = ({}) => {
  const { data, error, isLoading, refetch, isFetched } = useQuery(
    ["suggestions"],
    () => fetchSuggestions()
  );
  const newSuggestionFormRef = React.useRef<HTMLDivElement>(null);

  const onScrollToSuggestionFormClick = () => {
    if (newSuggestionFormRef) {
      newSuggestionFormRef.current?.scrollIntoView();
    }
  };

  return (
    <>
      {isFetched && (
        <OutlinedButton
          shadow="md"
          borderColor="coral"
          mt="3"
          mx="auto"
          onClick={onScrollToSuggestionFormClick}
        >
          Jump to adding a suggestion
          <ArrowDownIcon ml="1" />
        </OutlinedButton>
      )}
      <SuggestionList
        suggestionsData={data}
        isLoading={isLoading}
        error={error}
      />
      <SuggestionForm
        refetchSuggestions={refetch}
        newSuggestionFormRef={newSuggestionFormRef}
      />
    </>
  );
};
