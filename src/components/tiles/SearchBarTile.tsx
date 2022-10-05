import {
  DuckDuckGoIcon,
  GoogleIcon,
  StackOverFlowIcon,
} from "@/components/icons";
import { TileId } from "@/types";
import { Center, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

type SearchBarProps = {
  tileId: TileId;
};

export const SearchBarTile: React.FC<SearchBarProps> = ({ tileId }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  const color = `var(--text-color-${tileId})`;

  type AppTypes = "google" | "duck" | "stackoverflow";

  const searchClick = (app: AppTypes) => {
    switch (app) {
      case "google":
        router.push(`https://google.com/search?q=${searchTerm}`);
        return;
      case "duck":
        router.push(`https://duckduckgo.com/?q=${searchTerm}`);
        return;
      case "stackoverflow":
        router.push(
          `https://google.com/search?q=${searchTerm}+site%3Astackoverflow.com`
        );
        return;
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
        <GoogleIcon w={9} h={9} fill={color} />
      </OutlinedButton>
      <OutlinedButton
        shadow="none"
        onClick={() => searchClick("stackoverflow")}
        aria-label="Search Google with Stack Overflow"
      >
        <StackOverFlowIcon w={10} h={10} fill={color} />
      </OutlinedButton>
      <Input
        width="45%"
        color={color}
        _placeholder={{
          color: color,
        }}
        _focus={{
          border: "0",
          borderBottom: "1px",
        }}
        border="0"
        borderBottom="1px"
        borderRadius="0"
        background="transparent"
        placeholder="search me"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </Center>
  );
};
