import DayPlannerForm from "@/components/tiles/DayPlanner/DayPlannerForm";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { times } from "@/helpers/tileHelpers";
import { Booking, TileId } from "@/types";
import {
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger as OrigPopoverTrigger,
  Portal,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SetterOrUpdater } from "recoil";

const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

interface DayPlannerTileProps {
  tileId: TileId;
  bookings?: Booking[];
  setBookings: SetterOrUpdater<Booking[] | undefined>;
}

const defaultFormValues: Booking = {
  color: "#ffb6b6",
  title: "",
  startTime: "06:00",
  endTime: "07:00",
  creationDate: new Date(),
  permanentBooking: false,
};

const DayPlannerTileComponent: React.FC<DayPlannerTileProps> = ({
  tileId,
  bookings,
  setBookings,
}) => {
  const color = `var(--text-color-${tileId})`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [showingTimePicker, setShowingTimePicker] = useState<
    undefined | string
  >();
  const [pixelsToPushTimerAcross, setPixelsToPushTimerAcross] = useState(0);
  const [formValues, setFormValues] = useState<Booking>(defaultFormValues);

  // calculating what hour to put the hand on
  // 6 is taken off current hours as we start the clock at 6:00am
  // the 5 at the end is the offset from the left hand side of the div
  const calculateTimeHandPosition = useCallback(() => {
    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    const hoursInTheWorkDay = times.length / 4;
    const distanceToMoveInOneHour = width / hoursInTheWorkDay;
    const hourDistance = distanceToMoveInOneHour * (currentHours - 6) + 4;

    const distanceToMoveIn1Minute = distanceToMoveInOneHour / 60;
    const minuteDistance = distanceToMoveIn1Minute * currentMinutes;

    setPixelsToPushTimerAcross(hourDistance + minuteDistance);
  }, [width]);

  // any bookings from yesterday or before need to go
  const clearOutOldBookings = useCallback(() => {
    const todaysDateAtMidnight = new Date(new Date().setHours(0));
    const bookingsToKeep = [] as Booking[];

    bookings?.forEach((booking) => {
      if (
        !(new Date(booking.creationDate) < todaysDateAtMidnight) ||
        booking.permanentBooking
      ) {
        bookingsToKeep.push(booking);
      }
    });

    setBookings(bookingsToKeep);
  }, [bookings, setBookings]);

  useEffect(() => {
    calculateTimeHandPosition();

    setInterval(calculateTimeHandPosition, 60000);

    clearOutOldBookings();
  }, [calculateTimeHandPosition, clearOutOldBookings]);

  useLayoutEffect(() => {
    setWidth(containerRef.current!.offsetWidth);
  }, []);

  const onTimeIndicatorClick = (time?: string) => {
    setShowingTimePicker(time);
    if (time) {
      let endTimeHour: string | number =
        Number.parseInt(time.split(":")[0]) + 1;
      if (endTimeHour < 10) {
        endTimeHour = "0" + endTimeHour;
      }
      const endTime = endTimeHour + ":" + time.split(":")[1];

      setFormValues({ ...formValues, startTime: time, endTime });
    }
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

    formValues.creationDate = new Date();

    setBookings([...(bookings || []), formValues]);
    setFormValues(defaultFormValues);
    setShowingTimePicker(undefined);
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
      return "27px";
    } else if (minutes === "30") {
      return "21px";
    }
    return "15px";
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

  const deleteBooking = (time: string) => {
    if (!bookings) {
      return;
    }

    const newBookings = JSON.parse(JSON.stringify(bookings)) as Booking[];

    for (let i = 0; i < newBookings.length; i++) {
      const booking = newBookings[i];
      if (time >= booking.startTime && time <= booking.endTime) {
        newBookings.splice(i, 1);

        setBookings(newBookings);
      }
    }
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
        marginTop="auto"
        alignItems="flex-end"
        height="40%"
        justifyContent="center"
        width="max-content"
        pos="relative"
      >
        <Tooltip
          label={convert24HourTo12(
            `${new Date().getHours()}:${
              new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes()
            }`
          )}
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
          <Box key={time} width={`${width / times.length}px`}>
            {
              // means that there's a booking in this time slot
              getBookingInTimeSlot(time)?.startTime === time ? (
                <Popover>
                  <PopoverTrigger>
                    <Text
                      fontSize="xs"
                      fontWeight="700"
                      pos="absolute"
                      top="-32px"
                      cursor="pointer"
                      whiteSpace="nowrap"
                    >
                      {getBookingInTimeSlot(time)!.title.toUpperCase()}
                    </Text>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      width="150px"
                      background="var(--bg-color-sidebar)"
                      color="var(--text-color-sidebar)"
                    >
                      <OutlinedButton
                        background="var(--bg-color-sidebar)"
                        color="var(--text-color-sidebar)"
                        onClick={() => deleteBooking(time)}
                      >
                        Delete booking
                      </OutlinedButton>
                    </PopoverContent>
                  </Portal>
                </Popover>
              ) : null
            }
            <Tooltip
              label={convert24HourTo12(time)}
              aria-label="tooltip"
              placement="top"
            >
              <Box
                width={getBoxWidth(time)}
                backgroundColor={getBookingInTimeSlot(time)?.color || color}
                height={getBoxHeight(time)}
                mx="auto"
                mt="auto"
                transition="all .2s"
                _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                onClick={() => onTimeIndicatorClick(time)}
              />
            </Tooltip>
          </Box>
        ))}
        {showingTimePicker && (
          <Box pos="fixed" top="50%" zIndex={999} transform="translateY(-50%)">
            <DayPlannerForm
              background="var(--bg-color-sidebar)"
              color="var(--text-color-sidebar)"
              formValues={formValues}
              bookings={bookings}
              setFormValues={setFormValues}
              onSubmit={onSubmit}
              startTime={showingTimePicker!}
              setShowingTimePicker={setShowingTimePicker}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

const areEqual = (
  prevProps: DayPlannerTileProps,
  nextProps: DayPlannerTileProps
) => {
  return prevProps.bookings?.length === nextProps.bookings?.length;
};

export const DayPlannerTile = React.memo(DayPlannerTileComponent, areEqual);
