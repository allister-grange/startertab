import { OutlinedButton } from "@/components/ui/OutlinedButton";
import rssFeeds from "@/pages/api/rssFeeds";
import { RSSFeed } from "@/types";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  UnorderedList,
  ListItem,
  color,
  FormControl,
  FormLabel,
  Input,
  Text,
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
    <Box width="100%" alignItems="center">
      <UnorderedList m="0">
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
      <form onSubmit={onNewFeedSubmit}>
        <FormControl mt="4" isRequired>
          <FormLabel>RSS Feed Url</FormLabel>
          <Input
            width="200px"
            size="md"
            name="url"
            borderColor={color}
            placeholder={"Add a name for the link"}
            _placeholder={{
              color,
            }}
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
            shadow="none"
            p="0"
            ml="2px"
            mt="1"
            onClick={() => {
              refetch();
              setShowingEditFeeds(false);
            }}
          >
            Take me back
          </OutlinedButton>
        </FormControl>
      </form>
    </Box>
  );
};
