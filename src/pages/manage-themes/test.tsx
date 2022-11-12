import { MarketPlaceThemeCard } from "@/components/themes/MarketplaceThemeCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeSettings } from "@/types";
import { CreateThemeRequest, ThemeWithVotes } from "@/types/marketplace";
import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Grid, Textarea, Text } from "@chakra-ui/react";
import { Theme } from "@prisma/client";
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
      width={["100%", "90%", "80%", "70%", "70%"]}
      mx="auto"
      py="6"
      px="2"
      maxW="1000px"
    >
      <form onSubmit={onSubmit}>
        <Textarea
          name="json"
          value={textAreaValue}
          onChange={(e) => setTextAreValue(e.target.value)}
        />
        <OutlinedButton type="submit">submit</OutlinedButton>
      </form>
      <Grid
        templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
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
