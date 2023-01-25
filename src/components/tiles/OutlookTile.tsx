import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { OutlookContext } from "@/context/OutlookContext";
import { calculateTimeAgoString, truncateString } from "@/helpers/tileHelpers";
import { OutlookContextInterface } from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { EventCard } from "../ui/EventCard";
import { TwitterLogo } from "../ui/TwitterLogo";

interface OutlookFeedTileProps {
  tileId: number;
}

export const OutlookMeetingsTile: React.FC<OutlookFeedTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;

  const { isAuthenticated, outlookData, loginWithOutlook, isLoading, error } =
    useContext(OutlookContext) as OutlookContextInterface;
  const [displayingOnWideTile, setDisplayingOnWideTile] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  // need to change the amount of text truncated from title depending on width
  React.useEffect(() => {
    if (!divRef.current) {
      return;
    }

    if (divRef.current.offsetWidth > 300) {
      setDisplayingOnWideTile(true);
    }
  }, []);

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithOutlook}
          color={color}
          borderColor={color}
        >
          Continue with Outlook&nbsp;
          <TwitterLogo color={"#1E9CEA"} />
        </OutlinedButton>
      </Center>
    );
  }

  let display;

  if (isLoading && isAuthenticated !== undefined) {
    display = <TextFeedSkeleton />;
  } else if (error) {
    display = (
      <Box mt="6" textAlign="center" px="2">
        <Text>There was an error fetching the Outlook data.</Text>
        <br />
        <Text>
          If this error continues to persist, please open a{" "}
          <Link
            style={{ textDecoration: "underline" }}
            href="https://github.com/allister-grange/startertab/issues"
          >
            GitHub issue
          </Link>
          .
        </Text>
      </Box>
    );
  } else if (outlookData) {
    display = (
      <Box>
        {outlookData.map((event, index) => {
          console.log(event.start.dateTime);

          const start = new Date(event.start.dateTime + "Z");
          const startTime = new Date(start).toLocaleString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <Box key={index}>
              <EventCard
                startTime={startTime}
                subject={event.subject}
                length={30}
                location={event.location.displayName}
                color={color}
              />
            </Box>
          );
        })}
        {/* </Flex> */}
      </Box>
    );
  } else {
    return <></>;
  }

  return (
    <Box p="2" color={color} position="relative" mb="2" ref={divRef}>
      <Box position="absolute" right="4" top="3">
        <TwitterLogo color={color} />
      </Box>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link aria-label="Link to Outlook" href="https://outlook.com/home">
          Outlook Meetings Tile
        </Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={color} />
      {display}
    </Box>
  );
};
