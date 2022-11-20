import { getThemeIdsFromLocalStorage } from "@/helpers/tileHelpers";
import { ThemeFilteringOptions } from "@/types";
import { ThemeDataFromAPI, ThemeWithVotes } from "@/types/marketplace";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading, Input, Select } from "@chakra-ui/react";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import React, { FC, useState } from "react";
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  InfiniteLoader as _InfiniteLoader,
  InfiniteLoaderProps,
  List as _List,
  ListProps,
  ListRowProps,
  WindowScroller as _WindowScroller,
  WindowScrollerProps,
} from "react-virtualized";
import { PreviewThemeCardSkeleton } from "../skeletons/PreviewThemeCardSkeleton";
import { OutlinedButton } from "../ui/OutlinedButton";
import { MarketPlaceThemeCard } from "./MarketplaceThemeCard";
const List = _List as unknown as FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;
const WindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>;
const InfiniteLoader = _InfiniteLoader as unknown as FC<InfiniteLoaderProps>;

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
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<ThemeDataFromAPI, unknown>
  >;
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
  saveThemeToSettings,
  fetchNextPage,
}) => {
  const [reverseOrdering, setReverseOrdering] = useState<boolean>(false);
  const themesAlreadyDownloaded = getThemeIdsFromLocalStorage();
  const orderThemes = (themes?: InfiniteData<ThemeDataFromAPI>) => {
    if (!themes) {
      return [];
    }
    const combinedArray = themes.pages.flatMap((page) => page.themes);
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
  console.log(orderedThemes.length);

  if (searchFilter && orderedThemes) {
    orderedThemes = orderedThemes.filter(
      (theme) =>
        theme.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        theme.tags.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  const isRowLoaded = (index: number): boolean => {
    if (index < 40) {
      return false;
    }

    return true;
  };

  const renderRow = (index: ListRowProps) => {
    const theme = orderedThemes[index.index];
    return (
      <Box mt="4" style={index.style}>
        <MarketPlaceThemeCard
          theme={theme}
          key={theme.id}
          setSearchFilter={setSearchFilter}
          saveThemeToSettings={saveThemeToSettings}
          saveDisabled={themesAlreadyDownloaded.includes(theme.id.toString())}
        />
      </Box>
      // <div>{theme.name}</div>
    );
  };

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
      <div className="WindowScrollerWrapper">
        <InfiniteLoader
          isRowLoaded={(index) => isRowLoaded(index.index)}
          loadMoreRows={(indexRange) => fetchNextPage()}
          rowCount={orderedThemes.length}
          threshold={2}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      ref={registerChild}
                      className="List"
                      autoHeight
                      height={height}
                      width={width}
                      onRowsRendered={onRowsRendered}
                      rowCount={orderedThemes.length}
                      rowHeight={420}
                      rowRenderer={(index) => renderRow(index)}
                      scrollTop={scrollTop}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
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
      {/* {isFetchingNextPage || isFetching ? (
        <Box width="100%" textAlign="center" pos="fixed" bottom="5">
          <Spinner size="xl" color="lightgreen" />
        </Box>
      ) : null} */}

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
