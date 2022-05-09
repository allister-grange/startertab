import {
  Button,
  Center,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  DuckDuckGoIcon,
  GoogleIcon,
  StackOverFlowIcon,
} from "@/components/icons";
import { TileId } from "@/types";

type SearchBarProps ={
  tileId: TileId;
}

export const SearchBar: React.FC<SearchBarProps> = ({tileId}) => {
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
      <Button bg="transparent" onClick={() => searchClick("duck")}>
        <DuckDuckGoIcon w={10} h={10} fill={color}/>
      </Button>
      <Button bg="transparent" onClick={() => searchClick("google")}>
        <GoogleIcon w={9} h={9} fill={color}/>
      </Button>
      <Button bg="transparent" onClick={() => searchClick("stackoverflow")}>
        <StackOverFlowIcon w={10} h={10} fill={color}/>
      </Button>
      <Input
        width={400}
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
