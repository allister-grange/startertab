import { MarketPlaceThemeCard } from "@/components/themes/MarketplaceThemeCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeSettings } from "@/types";
import { CreateThemeRequest, ThemeWithVotes } from "@/types/marketplace";
import { ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  Link,
  Select,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";

const Test: React.FC = () => {
  const [textAreaValue, setTextAreValue] = useState("");
  const [items, setItems] = useState<ThemeWithVotes[]>([]);

  useEffect(() => {
    document.body.style.background = "#F7F8FA";
    async function grabItems() {
      const items = await fetch("/api/marketplace/item");
      const data = (await items.json()) as ThemeWithVotes[];

      // const convertedThemeSettings = data.map(
      //   (theme) => theme.data as unknown as ThemeSettings
      // );

      setItems(data);
    }

    grabItems();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const toSend: CreateThemeRequest = {
      name: "Midnight Rider 2.0",
      data: JSON.parse(textAreaValue) as unknown as ThemeSettings,
      tags: ["productivity", "not", "fast"],
      author: "allig256",
    };

    await fetch("/api/marketplace/item/create", {
      method: "POST",
      body: JSON.stringify(toSend),
    });
  }

  return (
    <Box
      width={["100%", "90%", "80%", "80%", "70%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1500px"
    >
      <Flex direction={["column", "column", "row"]} mb="2" alignItems="center">
        <Box>
          <Heading fontSize="40px">Themes</Heading>
          <Heading as="h2" size="sm" color="gray.700">
            Find a new theme for yourself
          </Heading>
        </Box>
        <Link
          display="block"
          marginLeft={["0", "0", "auto"]}
          mt={["0", "0", "5"]}
          href="/"
        >
          Take me back to Starter Tab 👈
        </Link>
      </Flex>
      <hr style={{ width: "100%" }} />

      <Flex justifyContent="center" mt="4" gap="4" alignItems="center">
        <Input
          width="60%"
          border="2px solid black"
          placeholder="Find a theme"
        />
        <Select width="20%" placeholder="Order by">
          <option>Author</option>
          <option>Created on</option>
          <option>Popularity</option>
        </Select>
        <OutlinedButton shadow="none" onClick={() => "TODO please finish me"}>
          <ChevronDownIcon boxSize="8" ml="-2" />
        </OutlinedButton>
      </Flex>

      {/* <form onSubmit={onSubmit}>
        <Textarea
          mt="4"
          name="json"
          value={textAreaValue}
          onChange={(e) => setTextAreValue(e.target.value)}
        />
        <OutlinedButton type="submit">submit</OutlinedButton>
      </form> */}
      <Grid
        templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
        gap="4"
        mt="8"
        justifyItems="center"
      >
        {items.map((item) => (
          <MarketPlaceThemeCard key={item.id} theme={item} />
        ))}
      </Grid>
    </Box>
  );
};

export default Test;
