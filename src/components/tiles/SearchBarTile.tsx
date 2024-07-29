import { optionsStyles } from "@/helpers/selectOptionStyles";
import { searchEngineOptions } from "@/helpers/tileHelpers";
import { isEditingTileGridAtom } from "@/recoil/SidebarAtoms";
import { defaultSearchEngineSelector } from "@/recoil/UserSettingsSelectors";
import { SearchEngineDefault } from "@/types";
import { Center, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

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
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isEditing = useRecoilValue(isEditingTileGridAtom);
  const color = `var(--text-color-${tileId})`;

  // our engine should be Google by default
  if (!defaultSearchEngine) {
    setDefaultSearchEngine(
      searchEngineOptions.find((engine) => engine.name === "Google")
    );
  }

  /**
   * add a listener on to the site when the search bar tile is present to use '/'
   * to snap you to the search bar
   */
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== searchRef.current) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /**
   * @param searchEngine must align with a 'name' key in searchEngineOptions
   */
  const search = () => {
    window.top!.location.href = defaultSearchEngine!.url + searchTerm;
  };

  const onSelectDefaultSearchEngineChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const searchEngineChoice = searchEngineOptions.find(
      (engine) => engine.name === e.target.value
    );

    if (searchEngineChoice) {
      setDefaultSearchEngine(searchEngineChoice);
    }
  };

  const onKeyDownInForm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  return (
    <Center height="100%">
      {/* showing the user options to change their default search engine */}
      {isEditing ? (
        <Select
          w="80%"
          onChange={onSelectDefaultSearchEngineChange}
          value={defaultSearchEngine?.name}
          borderColor={color}
        >
          {searchEngineOptions.map((option) => (
            <option key={option.url} value={option.name} style={optionsStyles}>
              {option.name}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          ref={searchRef}
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
          placeholder={`search me`}
          onKeyDown={onKeyDownInForm}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      )}
    </Center>
  );
};
