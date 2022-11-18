import { PersonalThemes } from "@/components/themes/PersonalThemes";
import { PublicThemes } from "@/components/themes/PublicThemes";
import { ThemePageHeader } from "@/components/ui/ThemePageHeader";
import { deepClone, saveThemeIdToLocalStorage } from "@/helpers/tileHelpers";
import useDebounce from "@/hooks/useDebounce";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { ThemeFilteringOptions, ThemeSettings } from "@/types";
import { ThemeDataFromAPI, ThemeWithVotes } from "@/types/marketplace";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";

const queryClient = new QueryClient();

const ManageThemes: React.FC = ({}) => {
  const { ref, inView } = useInView();
  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingPublicThemes, setShowingPublicThemes] = useState(false);
  // lifted this up so that once a new theme is shared, I can show theirs at the top
  const [orderingMethod, setOrderingMethod] =
    useState<ThemeFilteringOptions>("Popularity");
  const [searchFilter, setSearchFilter] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchFilter ?? "", 750);

  const {
    data: publicThemes,
    isLoading,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["publicThemes", debouncedSearchTerm],
    async ({ pageParam = "" }) => {
      const res = await fetch(
        `/api/marketplace/item?cursor=${pageParam}&searchTerm=${searchFilter}`
      );
      const data = (await res.json()) as ThemeDataFromAPI;
      return data;
    },
    {
      retry: 2,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  const toast = useToast();

  useEffect(() => {
    document.body.style.background = "#F7F8FA";
    if (
      inView &&
      hasNextPage &&
      publicThemes
      // publicThemes?.pages[0].themes.length > 1
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, publicThemes]);

  const showClipboardToast = useCallback(
    (val?: string) => {
      toast({
        title: `Copied theme to clipboard ${val ?? ""}`,
        status: "info",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    },
    [toast]
  );

  const showSavedThemeToast = useCallback(
    (val?: string) => {
      toast({
        title: `Saved theme! 🎉`,
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    },
    [toast]
  );

  const copyToClipboard = (value: string, message?: string) => {
    navigator.clipboard.writeText(value);
    showClipboardToast(message);
  };

  const deleteTheme = (theme: ThemeSettings) => {
    const clonedSettings = deepClone(settings);
    const index = clonedSettings.themes.findIndex(
      (themeToFind) => themeToFind.themeName === theme.themeName
    );

    if (index > -1) {
      clonedSettings.themes.splice(index, 1);
    }

    setSettings(clonedSettings);
  };

  const saveThemeToSettings = (theme: ThemeWithVotes) => {
    const clonedSettings = deepClone(settings);
    let themeNameCollision = false;
    let newTheme = deepClone(theme.data) as unknown as ThemeSettings;

    clonedSettings.themes.forEach((themeToSearch) => {
      if (themeToSearch.themeName === theme.name) {
        themeNameCollision = true;
      }
    });

    if (themeNameCollision) {
      newTheme.themeName = newTheme.themeName + " copy";
    }

    newTheme.downloadedFromMarketplace = true;
    clonedSettings.themes.unshift(newTheme);
    setSettings(clonedSettings);
    showSavedThemeToast();
    saveThemeIdToLocalStorage(theme.id);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box
        width={["100%", "90%", "90%", "80%", "70%"]}
        mx="auto"
        py="6"
        px="2"
        maxW="1500px"
      >
        <ThemePageHeader showingPublicThemes={showingPublicThemes} />
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          mt="4"
          onChange={(index) => setShowingPublicThemes(index == 1)}
          index={showingPublicThemes ? 1 : 0}
        >
          <TabList>
            <Tab>My themes</Tab>
            <Tab>Public themes</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <PersonalThemes
                copyToClipboard={copyToClipboard}
                deleteTheme={deleteTheme}
                themes={settings.themes}
                setShowingPublicThemes={setShowingPublicThemes}
                refetch={refetch}
                setOrderingMethod={setOrderingMethod}
              />
            </TabPanel>
            <TabPanel>
              <PublicThemes
                themes={publicThemes}
                loading={isLoading}
                orderingMethod={orderingMethod}
                setOrderingMethod={setOrderingMethod}
                scrollRef={ref}
                isFetchingNextPage={isFetchingNextPage}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                isFetching={isFetching}
                saveThemeToSettings={saveThemeToSettings}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </QueryClientProvider>
  );
};

function ManageThemesWrapper() {
  return (
    // Initializing another provider here as we don't need the caching in local storage
    <QueryClientProvider client={queryClient}>
      <ManageThemes />
    </QueryClientProvider>
  );
}

export default ManageThemesWrapper;
