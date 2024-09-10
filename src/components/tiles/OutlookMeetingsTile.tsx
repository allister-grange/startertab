import { OutlookLogo } from "@/components/icons/OutlookLogo";
import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { MeetingCard } from "@/components/ui/MeetingCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { OutlookContext } from "@/context/OutlookContext";
import { OutlookContextInterface } from "@/types";
import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Center, Link, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";

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
          <OutlookLogo height={22} width={22} fill={color} />
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
            target="_top"
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
          <Center height="95%" color={color}>
            <Text fontSize="xl" fontWeight="600" textAlign="center">
              You have no events today 🎉
            </Text>
          </Center>
        )}
        {outlookData.map((event, index) => {
          const start = new Date(event.start.dateTime + "Z");
          const end = new Date(event.end.dateTime + "Z");
          let startTime = new Date(start).toLocaleString(
            Intl.DateTimeFormat().resolvedOptions().locale,
            {
              hour: "numeric",
              minute: "2-digit",
              hourCycle: "h12",
            }
          );
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
        <OutlookLogo fill={color} height={24} width={24} />
      </Box>
      {display}
    </Box>
  );
};
