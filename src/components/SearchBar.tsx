import {
  Button,
  Center,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DuckDuckGoDarkIcon } from "./icons/DuckDuckGoDarkIcon";
import { DuckDuckGoLightIcon } from "./icons/DuckDuckGoLightIcon";
import { GoogleDarkIcon } from "./icons/GoogleDarkIcon";
import { GoogleLightIcon } from "./icons/GoogleDarkLightIcon";
import { StackOverFlowDarkIcon } from "./icons/StackOverFlowDarkIcon";
import { StackOverFlowLightIcon } from "./icons/StackOverFlowLightIcon";

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  const color = useColorModeValue("white", "#222222");
  const { colorMode } = useColorMode();

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
        {colorMode === "light" ? (
          <DuckDuckGoLightIcon w={10} h={10} />
        ) : (
          <DuckDuckGoDarkIcon w={10} h={10} />
        )}
      </Button>
      <Button bg="transparent" onClick={() => searchClick("google")}>
        {colorMode === "light" ? (
          <GoogleLightIcon w={9} h={9} />
        ) : (
          <GoogleDarkIcon w={9} h={9} />
        )}
      </Button>
      <Button bg="transparent" onClick={() => searchClick("stackoverflow")}>
        {colorMode === "light" ? (
          <StackOverFlowLightIcon w={10} h={10} />
        ) : (
          <StackOverFlowDarkIcon w={10} h={10} />
        )}
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
