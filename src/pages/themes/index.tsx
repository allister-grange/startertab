import { PersonalThemes } from "@/components/themes/PersonalThemes";
import { PublicThemes } from "@/components/themes/PublicThemes";
import { ThemePageHeader } from "@/components/ui/ThemePageHeader";
import { deepClone } from "@/helpers/tileHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtom";
import { ThemeFilteringOptions, ThemeSettings } from "@/types";
import { ThemeWithVotes } from "@/types/marketplace";
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
  useQuery,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const queryClient = new QueryClient();

const fetchThemes = async () => {
  const items = await fetch("/api/marketplace/item");
  const data = (await items.json()) as ThemeWithVotes[];
  return data;
};

const ManageThemes: React.FC = ({}) => {
  const [settings, setSettings] = useRecoilState(userSettingState);
  const [showingPublicThemes, setShowingPublicThemes] = useState(false);
  // lifted this up so that once a new theme is shared, I can show theirs at the top
  const [orderingMethod, setOrderingMethod] =
    useState<ThemeFilteringOptions>("Popularity");

  const {
    data: publicThemes,
    error,
    isLoading,
    refetch,
  } = useQuery(["publicThemes"], fetchThemes, {
    retry: 2,
  });

  const toast = useToast();

  useEffect(() => {
    document.body.style.background = "#F7F8FA";
  }, []);

  const showClipboardToast = useCallback(
    (val?: string) => {
      toast({
        title: `Got it! ${val ?? ""}`,
        status: "info",
        duration: 1000,
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
