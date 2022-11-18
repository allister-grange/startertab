import { deepClone } from "@/helpers/tileHelpers";
import { ThemeFilteringOptions, ThemeSettings, TileSettings } from "@/types";
import { CreateThemeRequest } from "@/types/marketplace";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
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
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  useState,
} from "react";
import { ThemePreview } from "../theme-creator/ThemePreview";

type ShareThemeModalProps = {
  onClose: () => void;
  isOpen: boolean;
  theme?: ThemeSettings;
  setShowingPublicThemes: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  setOrderingMethod: React.Dispatch<
    React.SetStateAction<ThemeFilteringOptions>
  >;
};

export const ShareThemeModal: React.FC<ShareThemeModalProps> = ({
  isOpen,
  onClose,
  setShowingPublicThemes,
  refetch,
  theme,
  setOrderingMethod,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagsValue, setTagsValue] = useState<string>("");
  const [tooManyTags, setTooManyTags] = useState<boolean>(false);
  const [errorPostingTheme, setErrorPostingTheme] = useState<boolean>(false);
  const [showingSuccessMessage, setShowingSuccessMethod] =
    useState<boolean>(false);

  const takeUserBackToPublicThemes = () => {
    setShowingPublicThemes(true);
    setOrderingMethod("Created on");
    setShowingSuccessMethod(false);
    window.scrollTo(0, 0);
    setTags([]);
    onClose();
  };

  const getThemeToCreate = (
    theme: ThemeSettings,
    themeName: string
  ): ThemeSettings => {
    const themeToSend = deepClone(theme!);
    themeToSend.themeName = themeName;

    /** optional fields need to be cleared to prevent leaking personal data
      so we iterate through all the items in the ThemeSettings tiles
      and set all fields that aren't mandatory (the colors and tile type)
      to be undefined */
    for (const [key, value] of Object.entries(themeToSend)) {
      const castedKey = key as keyof ThemeSettings;

      if (
        castedKey === "globalSettings" ||
        castedKey === "themeName" ||
        castedKey === "downloadedFromMarketplace"
      ) {
        continue;
      }

      for (const [key, value] of Object.entries(themeToSend[castedKey])) {
        let myKey = key as keyof TileSettings;
        if (
          myKey === "textColor" ||
          myKey === "backgroundColor" ||
          myKey === "tileType"
        ) {
          continue;
        }

        themeToSend[castedKey][myKey] = undefined;
      }
    }

    return themeToSend;
  };

  const onThemeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      author: { value: string };
      themeName: { value: string };
    };

    setLoading(true);
    setErrorPostingTheme(false);

    const themeName = target.themeName.value;
    const author = target.author.value;
    const themeToSend = getThemeToCreate(theme!, themeName);

    const toSend: CreateThemeRequest = {
      name: themeName,
      data: themeToSend,
      tags: tags,
      author: author,
    };

    try {
      const res = await fetch("/api/marketplace/item/create", {
        method: "POST",
        body: JSON.stringify(toSend),
      });

      if (res.status >= 400) {
        throw new Error("Failed request to create theme");
      }

      // show success, then debounce and take them to public themes
      if (res.status === 201) {
        refetch();
        setLoading(false);
        setShowingSuccessMethod(true);
        setTimeout(takeUserBackToPublicThemes, 1000);
      }
    } catch (error) {
      console.error(error);
      setErrorPostingTheme(true);
    } finally {
      setLoading(false);
    }
  };

  const onTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagsValue(e.target.value);
  };

  const onTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagsValue.length > 2) {
      setTagsValue("");
      if (tagsValue.length + tags.join(",").length > 30) {
        setTooManyTags(true);
        setTimeout(() => setTooManyTags(false), 4000);
        return;
      }
      setTags([...tags, tagsValue.trimEnd()]);
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

  const onKeyDownInForm = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#F5F5F5" minW="470px">
        <ModalHeader fontSize="2xl">Share your theme</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onThemeSubmit} onKeyDown={onKeyDownInForm}>
          <ModalBody>
            <Box
              height="250px"
              width="420px"
              pos="relative"
              overflow="hidden"
              borderRadius="lg"
              boxShadow="md"
            >
              <ThemePreview theme={theme!} />
            </Box>

            <FormControl isRequired mt="4">
              <FormLabel>Theme Name</FormLabel>
              <Input
                width="200px"
                size="md"
                bg="white"
                placeholder="Theme Name"
                border="none"
                name="themeName"
                maxLength={20}
                minLength={3}
                defaultValue={theme?.themeName ?? ""}
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Author Name</FormLabel>
              <Input
                bg="white"
                width="200px"
                size="md"
                maxLength={15}
                minLength={3}
                placeholder="Name"
                border="none"
                name="author"
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
                  onChange={onTagInputChange}
                  onKeyDown={onTagInputKeyDown}
                  value={tagsValue}
                  _focusVisible={{ outline: "none", border: "none" }}
                ></Input>
              </Box>
            </FormControl>
            <Box mt="4">
              {errorPostingTheme && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <Text>
                    There was an error uploading your theme, please try again
                    later. If this continues to happen, open a ticket on{" "}
                    <Link
                      style={{ textDecoration: "underline" }}
                      href="https://github.com/allister-grange/startertab/issues"
                    >
                      GitHub, here.
                    </Link>
                  </Text>
                </Alert>
              )}
              {showingSuccessMessage && (
                <Alert status="success" borderRadius="md">
                  <AlertIcon />
                  <Text>Congratulations, you&apos;ve uploaded your theme!</Text>
                </Alert>
              )}
              {tooManyTags && (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Text>Your tags cannot exceed 30 characters</Text>
                </Alert>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} bg="white">
              Close
            </Button>
            <Button colorScheme="green" type="submit">
              {loading ? <Spinner /> : "Share!"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
