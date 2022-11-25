import { PreviewThemeCardSkeleton } from "@/components/skeletons/PreviewThemeCardSkeleton";
import { MarketPlaceThemeCard } from "@/components/themes/MarketplaceThemeCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { getThemeIdsFromLocalStorage } from "@/helpers/tileHelpers";
import { ThemeFilteringOptions } from "@/types";
import { ThemeDataFromAPI, ThemeWithVotes } from "@/types/marketplace";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import React, { FC, useRef, useState } from "react";
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  InfiniteLoader as _InfiniteLoader,
  InfiniteLoaderProps,
  List as _List,
  ListProps,
  WindowScroller as _WindowScroller,
  WindowScrollerProps,
} from "react-virtualized";
const List = _List as unknown as FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;
const WindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>;
const InfiniteLoader = _InfiniteLoader as unknown as FC<InfiniteLoaderProps>;

interface PublicThemesProps {
  themes?: InfiniteData<ThemeDataFromAPI>;
  loading: boolean;
  setOrderingMethod: (newValue: ThemeFilteringOptions) => void;
  orderingMethod: ThemeFilteringOptions;
  isFetchingNextPage: boolean;
  setSearchFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchFilter?: string;
  saveThemeToSettings: (theme: ThemeWithVotes) => void;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<ThemeDataFromAPI, unknown>
  >;
  hasNextPage?: boolean;
  setReverseOrdering: React.Dispatch<React.SetStateAction<boolean>>;
  reverseOrdering: boolean;
  errorLoadingThemes: boolean;
}

export const PublicThemes: React.FC<PublicThemesProps> = ({
  themes,
  loading,
  setOrderingMethod,
  orderingMethod,
  setSearchFilter,
  searchFilter,
  saveThemeToSettings,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  setReverseOrdering,
  reverseOrdering,
  errorLoadingThemes,
}) => {
  const themesAlreadyDownloaded = getThemeIdsFromLocalStorage();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [listDivWidth, setListDivWidth] = useState(1000);

  React.useLayoutEffect(() => {
    // when the component gets mounted
    setListDivWidth(divRef.current ? divRef.current.offsetWidth : 1000);

    // to handle page resize
    const getWidth = () => {
      setListDivWidth(divRef.current ? divRef.current.offsetWidth : 1000);
    };

    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, []);

  const orderThemes = (themes?: InfiniteData<ThemeDataFromAPI>) => {
    if (!themes) {
      return [];
    }

    const combinedArray: ThemeWithVotes[] = [];
    themes.pages.map((page) => {
      if (!page.themes) {
        console.log("not found g");
      } else {
        page.themes.map((theme) => combinedArray.push(theme));
      }
    });

    combinedArray.sort((a, b) => {
      switch (orderingMethod) {
        case "Popularity":
          return b.votes.length - a.votes.length;
        case "Author":
          return b.author.localeCompare(a.author);
        case "Name":
          return b.name.localeCompare(a.name);
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

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isFetchingNextPage ? async () => {} : fetchNextPage;

  const isRowLoaded = (index: number) => {
    const itemsOnRowCount = Math.floor(listDivWidth / 480);
    return !hasNextPage || index < orderedThemes.length / itemsOnRowCount;
  };

  const rowCount = hasNextPage
    ? orderedThemes.length + 1
    : orderedThemes.length;

  let toDisplay;

  if (errorLoadingThemes) {
    toDisplay = (
      <Box gap="4" mt="8" justifyItems="center" textAlign="center">
        <Heading as="h2" fontSize="2xl">
          Error loading themes, sorry 😔
        </Heading>
        <Heading as="h2" fontSize="xl" mt="3" color="gray.700">
          If this persists, please open a ticket on the{" "}
          <a
            style={{ textDecoration: "underline" }}
            href="https://github.com/allister-grange/startertab"
          >
            Github
          </a>
        </Heading>
      </Box>
    );
  } else if (loading) {
    toDisplay = (
      <Flex flexWrap="wrap" gap="10" mt="8" justifyContent="center">
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
        <PreviewThemeCardSkeleton />
      </Flex>
    );
  } else if (themes && themes.pages[0].themes.length === 0) {
    toDisplay = (
      <Box gap="4" mt="8" justifyItems="center" textAlign="center">
        <Heading as="h2" fontSize="2xl">
          No results, sorry 😔
        </Heading>
      </Box>
    );
  } else {
    toDisplay = (
      <Box className="WindowScrollerWrapper" mt="8" ref={divRef}>
        <InfiniteLoader
          isRowLoaded={(index) => isRowLoaded(index.index)}
          loadMoreRows={() => loadMoreRows()}
          rowCount={rowCount}
          threshold={4}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => {
                    const itemsPerRow = Math.floor(width / 480);
                    const rowCount = Math.ceil(
                      orderedThemes.length / itemsPerRow
                    );

                    return (
                      <List
                        ref={registerChild}
                        className="List"
                        autoHeight
                        height={height}
                        width={width}
                        onRowsRendered={onRowsRendered}
                        rowCount={rowCount}
                        rowHeight={456}
                        scrollTop={scrollTop}
                        overscanRowCount={4}
                        rowRenderer={(index) => {
                          const fromIndex = index.index * itemsPerRow;
                          const toIndex = Math.min(
                            fromIndex + itemsPerRow,
                            orderedThemes.length
                          );

                          const themesInLine = orderedThemes.slice(
                            fromIndex,
                            toIndex
                          );

                          if (!themesInLine[0]) {
                            return;
                          }

                          return (
                            <Box
                              display="flex"
                              justifyContent="center"
                              columnGap="12"
                              key={index.key}
                              style={index.style}
                            >
                              {themesInLine.map((theme) => (
                                <MarketPlaceThemeCard
                                  theme={theme}
                                  key={theme.id}
                                  setSearchFilter={setSearchFilter}
                                  saveThemeToSettings={saveThemeToSettings}
                                  saveDisabled={themesAlreadyDownloaded.includes(
                                    theme.id.toString()
                                  )}
                                />
                              ))}
                            </Box>
                          );
                        }}
                      />
                    );
                  }}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </Box>
    );
  }

  return (
    <Box h="100%">
      <Flex justifyContent="center" gap="4" alignItems="center" mt="6">
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
          <option>Name</option>
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
    </Box>
  );
};
