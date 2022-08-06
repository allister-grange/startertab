import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { times } from "@/helpers/tileHelpers";
import { ThemeSettings, TileId, UserSettingsContextInterface } from "@/types";
import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DayPlannerForm } from "./DayPlannerForm";

interface DayPlannerTileProps {
  tileId: string;
  bookings?: Booking[];
}

export type Booking = {
  color: string;
  startTime: string;
  endTime: string;
  title: string;
};

const defaultFormValues = {
  color: "#B0AED0",
  title: "",
  startTime: "06:00",
  endTime: "07:00",
};

export const DayPlannerTile: React.FC<DayPlannerTileProps> = ({
  tileId,
  bookings,
}) => {
  const color = `var(--text-color-${tileId})`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [showingTimePicker, setShowingTimePicker] = useState(false);
  const [pixelsToPushTimerAcross, setPixelsToPushTimerAcross] = useState(3);
  const [formValues, setFormValues] = useState<Booking>(defaultFormValues);
  const { changeThemeInSettings, theme } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;

  const calculateTimeHandPosition = useCallback(() => {
    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    // calculating what hour to put the hand on
    // 6 is taken off current hours as we start the clock at 6:00am
    // the 5 at the end is the offset from the left hand side of the div
    let pixelsToPushTimerAcross =
      (width / times.length) * (currentHours - 6) + 4;

    // calculating what minute to put the hand on
    setPixelsToPushTimerAcross(
      (pixelsToPushTimerAcross += (width / times.length / 60) * currentMinutes)
    );
  }, [width]);

  useEffect(() => {
    calculateTimeHandPosition();

    setInterval(calculateTimeHandPosition, 60000);
  }, [calculateTimeHandPosition]);

  useLayoutEffect(() => {
    setWidth(containerRef.current!.offsetWidth);
  }, []);

  const onTimeIndicatorClick = () => {
    setShowingTimePicker(!showingTimePicker);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formValues.title.length <= 0 ||
      formValues.startTime === undefined ||
      formValues.startTime === undefined
    ) {
      return;
    }

    const newBookings = [...(bookings || []), formValues];
    theme[tileId as TileId].bookings = newBookings;
    changeThemeInSettings(theme);
    setFormValues(defaultFormValues);
    setShowingTimePicker(false);
  };

  // all times are in the format HH:MM (in 24 hour time)
  const getBookingInTimeSlot = (time: string) => {
    if (!bookings) {
      return;
    }

    for (const key in bookings) {
      const booking = bookings[key];
      if (time >= booking.startTime && time <= booking.endTime) {
        return booking;
      }
    }

    return null;
  };

  const getBoxWidth = (time: string) => {
    const minutes = time.split(":")[1].slice(0, 2);

    if (minutes === "00") {
      return "3px";
    }
    return "2px";
  };

  const getBoxHeight = (time: string) => {
    const minutes = time.split(":")[1].slice(0, 2);

    if (minutes === "00") {
      return "90%";
    } else if (minutes === "30") {
      return "70%";
    }
    return "50%";
  };

  const convert24HourTo12 = (timeToConvert: string) => {
    const amOrPm =
      Number.parseInt(timeToConvert.split(":")[0]) >= 12 ? "pm" : "am";
    const hours = Number.parseInt(timeToConvert.split(":")[0]) % 12 || 12;
    const minutes =
      Number.parseInt(timeToConvert.split(":")[1]) == 0
        ? "00"
        : Number.parseInt(timeToConvert.split(":")[1]);

    return `${hours}:${minutes}${amOrPm}`;
  };

  return (
    <Flex
      height="100%"
      pos="relative"
      justifyContent="center"
      ref={containerRef}
      width="80%"
      mx="auto"
    >
      <Flex
        alignItems="flex-end"
        height="100%"
        justifyContent="center"
        width="max-content"
        pos="relative"
      >
        <Tooltip
          label={`${new Date().getHours()}:${
            new Date().getMinutes() < 10
              ? "0" + new Date().getMinutes()
              : new Date().getMinutes()
          }${new Date().getHours() < 12 ? "am" : "pm"}`}
        >
          <Box
            width="1px"
            height="30px"
            background="red"
            pos="absolute"
            bottom="0"
            left={`${pixelsToPushTimerAcross}px`}
            zIndex={5}
          />
        </Tooltip>

        {times.map((time, idx) => (
          <Flex
            key={time}
            width={`${width / times.length}px`}
            height="24px"
            pos="relative"
          >
            {
              // means that there's a booking in this time slot
              getBookingInTimeSlot(time) &&
              time === getBookingInTimeSlot(time)?.startTime ? (
                <Button
                  variant="unstyled"
                  pos="absolute"
                  top="-38px"
                  left="-3px"
                  _focus={{ border: "none" }}
                >
                  <Text fontSize="xs" fontWeight="700">
                    {getBookingInTimeSlot(time)!.title.toUpperCase()}
                  </Text>
                </Button>
              ) : null
            }
            <Tooltip label={convert24HourTo12(time)}>
              <Box
                width={getBoxWidth(time)}
                backgroundColor={
                  getBookingInTimeSlot(time)
                    ? getBookingInTimeSlot(time)?.color
                    : color
                }
                height={getBoxHeight(time)}
                mx="auto"
                mt="auto"
                transition="all .2s"
                _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                onClick={onTimeIndicatorClick}
              />
            </Tooltip>
          </Flex>
        ))}
      </Flex>
      <Box pos="fixed" top="50%" zIndex={999} transform="translateY(-50%)">
        {showingTimePicker && (
          <DayPlannerForm
            background={theme.globalSettings.sidebarBackgroundColor}
            color={theme.globalSettings.textColor}
            formValues={formValues}
            setFormValues={setFormValues}
            onSubmit={onSubmit}
            onTimeIndicatorClick={onTimeIndicatorClick}
          />
        )}
      </Box>
    </Flex>
  );
};
