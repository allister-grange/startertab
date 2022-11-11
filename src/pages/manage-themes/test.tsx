import { ThemeCard } from "@/components/themes/ThemeCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeSettings } from "@/types";
import { CreateThemeRequest } from "@/types/marketplace";
import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Grid, Textarea, Text } from "@chakra-ui/react";
import { Theme } from "@prisma/client";
import React, { FormEvent, useEffect, useState } from "react";

const Test: React.FC = () => {
  const [textAreaValue, setTextAreValue] = useState("");
  const [items, setItems] = useState<ThemeSettings[]>([]);

  useEffect(() => {
    document.body.style.background = "#F7F8FA";

    async function grabItems() {
      const items = await fetch("/api/marketplace/item");
      const data = (await items.json()) as Theme[];

      const convertedThemeSettings = data.map(
        (theme) => theme.data as unknown as ThemeSettings
      );

      setItems(convertedThemeSettings);
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
    <Box>
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
          <ThemeCard
            key={item.themeName}
            theme={item}
            buttons={
              <>
                <OutlinedButton
                  border={`1px solid black`}
                  onClick={() => console.log("download bb")}
                >
                  <Text fontSize="xs" mr="2">
                    Save theme
                  </Text>
                  <DownloadIcon />
                </OutlinedButton>
              </>
            }
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Test;
