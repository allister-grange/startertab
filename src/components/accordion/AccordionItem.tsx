import { accordionOpenIndex } from "@/recoil/SidebarAtom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface AccordionItemProps extends BoxProps {
  accordionIndex: number;
  title: string;
  textColor: string;
  borderColor: string;
  isDisabled: boolean;
  setTutorialProgress: Dispatch<SetStateAction<number>>;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  accordionIndex,
  title,
  textColor,
  isDisabled,
  setTutorialProgress,
  ...props
}) => {
  const [accordionsOpenIndex, setOpenIndexes] =
    useRecoilState(accordionOpenIndex);

  // only render the item if this child is "open"
  const isOpen =
    accordionsOpenIndex.findIndex((num) => num === accordionIndex) > -1;

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

  return (
    <Box {...props} textColor={textColor}>
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
        {isOpen ? (
          <ChevronUpIcon boxSize="20px" />
        ) : (
          <ChevronDownIcon boxSize="20px" />
        )}
      </Button>
      {isOpen ? props.children : null}
    </Box>
  );
};
