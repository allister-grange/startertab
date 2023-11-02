import { SuggestionData } from "@/types/suggestions";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Box,
  Text,
  Spinner,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
  useMutation,
} from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";

interface SuggestionFormProps {
  refetchSuggestions: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<SuggestionData, unknown>>;
}

type PostSuggestionVariables = {
  author: string;
  suggestion: string;
  tags: string[];
};

const postSuggestion = async ({
  author,
  suggestion,
  tags,
}: PostSuggestionVariables) => {
  const response = await fetch("/api/suggestions/create", {
    method: "POST",
    body: JSON.stringify({
      author,
      suggestion,
      tags,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed request to create suggestions");
  }

  return await response.json();
};

async function waitForTime(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

const AUTHOR_CHAR_LIMIT = 19;
const AUTHOR_CHAR_MIN = 4;
const SUGGESTION_CHAR_LIMIT = 191;
const SUGGESTION_CHAR_MIN = 4;

export const SuggestionForm: React.FC<SuggestionFormProps> = ({
  refetchSuggestions,
}) => {
  const [suggestion, setSuggestion] = useState("");
  const [author, setAuthor] = useState("");
  const [formError, setFormError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>("");
  const [tooManyTags, setTooManyTags] = useState<boolean>(false);

  const { isError, isLoading, isSuccess, mutateAsync, reset } =
    useMutation(postSuggestion);

  const actionSuccessfulSuggestionSubmission = async () => {
    setAuthor("");
    setSuggestion("");
    setTags([]);
    await waitForTime(3000);
    reset();
  };

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (suggestion.length > SUGGESTION_CHAR_LIMIT) {
      setFormError(
        `Please limit suggestions to ${SUGGESTION_CHAR_LIMIT} characters`
      );
      return;
    } else if (author.length > AUTHOR_CHAR_LIMIT) {
      setFormError(
        `Please limit suggestions to ${AUTHOR_CHAR_LIMIT} characters`
      );
      return;
    } else if (author.length < AUTHOR_CHAR_MIN) {
      setFormError("The author name must have at least 4 characters");
      return;
    } else if (suggestion.length < SUGGESTION_CHAR_MIN) {
      setFormError("The suggestion name must have at least 4 characters");
      return;
    }

    await mutateAsync({ author, suggestion, tags });
    refetchSuggestions();
    actionSuccessfulSuggestionSubmission();
  };

  const onKeyDownInForm = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagValue.length > 2) {
      setTagValue("");
      if (tagValue.length + tags.join(",").length > 30) {
        setTooManyTags(true);
        setTimeout(() => setTooManyTags(false), 4000);
        return;
      }
      setTags([...tags, tagValue.trimEnd()]);
    }
  };

  const deleteTag = (tag: string) => {
    const indexOfTag = tags.findIndex((tagToFind) => tagToFind === tag);

    if (indexOfTag > -1) {
      const tagsClone = [...tags];
      tagsClone.splice(indexOfTag, 1);
      setTags(tagsClone);
    }
  };

  let buttonDisplay;

  if (isLoading) {
    buttonDisplay = <Spinner />;
  } else if (isSuccess) buttonDisplay = <CheckIcon />;
  else {
    buttonDisplay = "Submit";
  }

  return (
    <Box
      borderWidth="1px"
      p="4"
      borderRadius="md"
      maxW="md"
      mt="6"
      mx="auto"
      w="70%"
    >
      <form onSubmit={handleSubmission} onKeyDown={onKeyDownInForm}>
        <FormControl>
          <FormLabel htmlFor="suggestion">Tile idea or suggestion</FormLabel>
          <Textarea
            id="suggestion"
            placeholder="your suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            type="text"
            id="author"
            placeholder="your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Tags?</FormLabel>
          <Box borderRadius="lg" p="2" bg="white" border="none">
            <Box display="inline-block">
              {tags.map((tag) => (
                <Text
                  // bite me
                  key={tag}
                  display="inline-block"
                  borderRadius="md"
                  bg="#f7f8fa"
                  p="1"
                  color="black"
                  px="2"
                  ml="1"
                  _first={{ marginLeft: "0" }}
                >
                  {tag}
                  <SmallCloseIcon
                    _hover={{ cursor: "pointer" }}
                    onClick={() => deleteTag(tag)}
                    color="gray.500"
                    ml="1"
                    mb="2px"
                  />
                </Text>
              ))}
            </Box>
            <Input
              width="200px"
              display="inline-block"
              name="tags"
              placeholder="+ Add tag"
              h="30px"
              border="none"
              maxLength={15}
              minLength={3}
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={onTagInputKeyDown}
              value={tagValue}
              _focusVisible={{ outline: "none", border: "none" }}
            ></Input>
          </Box>
        </FormControl>

        {formError !== "" && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Text>{formError}</Text>
          </Alert>
        )}

        {isError && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Text>Failed request to create suggestion 🤕</Text>
          </Alert>
        )}

        {tooManyTags && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Text>Your tags cannot exceed 30 characters</Text>
          </Alert>
        )}

        <Button
          mt="4"
          background="coral"
          color="white"
          minW="20%"
          type="submit"
        >
          {buttonDisplay}
        </Button>
      </form>
    </Box>
  );
};
