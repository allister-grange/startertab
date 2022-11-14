import { ThemeSettings } from "@/types";
import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  color,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";

type ShareThemeModalProps = {
  onClose: () => void;
  isOpen: boolean;
  theme?: ThemeSettings;
};

export const ShareThemeModal: React.FC<ShareThemeModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagsValue, setTagsValue] = useState<string>("");

  const onThemeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      url: { value: string };
    };

    const url = target.url.value;

    if (!url || typeof url !== "string") {
      return;
    }

    // make sure that the name is unique
  };

  const onTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagsValue(e.target.value);
  };

  const onTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagsValue.length > 0) {
      // e.preventDefault();
      setTagsValue("");
      setTags([...tags, tagsValue]);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#F5F4F5">
        <ModalHeader fontSize="2xl">Share your theme </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onThemeSubmit}>
            <FormControl isRequired>
              <FormLabel>Theme name</FormLabel>
              <Input
                width="200px"
                size="md"
                name="themeName"
                bg="white"
                placeholder="Theme Name"
                border="none"
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Author name?</FormLabel>
              <Input
                bg="white"
                width="200px"
                size="md"
                name="name"
                placeholder="Name"
                border="none"
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Tags?</FormLabel>
              <Box borderRadius="lg" p="2" bg="white" border="none">
                {tags.map((tag) => (
                  <Text
                    // bite me, rendering performance doesn't matter here
                    key={tag}
                    display="inline"
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
                <Input
                  width="200px"
                  name="tags"
                  placeholder="+ Add tag"
                  h="30px"
                  border="none"
                  onChange={onTagInputChange}
                  onKeyDown={onTagInputKeyDown}
                  value={tagsValue}
                  _focusVisible={{ outline: "none", border: "none" }}
                ></Input>
              </Box>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} bg="white">
            Close
          </Button>
          <Button colorScheme="green">Share!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
