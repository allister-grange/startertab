import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { RSSFeed } from "@/types";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { FormEvent } from "react";

interface RSSFeedFormProps {
  rssFeeds: RSSFeed[] | undefined;
  setToDeleteFeedId: (id: string) => void;
  onNewFeedSubmit: (e: FormEvent<HTMLFormElement>) => void;
  toDeleteFeedId: string;
  handleRssFeedDelete: (id: string) => void;
  color: string;
  setShowingEditFeeds: (value: React.SetStateAction<boolean>) => void;
  refetch: () => void;
}

export const RSSFeedForm: React.FC<RSSFeedFormProps> = ({
  rssFeeds,
  setToDeleteFeedId,
  onNewFeedSubmit,
  toDeleteFeedId,
  handleRssFeedDelete,
  color,
  setShowingEditFeeds,
  refetch,
}) => {
  return (
    <Box width="100%" alignItems="center" textAlign="center">
      <UnorderedList m="0" display="flex" flexDir="column" alignItems="center">
        {rssFeeds?.map((feed) => (
          <ListItem
            key={feed.id}
            onMouseEnter={() => setToDeleteFeedId(feed.id)}
            onMouseLeave={() => setToDeleteFeedId("")}
            display="flex"
            alignItems="center"
            flexDir="row"
            mt="4"
          >
            <Text
              display="flex"
              alignItems="center"
              flexDir="row"
              wordBreak="break-word"
              transition="all .2s"
              margin="0"
              _hover={{ transform: "translateY(-2px)" }}
            >
              {feed.url}
            </Text>
            {toDeleteFeedId === feed.id && (
              <SmallCloseIcon
                cursor="pointer"
                color={color}
                opacity="0.6"
                ml="auto"
                onClick={() => handleRssFeedDelete(feed.id)}
              />
            )}
          </ListItem>
        ))}
      </UnorderedList>
      <form
        onSubmit={onNewFeedSubmit}
        style={{ textAlign: "center", width: "100%" }}
      >
        <FormControl mt="4" isRequired>
          <FormLabel textAlign="center">RSS Feed Url</FormLabel>
          <Input
            width="200px"
            size="md"
            name="url"
            mt="2"
            borderColor={color}
            placeholder={"Url"}
            _placeholder={{ color }}
            _focus={{ borderColor: color }}
            _hover={{ borderColor: color }}
          />
        </FormControl>
        <FormControl mt="6">
          <OutlinedButton
            outline={`1px solid ${color}`}
            type="submit"
            fontSize="sm"
          >
            Add Feed
          </OutlinedButton>
          <OutlinedButton
            fontSize="xs"
            display="block"
            marginX="auto"
            shadow="none"
            p="0"
            mt="1"
            onClick={() => {
              refetch();
              setShowingEditFeeds(false);
            }}
          >
            Back to my feeds &larr;
          </OutlinedButton>
        </FormControl>
      </form>
    </Box>
  );
};
