import { SuggestionsWithVotes } from "@/types/suggestions";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FilledHeartIcon } from "../icons/FilledHeartIcon";
import { HeartIcon } from "../icons/HeartIcon";
import { OutlinedButton } from "../ui/OutlinedButton";
import { CheckIcon } from "@chakra-ui/icons";

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
  const [votes, setVotes] = useState(suggestion.votes.length);
  const tags = suggestion.tags.split(",");

  async function onVoteForSuggestion() {
    if (liked) {
      return;
    }
    setLiked(true);
    const likedSuggestions = localStorage.getItem("likedSuggestions");
    if (likedSuggestions) {
      localStorage.setItem(
        "likedSuggestions",
        `${likedSuggestions},${suggestion.id}`
      );
    } else {
      localStorage.setItem("likedSuggestions", suggestion.id.toString());
    }
    try {
      // doesn't matter too much if their vote disappears, c'est la vie
      setVotes((votes) => votes + 1);
      const voteRes = await fetch(
        `/api/suggestions/vote?suggestionId=${suggestion.id}`,
        {
          method: "POST",
        }
      );
      if (!voteRes.ok) {
        throw new Error("Failed to vote");
      }
    } catch (err) {
      setVotes((votes) => votes - 1);
      setLiked(false);
      console.error(err);
    }
  }

  function checkIfLikedInLockedStorage() {
    const likedSuggestions = localStorage.getItem("likedSuggestions");
    // "1,4,6,22" etc
    if (likedSuggestions) {
      const found = likedSuggestions
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
      minH="10rem"
      opacity={suggestion.completed ? 0.55 : 1}
      border={suggestion.completed ? "green solid 2px" : 1}
      backgroundColor={
        suggestion.completed ? "rgb(34, 139, 34, 0.05)" : undefined
      }
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
      <OutlinedButton
        border={`1px solid black`}
        gap="4"
        position="absolute"
        bottom="4"
        right="4"
        onClick={onVoteForSuggestion}
      >
        {liked ? <FilledHeartIcon /> : <HeartIcon />}
        <Box borderLeft={`1px solid black`} width="1px" height="70%" />
        <Text>{votes}</Text>
      </OutlinedButton>
    </Flex>
  );
};
