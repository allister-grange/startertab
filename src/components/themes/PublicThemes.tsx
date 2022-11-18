import { ThemeFilteringOptions, ThemeSettings } from "@/types";
import { ThemeDataFromAPI, ThemeWithVotes } from "@/types/marketplace";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { PreviewThemeCardSkeleton } from "../skeletons/PreviewThemeCardSkeleton";
import { OutlinedButton } from "../ui/OutlinedButton";
import { MarketPlaceThemeCard } from "./MarketplaceThemeCard";

interface PublicThemesProps {
  themes?: InfiniteData<ThemeDataFromAPI>;
  loading: boolean;
  setOrderingMethod: React.Dispatch<
    React.SetStateAction<ThemeFilteringOptions>
  >;
  orderingMethod: ThemeFilteringOptions;
  scrollRef: (node?: Element | null | undefined) => void;
  isFetchingNextPage: boolean;
  setSearchFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchFilter?: string;
  isFetching: boolean;
}

export const PublicThemes: React.FC<PublicThemesProps> = ({
  themes,
  loading,
  setOrderingMethod,
  orderingMethod,
  scrollRef,
  isFetchingNextPage,
  setSearchFilter,
  isFetching,
  searchFilter,
}) => {
  const [reverseOrdering, setReverseOrdering] = useState<boolean>(false);

  const orderThemes = (themes?: InfiniteData<ThemeDataFromAPI>) => {
    const combinedArray: ThemeWithVotes[] = [];

    themes?.pages.map((page) =>
      page.themes.map((theme) => combinedArray.push(theme))
    );

    combinedArray.sort((a, b) => {
      switch (orderingMethod) {
        case "Popularity":
          return b.votes.length - a.votes.length;
        case "Author":
          return b.author.localeCompare(a.author);
        case "Created on":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
    if (reverseOrdering) {
      combinedArray.reverse();
    }
    return combinedArray;
  };

  // create one array from all the pages, then sort it
  let orderedThemes = orderThemes(themes);
  if (searchFilter && orderedThemes) {
    orderedThemes = orderedThemes.filter(
      (theme) =>
        theme.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        theme.tags.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  let toDisplay;
  if (loading) {
    toDisplay = (
      <Grid
        templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
        gap="4"
        mt="8"
        justifyItems="center"
      >
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
      </Grid>
    );
  } else if (themes && themes.pages[0].themes.length === 0) {
    toDisplay = (
      <Box gap="4" mt="8" justifyItems="center" textAlign="center">
        <Heading as="h2" fontSize="2xl">
          No results, sorry
        </Heading>
      </Box>
    );
  } else {
    toDisplay = (
      <Grid
        templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
        gap="4"
        mt="8"
        justifyItems="center"
      >
        {orderedThemes.map((theme) => (
          <MarketPlaceThemeCard
            key={theme.id}
            theme={theme}
            setSearchFilter={setSearchFilter}
          />
        ))}
      </Grid>
    );
  }

  return (
    <Box>
      <Flex justifyContent="center" mt="2" gap="4" alignItems="center">
        <Input
          width="60%"
          border="2px solid black"
          placeholder="Find a theme"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <Select
          width="20%"
          placeholder="Order by"
          onChange={(e) =>
            setOrderingMethod(e.target.value as ThemeFilteringOptions)
          }
        >
          <option>Author</option>
          <option>Created on</option>
          <option>Popularity</option>
        </Select>
        <OutlinedButton
          shadow="none"
          onClick={() => setReverseOrdering((order) => !order)}
        >
          {reverseOrdering ? (
            <ChevronUpIcon boxSize="8" ml="-2" />
          ) : (
            <ChevronDownIcon boxSize="8" ml="-2" />
          )}
        </OutlinedButton>
      </Flex>
      {toDisplay}
      {isFetchingNextPage || isFetching ? (
        <Box width="100%" textAlign="center" mt="12">
          <Spinner size="xl" color="lightgreen" />
        </Box>
      ) : null}

      {themes && themes.pages[0].themes.length > 0 ? (
        <span style={{ visibility: "hidden" }} ref={scrollRef}>
          intersection observer marker
        </span>
      ) : null}
    </Box>
  );
};
