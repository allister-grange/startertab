import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { FormEvent, useCallback, useState } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeSettings, UserSettings } from "@/types";
import { SetterOrUpdater } from "recoil";

interface ExportImportButtonsProps {
  textColor: string;
  currentTheme: ThemeSettings;
  setSettings: SetterOrUpdater<UserSettings>;
  settings: UserSettings;
}

export const ExportImportButtons: React.FC<ExportImportButtonsProps> = ({
  textColor,
  currentTheme,
  setSettings,
  settings,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [importText, setImportText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setColorMode } = useColorMode();

  function showErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 2000);
  }

  const showClipboardToast = useCallback(
    (val?: string) => {
      toast({
        title: val,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    },
    [toast]
  );

  function copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(currentTheme));
    showClipboardToast("Copied theme");
  }

  const isValidTheme = (o: any): o is ThemeSettings => {
    return (
      "themeName" in o &&
      "downloadedFromMarketplace" in o &&
      "globalSettings" in o &&
      "tileLayout" in o &&
      "tiles" in o &&
      typeof o.themeName == "string" &&
      typeof o.downloadedFromMarketplace == "boolean" &&
      typeof o.globalSettings == "object" &&
      typeof o.tileLayout == "object" &&
      typeof o.tiles == "object"
    );
  };

  const importTheme = (e: FormEvent) => {
    e.preventDefault();

    try {
      const newTheme = JSON.parse(importText);

      if (!isValidTheme(newTheme)) {
        showErrorMessage("Invalid format for a theme 🤕");
        return;
      }
      if (
        settings.themes.find((theme) => theme.themeName === newTheme.themeName)
      ) {
        showErrorMessage("You already have a theme with that name");
        return;
      }

      setSettings({
        themes: [...settings.themes, newTheme],
      });
      showClipboardToast("Imported theme");
      setColorMode(newTheme.themeName);
      onClose();
    } catch {
      showErrorMessage("That's not even a JSON! 🤕");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Import Theme <DownloadIcon />
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={importTheme}>
            <ModalBody>
              <Textarea
                placeholder="Paste your theme here"
                name="importText"
                onChange={(e) => setImportText(e.target.value)}
                value={importText}
              />
              {errorMessage && (
                <Text color="tomato" fontWeight="600" mt="2">
                  {errorMessage}
                </Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="ghost">
                Close
              </Button>
              <Button colorScheme="green" type="submit">
                Import
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Flex columnGap={"3"}>
        <OutlinedButton
          color={textColor}
          border={`1px solid ${textColor}`}
          borderRadius="md"
          py="2"
          transition="all .2s"
          width="100%"
          fontWeight="400"
          _hover={{
            transform: "translateY(-2px)",
          }}
          _focus={{
            border: `2px solid ${textColor}`,
            transform: "translateY(-2px)",
          }}
          onClick={() => copyToClipboard()}
        >
          Export Theme&nbsp;
          <CopyIcon />
        </OutlinedButton>
        <OutlinedButton
          color={textColor}
          border={`1px solid ${textColor}`}
          borderRadius="md"
          py="2"
          transition="all .2s"
          width="100%"
          fontWeight="400"
          _hover={{
            transform: "translateY(-2px)",
          }}
          _focus={{
            border: `2px solid ${textColor}`,
            transform: "translateY(-2px)",
          }}
          onClick={onOpen}
        >
          Import Theme&nbsp;
          <DownloadIcon />
        </OutlinedButton>
      </Flex>
    </>
  );
};
