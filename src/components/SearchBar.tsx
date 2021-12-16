import { AddIcon, ArrowDownIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, Center, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DuckDuckGoIcon } from "./DuckDuckGoIcon";
import { GoogleIcon } from "./GoogleIcon";
import { StackOverFlowIcon } from "./StackOverFlowIcon";

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  type AppTypes = "google" | "duck" | "stackoverflow";

  const searchClick = (app: AppTypes) => {
    console.log(app);

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
      <Button onClick={() => searchClick("duck")}>
        <DuckDuckGoIcon w={10} h={10} />
      </Button>
      <Button onClick={() => searchClick("google")}>
        <GoogleIcon w={9} h={9} />
      </Button>
      <Button onClick={() => searchClick("stackoverflow")}>
        <StackOverFlowIcon w={10} h={10} />
      </Button>
      <Input
        width={400}
        bg="white"
        color="#202020"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </Center>
  );
};
