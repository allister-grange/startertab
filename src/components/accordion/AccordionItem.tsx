import {
  accordionOpenIndex,
  tutorialProgressAtom,
} from "@/recoil/SidebarAtoms";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Collapse } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface AccordionItemProps extends BoxProps {
  accordionIndex: number;
  title: string;
  textColor: string;
  borderColor: string;
  isDisabled: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  accordionIndex,
  title,
  textColor,
  isDisabled,
  ...props
}) => {
  const [accordionsOpenIndex, setOpenIndexes] =
    useRecoilState(accordionOpenIndex);
  const setTutorialProgress = useSetRecoilState(tutorialProgressAtom);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shouldRenderContent, setShouldRenderContent] =
    useState<boolean>(false);

  function toggleAccordion() {
    // need to move the tutorial along when they open an accordion
    setTutorialProgress((prevState) => (prevState === 3 ? 4 : prevState));

    if (isOpen) {
      setOpenIndexes(
        accordionsOpenIndex.filter((val) => val !== accordionIndex)
      );
    } else {
      setOpenIndexes([...accordionsOpenIndex, accordionIndex]);
    }
  }

  // used to animate the dropping down of the accordion
  useEffect(() => {
    if (accordionsOpenIndex.includes(accordionIndex)) {
      setIsOpen(true);
      setTimeout(() => {
        setShouldRenderContent(true);
      }, 5);
    } else {
      setIsOpen(false);
      setShouldRenderContent(false);
    }
  }, [accordionsOpenIndex, accordionIndex]);

  return (
    <Box {...props}>
      <Button
        isDisabled={isDisabled}
        onClick={toggleAccordion}
        w="100%"
        borderRadius={0}
        bg="transparent"
        borderTop={`1px solid ${props.borderColor ?? "#E2E8F0"}`}
        fontWeight="normal"
        display="flex"
        justifyContent="space-between"
        transition="all .2s"
        color={textColor}
        _hover={{
          backgroundColor: "rgba(0,0,0,.1)",
          transform: "translateY(-2px)",
        }}
        _active={{
          backgroundColor: "rgba(0,0,0,.1)",
          transform: "translateY(0px)",
        }}
      >
        {title}
        <ChevronUpIcon
          boxSize="20px"
          transition="transform 0.3s ease-in-out"
          transform={isOpen ? "rotate(180deg)" : undefined}
        />
      </Button>
      {isOpen && (
        <Collapse in={shouldRenderContent} animateOpacity>
          {props.children}
        </Collapse>
      )}
    </Box>
  );
};
