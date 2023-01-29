import React, { useContext, useRef, useState } from "react";
import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { OutlookContext } from "@/context/OutlookContext";
import { OutlookContextInterface } from "@/types";
import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import { OutlookLogo } from "@/components/icons/OutlookLogo";
import { MeetingCard } from "@/components/ui/MeetingCard";

interface OutlookFeedTileProps {
  tileId: number;
}

export const OutlookMeetingsTile: React.FC<OutlookFeedTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;

  const { isAuthenticated, outlookData, loginWithOutlook, isLoading, error } =
    useContext(OutlookContext) as OutlookContextInterface;
  const divRef = useRef<HTMLDivElement | null>(null);
  let renderedNextMeetingLine = false;
  const [tileWidth, setTileWidth] = useState(0);
  const [previousWidth, setPreviousWidth] = useState(0);

  // need to change the amount of text truncated from title depending on width
  if (divRef.current) {
    if (divRef.current.offsetWidth !== previousWidth) {
      setPreviousWidth(divRef.current.offsetWidth);
      setTileWidth(divRef.current.offsetWidth);
    }
  }

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithOutlook}
          color={color}
          borderColor={color}
        >
          Continue with Outlook&nbsp;
          <OutlookLogo height={22} width={22} color={color} />
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
      <Box height="90%">
        {outlookData.length === 0 && (
          <Center height="100%" color={color}>
            <Heading as="h3" fontSize="md">
              You have no events today 🎉
            </Heading>
          </Center>
        )}
        {outlookData.map((event, index) => {
          const start = new Date(event.start.dateTime + "Z");
          const end = new Date(event.end.dateTime + "Z");
          let startTime = new Date(start).toLocaleString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          let duration = (
            (end.getTime() - start.getTime()) /
            (1000 * 60)
          ).toString();
          // converting time to hours if longer than 60 minutes
          if (Number.parseInt(duration) > 60) {
            duration = (Number.parseInt(duration) / 60).toFixed(1) + " hour";
          } else if (Number.parseInt(duration) === 60) {
            duration = (Number.parseInt(duration) / 60).toFixed(0) + " hour";
          } else {
            duration += " min";
          }

          if (event.isAllDay) {
            startTime = "All day";
            duration = "";
          }

          const currentTime = new Date();

          if (
            currentTime < start &&
            currentTime < end &&
            !renderedNextMeetingLine &&
            !event.isAllDay
          ) {
            renderedNextMeetingLine = true;
            const timeUntilEvent = start.getTime() - currentTime.getTime();
            const hours = Math.floor(timeUntilEvent / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilEvent / (1000 * 60)) % 60);

            return (
              <>
                <Box key={index} width="90%" mx="auto" mb="6">
                  <Badge
                    mt="3"
                    p="2"
                    background={`BF${color}`}
                    textTransform="lowercase"
                    borderRadius="16"
                    color={color}
                  >
                    <TimeIcon bgSize="20px" mr="2" mb="1" />
                    <Text
                      display="inline"
                      fontSize={tileWidth <= 300 ? "xs" : "sm"}
                    >
                      {hours === 0 ? "" : `In ${hours} hrs `} {minutes} min
                    </Text>
                  </Badge>
                  <MeetingCard
                    mt="0"
                    startTime={startTime}
                    subject={event.subject}
                    duration={duration}
                    tileWidth={tileWidth}
                    location={event.location.displayName}
                    color={color}
                    organizer={event.organizer.emailAddress.name}
                    link={event.webLink}
                    pb={index === outlookData.length - 1 ? "4" : undefined}
                  />
                </Box>
              </>
            );
          } else {
            return (
              <Box key={index}>
                <MeetingCard
                  startTime={startTime}
                  subject={event.subject}
                  duration={duration}
                  tileWidth={tileWidth}
                  location={event.location.displayName}
                  color={color}
                  organizer={event.organizer.emailAddress.name}
                  link={event.webLink}
                  pb={index === outlookData.length - 1 ? "4" : undefined}
                />
              </Box>
            );
          }
        })}
      </Box>
    );
  } else {
    return <></>;
  }

  return (
    <Box p="2" color={color} position="relative" ref={divRef} height="100%">
      <Box position="absolute" right="4" top="3">
        <OutlookLogo color={color} height={24} width={24} />
      </Box>
      {display}
    </Box>
  );
};
