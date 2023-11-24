import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { colorModeState } from "@/recoil/UserSettingsAtoms";
import { ThemeSettings, UserSettings } from "@/types";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { FormEvent, useCallback, useState } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";

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
  const setColorModeState = useSetRecoilState(colorModeState);

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

  function downloadTheme() {
    const blob = new Blob([JSON.stringify(currentTheme)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentTheme.themeName}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      setImportText(text);
    };
    reader.readAsText(e.target.files?.[0] as Blob);
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
        newTheme.themeName = `${newTheme.themeName} copy`;
      }

      setSettings({
        themes: [...settings.themes, newTheme],
        systemThemeSettings: {
          darkTheme: "",
          lightTheme: "",
          usingSystemTheme: false,
        },
      });
      showClipboardToast("Imported theme");
      setColorModeState(newTheme.themeName);
      onClose();
      /** little bit janky, but some tiles (rss feeds, bookmarks) 
      need a page refresh to not be in the "new" state,
      everything works as intended but it could be confusing for the users */
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      showErrorMessage("That's not even a JSON! 🤕");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="black">
          <ModalHeader>
            Import Theme <DownloadIcon mb="1" />
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={importTheme}>
            <ModalBody>
              <Input type="file" onChange={onFileChange} py="1" />
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
          onClick={downloadTheme}
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
