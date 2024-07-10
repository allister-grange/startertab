/**
 * Allow you to add in search terms like 'site:google' into the search bar
 * can I bring the input to the search bar with some keyboard shortcut??
 * test on different colored themes
 */

import { optionsStyles } from "@/helpers/selectOptionStyles";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import { defaultSearchEngineSelector } from "@/recoil/UserSettingsSelectors";
import { SearchEngineDefault } from "@/types";
import { Center, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

const searchEngineOptions: SearchEngineDefault[] = [
  {
    name: "Google",
    url: "https://google.com/search?q=",
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
  },
  {
    name: "StackOverFlow (using google)",
    url: "https://google.com/search?q=<search-term>+site%3Astackoverflow.com",
  },
];

type SearchBarProps = {
  tileId: number;
};

export const SearchBarTile: React.FC<SearchBarProps> = ({ tileId }) => {
  const [defaultSearchEngine, setDefaultSearchEngine] = useRecoilState(
    defaultSearchEngineSelector(tileId)
  ) as [
    SearchEngineDefault | undefined,
    SetterOrUpdater<SearchEngineDefault | undefined>
  ];

  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  const isEditing = useRecoilValue(sidebarOpenAtom);
  const color = `var(--text-color-${tileId})`;

  type AppTypes = "google" | "duck" | "stackoverflow";

  const searchClick = (app: AppTypes) => {
    switch (app) {
      case "google":
        window.top!.location.href = `https://google.com/search?q=${searchTerm}`;
        return;
      case "duck":
        window.top!.location.href = `https://duckduckgo.com/?q=${searchTerm}`;
        return;
      case "stackoverflow":
        window.top!.location.href = `https://google.com/search?q=${searchTerm}+site%3Astackoverflow.com`;
        return;
    }
  };

  const onSelectDefaultSearchEngineChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {};

  const onKeyDownInForm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchClick("google");
    }
  };

  return (
    <Center height="100%">
      {/* showing the user options to change their default search engine */}
      {isEditing ? (
        <Select w="80%" placeholder="default search engine">
          {searchEngineOptions.map((option) => (
            <option key={option.url} value={option.url} style={optionsStyles}>
              {option.name}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          width="80%"
          color={color}
          _placeholder={{
            color: color,
          }}
          _focus={{
            border: "0",
            outline: "0",
            borderBottom: "1px",
          }}
          _focusVisible={{
            borderBottom: "1px",
          }}
          border="0"
          borderBottom="1px"
          borderRadius="0"
          background="transparent"
          placeholder="search me"
          onKeyDown={onKeyDownInForm}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      )}
    </Center>
  );
};
