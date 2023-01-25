import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface EventCardProps {
  startTime: string;
  length: number;
  subject: string;
  location: string;
  color: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  startTime,
  length,
  subject,
  location,
  color,
}) => {
  return (
    <Flex mt="4">
      <Box bg={color} w="3px" mr="3" />
      <Box mr="3">
        <Text>{startTime}</Text>
        <Text>30 min</Text>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {subject}
        </Text>
      </Box>
    </Flex>
  );
};
