import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface MeetingCardProps extends BoxProps {
  startTime: string;
  duration: string;
  subject: string;
  location?: string;
  tileWidth: number;
  color: string;
  organizer: string;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  startTime,
  duration,
  subject,
  location,
  tileWidth,
  organizer,
  color,
  ...props
}) => {
  return (
    <Flex mt="4" {...props} width="100%">
      <Box bg={color} w="5px" mr="2" borderRadius={"5px 0 0 5px "} />
      <Box
        mr="3"
        fontSize={tileWidth <= 300 ? "xs" : "unset"}
        whiteSpace="nowrap"
      >
        <Text>{startTime}</Text>
        <Text>{duration}</Text>
      </Box>
      <Box whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        <Text
          fontSize={tileWidth <= 300 ? "sm" : "lg"}
          fontWeight="bold"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {subject}
        </Text>
        <Text
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          fontSize={tileWidth <= 300 ? "xs" : "md"}
        >
          {location ? `${location} | ` : undefined}
          {organizer}
        </Text>
      </Box>
    </Flex>
  );
};

//   white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;
