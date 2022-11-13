import { ThemeWithVotes } from "@/types/marketplace";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { PreviewThemeCardSkeleton } from "../skeletons/PreviewThemeCardSkeleton";
import { OutlinedButton } from "../ui/OutlinedButton";
import { MarketPlaceThemeCard } from "./MarketplaceThemeCard";

interface PublicThemesProps {
  items: ThemeWithVotes[];
  loading: boolean;
}

export const PublicThemes: React.FC<PublicThemesProps> = ({
  items,
  loading,
}) => {
  return (
    <Box>
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
      {loading ? (
        <Grid
          templateColumns="repeat(auto-fit, minmax(450px, 1fr))"
          gap="4"
          mt="8"
          justifyItems="center"
        >
          <PreviewThemeCardSkeleton />
          <PreviewThemeCardSkeleton />
          <PreviewThemeCardSkeleton />
          <PreviewThemeCardSkeleton />
        </Grid>
      ) : (
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
      )}
    </Box>
  );
};
