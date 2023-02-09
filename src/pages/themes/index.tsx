import { PersonalThemes } from "@/components/themes/PersonalThemes";
import { PublicThemes } from "@/components/themes/PublicThemes";
import { Footer } from "@/components/ui/Footer";
import { ThemePageHeader } from "@/components/ui/ThemePageHeader";
import { deepClone, saveThemeIdToLocalStorage } from "@/helpers/tileHelpers";
import useDebounce from "@/hooks/useDebounce";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { ThemeFilteringOptions, ThemeSettings } from "@/types";
import { ThemeDataFromAPI, ThemeWithVotes } from "@/types/marketplace";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const queryClient = new QueryClient();

const ManageThemes: React.FC = ({}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingPublicThemes, setShowingPublicThemes] = useState(false);
  // lifted this up so that once a new theme is shared, I can show theirs at the top
  const [orderingMethod, setOrderingMethod] =
    useState<ThemeFilteringOptions>("Popularity");
  const [searchFilter, setSearchFilter] = useState<string | undefined>();
  const [reverseOrdering, setReverseOrdering] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchFilter ?? "", 750);

  const {
    data: publicThemes,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["publicThemes", debouncedSearchTerm, orderingMethod, reverseOrdering],
    async ({ pageParam = "" }) => {
      const res = await fetch(
        `/api/themes/item?cursor=${pageParam}&searchTerm=${searchFilter}&orderBy=${orderingMethod}&reverseOrdering=${reverseOrdering}`
      );
      const data = (await res.json()) as ThemeDataFromAPI;
      return data;
    },
    {
      retry: 2,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    document.body.style.background = "#fafafa";
    if (router.asPath.includes("#public")) {
      setShowingPublicThemes(true);
    }
  }, [router]);

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

  const cloneTheme = (theme: ThemeSettings) => {
    const newSettings = deepClone(settings);
    const newTheme = deepClone(theme);

    newTheme.themeName =
      theme.themeName.length >= 15
        ? theme.themeName.slice(0, 10) + " copy"
        : theme.themeName + " copy";

    window.scrollTo(0, 0);
    newSettings.themes.unshift(newTheme);
    setSettings(newSettings);
  };

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

  const saveThemeToSettings = async (theme: ThemeWithVotes) => {
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

    // not a biggie if this fails, just updating a download count for each theme
    try {
      const res = await fetch(`api/themes/item/download?themeId=${theme.id}`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to update download count");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const changeThemeNameInSettings = useCallback(
    (theme: ThemeSettings, newName: string) => {
      if (theme.themeName === newName) {
        return;
      }

      if (newName.length < 3 || newName.length > 20) {
        return;
      }

      const newSettings = deepClone(settings);
      const indexOfOldTheme = newSettings.themes.findIndex(
        (themeToFind) => themeToFind.themeName === theme.themeName
      );
      if (indexOfOldTheme < 0) {
        return;
      }

      newSettings.themes[indexOfOldTheme].themeName = newName;
      setSettings(newSettings);
    },
    [setSettings, settings]
  );

  const handleOrderingMethodChange = (newValue: ThemeFilteringOptions) => {
    setOrderingMethod(newValue);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Box
          width={["500px", "95%", "90%", "84%", "72%"]}
          mx="auto"
          py="6"
          px="2"
          maxW="1500px"
          color="black"
        >
          <ThemePageHeader showingPublicThemes={showingPublicThemes} />
          <Flex mt="4">
            <Button
              variant="soft-rounded"
              color={showingPublicThemes ? "gray.600" : "#276749"}
              bg={showingPublicThemes ? undefined : "#C6F6D5"}
              borderRadius="3xl"
              onClick={() => setShowingPublicThemes(false)}
            >
              My Themes
            </Button>
            <Button
              variant="soft-rounded"
              bg={showingPublicThemes ? "#C6F6D5" : undefined}
              color={showingPublicThemes ? "#276749" : "gray.600"}
              borderRadius="3xl"
              onClick={() => setShowingPublicThemes(true)}
            >
              Public Themes
            </Button>
          </Flex>
        </Box>
        {showingPublicThemes ? (
          <Box
            width={["500px", "95%", "90%", "84%", "72%"]}
            mx="auto"
            px="2"
            maxW="1500px"
            color="black"
          >
            <PublicThemes
              themes={publicThemes}
              loading={isLoading}
              orderingMethod={orderingMethod}
              setOrderingMethod={handleOrderingMethodChange}
              isFetchingNextPage={isFetchingNextPage}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              saveThemeToSettings={saveThemeToSettings}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              setReverseOrdering={setReverseOrdering}
              reverseOrdering={reverseOrdering}
              errorLoadingThemes={isError}
            />
          </Box>
        ) : (
          <>
            <Box
              width={["500px", "95%", "90%", "84%", "72%"]}
              mx="auto"
              px="2"
              maxW="1500px"
              color="black"
              pb="16"
            >
              <PersonalThemes
                copyToClipboard={copyToClipboard}
                deleteTheme={deleteTheme}
                themes={settings.themes}
                setShowingPublicThemes={setShowingPublicThemes}
                refetch={refetch}
                setOrderingMethod={handleOrderingMethodChange}
                changeThemeNameInSettings={changeThemeNameInSettings}
                setReverseOrdering={setReverseOrdering}
                cloneTheme={cloneTheme}
              />
            </Box>
            <Footer bg="#fafafa" />
          </>
        )}
      </>
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
