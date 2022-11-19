import { getThemeIdsFromLocalStorage } from "@/helpers/tileHelpers";
import { ThemeFilteringOptions } from "@/types";
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
import React, { forwardRef, LegacyRef, ReactElement, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
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
  saveThemeToSettings: (theme: ThemeWithVotes) => void;
}

// eslint-disable-next-line react/display-name
const innerElementType = forwardRef(({ ...rest }, ref) => (
  <ul
    ref={ref as LegacyRef<HTMLUListElement>}
    {...rest}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
    }}
    className="innerClass"
  />
));

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
  saveThemeToSettings,
}) => {
  const [reverseOrdering, setReverseOrdering] = useState<boolean>(false);
  // const { ref, inView } = useInView()

  const themesAlreadyDownloaded = getThemeIdsFromLocalStorage();
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
      <AutoSizer>
        {({ height, width }) => {
          const itemsPerRow = Math.floor(width / 480);
          const rowCount = Math.ceil(orderedThemes.length / itemsPerRow);

          return (
            <List
              innerElementType={innerElementType}
              itemData={orderedThemes}
              itemCount={rowCount}
              itemSize={420}
              height={height}
              width={width}
              overscanCount={6}
              style={{
                marginTop: "20px",
                overflow: "unset",
                display: "flex",
                flexWrap: "wrap",
                rowGap: "17px",
              }}
            >
              {({ data, index, style }) => {
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(
                  fromIndex + itemsPerRow,
                  orderedThemes.length
                );
                const itemsToRender = orderedThemes.slice(fromIndex, toIndex);
                const toReturn = itemsToRender.map((theme) => (
                  <MarketPlaceThemeCard
                    theme={theme}
                    key={theme.id}
                    setSearchFilter={setSearchFilter}
                    saveThemeToSettings={saveThemeToSettings}
                    saveDisabled={themesAlreadyDownloaded.includes(
                      theme.id.toString()
                    )}
                  />
                ));

                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "17px",
                      marginTop: "17px",
                    }}
                  >
                    {toReturn}
                  </div>
                );
              }}
            </List>
          );
        }}
      </AutoSizer>
    );
  }

  return (
    <Box h="100%">
      <Flex justifyContent="center" mt="2" gap="4" alignItems="center">
        <Input
          width="60%"
          border="2px solid black"
          placeholder="Find a theme (author, name or tag)"
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
        <Box width="100%" textAlign="center" pos="fixed" bottom="5">
          <Spinner size="xl" color="lightgreen" />
        </Box>
      ) : null}

      {/* {themes && themes.pages[0].themes.length > 0 ? (
        <span
          style={{ visibility: "hidden", position: "fixed", bottom: "5" }}
          ref={scrollRef}
        >
          intersection observer marker
        </span>
      ) : null} */}
    </Box>
  );
};
