import { SuggestionsWithVotes } from "@/types/suggestions";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FilledHeartIcon } from "../icons/FilledHeartIcon";
import { HeartIcon } from "../icons/HeartIcon";
import { OutlinedButton } from "../ui/OutlinedButton";

interface SuggestionCardProps {
  suggestion: SuggestionsWithVotes;
}

const getRandomColor = () => {
  const colors = ["blue", "green", "teal", "purple", "orange"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
}) => {
  const [liked, setLiked] = useState(checkIfLikedInLockedStorage);
  const tags = suggestion.tags.split(",");

  function onUpvote() {
    throw new Error("Function not implemented.");
  }

  function checkIfLikedInLockedStorage() {
    const likedThemes = localStorage.getItem("likedThemes");
    // "1,4,6,22" etc
    if (likedThemes) {
      const found = likedThemes
        .split(",")
        .findIndex((id) => id === suggestion.id.toString());
      if (found > -1) {
        return true;
      }
    }
    return false;
  }

  return (
    <Flex
      key={suggestion.id}
      bg="#fafafa"
      p="4"
      borderRadius="md"
      shadow="md"
      position="relative"
      flexDir="column"
    >
      <Text fontSize="xl" fontWeight="bold" mb="3">
        {suggestion.suggestion}
      </Text>
      <Flex alignItems="center" flexWrap="wrap" w="60%" mt="auto">
        <Text color="gray.600" mr="2">
          {suggestion.author}
        </Text>
        <Box>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              colorScheme={getRandomColor()}
              fontSize="sm"
              mr="2"
            >
              {tag.trim()}
            </Badge>
          ))}
        </Box>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        bottom="4"
        right="4"
      >
        <OutlinedButton border={`1px solid black`} gap="4" onClick={onUpvote}>
          {liked ? <FilledHeartIcon /> : <HeartIcon />}
          <Box borderLeft={`1px solid black`} width="1px" height="70%" />
          <Text>{suggestion.votes.length}</Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  );
};
