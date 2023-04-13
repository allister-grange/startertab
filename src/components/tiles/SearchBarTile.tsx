import {
  DuckDuckGoIcon,
  GoogleIcon,
  StackOverFlowIcon,
} from "@/components/icons";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { Center, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

type SearchBarProps = {
  tileId: number;
};

export const SearchBarTile: React.FC<SearchBarProps> = ({ tileId }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
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

  const onKeyDownInForm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchClick("google");
    }
  };

  return (
    <Center height="100%">
      <OutlinedButton
        shadow="none"
        onClick={() => searchClick("duck")}
        aria-label="Search with DuckDuckGo"
      >
        <DuckDuckGoIcon w={10} h={10} fill={color} />
      </OutlinedButton>
      <OutlinedButton
        shadow="none"
        onClick={() => searchClick("google")}
        aria-label="Search with Google"
      >
        <GoogleIcon width={32} height={32} fill={color} />
      </OutlinedButton>
      <OutlinedButton
        shadow="none"
        onClick={() => searchClick("stackoverflow")}
        aria-label="Search Google with Stack Overflow"
      >
        <StackOverFlowIcon width={50} height={50} fill={color} />
      </OutlinedButton>
      <Input
        width="45%"
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
    </Center>
  );
};
