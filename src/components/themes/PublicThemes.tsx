import { ThemeWithVotes } from "@/types/marketplace";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Input, Select } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { PreviewThemeCardSkeleton } from "../skeletons/PreviewThemeCardSkeleton";
import { OutlinedButton } from "../ui/OutlinedButton";
import { MarketPlaceThemeCard } from "./MarketplaceThemeCard";

interface PublicThemesProps {
  themes?: ThemeWithVotes[];
  loading: boolean;
}

type FilteringMethods = "Popularity" | "Author" | "Created on";

export const PublicThemes: React.FC<PublicThemesProps> = ({
  themes,
  loading,
}) => {
  const [orderingMethod, setOrderingMethod] =
    useState<FilteringMethods>("Popularity");
  const [reverseOrdering, setReverseOrdering] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string | undefined>();

  const onSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  const orderThemes = (themes: ThemeWithVotes[]) => {
    themes.sort((a, b) => {
      switch (orderingMethod) {
        case "Popularity":
          return b.votes.length - a.votes.length;

        case "Author":
          return b.author.localeCompare(a.author);

        case "Created on":
          console.log("here");

          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
    if (reverseOrdering) {
      themes.reverse();
    }
  };

  orderThemes(themes ?? []);
  if (searchFilter && themes) {
    themes = themes.filter((theme) => theme.name.includes(searchFilter));
  }

  return (
    <Box>
      <Flex justifyContent="center" mt="2" gap="4" alignItems="center">
        <Input
          width="60%"
          border="2px solid black"
          placeholder="Find a theme"
          value={searchFilter}
          onChange={onSearchFilterChange}
        />
        <Select
          width="20%"
          placeholder="Order by"
          onChange={(e) =>
            setOrderingMethod(e.target.value as FilteringMethods)
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
      {loading ? (
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
      ) : (
        <Grid
          templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
          gap="4"
          mt="8"
          justifyItems="center"
        >
          {themes &&
            themes.map((theme) => (
              <MarketPlaceThemeCard key={theme.id} theme={theme} />
            ))}
        </Grid>
      )}
    </Box>
  );
};
