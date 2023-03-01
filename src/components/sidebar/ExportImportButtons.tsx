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
} from "@chakra-ui/react";
import React, { FormEvent, useCallback, useState } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { ThemeSettings } from "@/types";

interface ExportImportButtonsProps {
  textColor: string;
  currentTheme: ThemeSettings;
}

export const ExportImportButtons: React.FC<ExportImportButtonsProps> = ({
  textColor,
  currentTheme,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [importText, setImportText] = useState("");

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(currentTheme));
    showClipboardToast("Copied theme");
  };

  const importTheme = (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log(importText);

      showClipboardToast("Imported theme");
      // onClose();
    } catch {
      // handle a bad JSON upload
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
