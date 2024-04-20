import { defaultFont } from "@/helpers/defaultFont";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface SaveChangesAlertProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  cancelRef: React.MutableRefObject<any>;
  saveChanges: (shouldCloseSidebar: boolean) => void;
  discardChanges: () => void;
}

export const SaveChangesAlert: React.FC<SaveChangesAlertProps> = ({
  isOpen,
  onOpen,
  onClose,
  cancelRef,
  saveChanges,
  discardChanges,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent fontFamily={defaultFont}>
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">
            warning 💣
          </AlertDialogHeader>

          <AlertDialogBody color="gray.600" fontSize="lg">
            <Text>You&apos;re about to lose changes you&apos;ve made</Text>
          </AlertDialogBody>

          <AlertDialogFooter mt="2">
            <Button ref={cancelRef} onClick={discardChanges}>
              I don&apos;t need those changes
            </Button>
            <Button
              colorScheme="green"
              onClick={() => saveChanges(true)}
              ml={3}
            >
              Save changes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
