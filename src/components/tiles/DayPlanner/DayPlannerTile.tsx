import DayPlannerForm from "@/components/tiles/DayPlanner/DayPlannerForm";
import { times } from "@/helpers/tileHelpers";
import { usingExternalCalendarForDayPlannerSelector } from "@/recoil/UserSettingsSelectors";
import { Booking } from "@/types";
import {
  Box,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  PopoverTrigger as OrigPopoverTrigger,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

interface DayPlannerTileProps {
  tileId: number;
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
  const [pixelsToPushTimerAcross, setPixelsToPushTimerAcross] = useState(0);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [formValues, setFormValues] = useState<Booking>(defaultFormValues);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [usingExternalCalendar, setUsingExternalCalendar] = useRecoilState(
    usingExternalCalendarForDayPlannerSelector(tileId)
  ) as [boolean | undefined, SetterOrUpdater<boolean | undefined>];

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
    if (!bookings) {
      return;
    }

    const todaysDateAtMidnight = new Date(new Date().setHours(0));
    const bookingsToKeep = [] as Booking[];

    for (const booking of bookings) {
      if (
        !(new Date(booking.creationDate) < todaysDateAtMidnight) ||
        booking.permanentBooking
      ) {
        bookingsToKeep.push(booking);
      }
    }

    setBookings(bookingsToKeep);
  }, [bookings, setBookings]);

  useEffect(() => {
    calculateTimeHandPosition();

    setInterval(calculateTimeHandPosition, 60000);

    clearOutOldBookings();
  }, [calculateTimeHandPosition, clearOutOldBookings]);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const onCloseEvent = () => {
    setIsEditingEvent(false);
    onClose();
    setFormValues(defaultFormValues);
  };

  const onTimeIndicatorClick = (time?: string) => {
    onOpen();
    // prepopulate the form with the correct time, and
    // if there's already an event, put the details in
    if (time) {
      let endTimeHour: string | number =
        Number.parseInt(time.split(":")[0]) + 1;
      if (endTimeHour < 10) {
        endTimeHour = "0" + endTimeHour;
      }
      const endTime = endTimeHour + ":" + time.split(":")[1];

      setFormValues({ ...formValues, startTime: time, endTime });

      const existingBooking = getBookingInTimeSlot(time);
      if (existingBooking) {
        setIsEditingEvent(true);
        setFormValues({ ...formValues, ...existingBooking });
      }
    }
  };

  function calculateDuration(startTime: string, endTime: string): number {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    const diffMs: number = endDate.getTime() - startDate.getTime();
    const diffMinutes: number = diffMs / (1000 * 60);

    return diffMinutes;
  }

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
    formValues.duration = calculateDuration(
      formValues.startTime,
      formValues.endTime
    );

    setBookings([...(bookings || []), formValues]);
    setFormValues(defaultFormValues);
    onClose();
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

  const getWidthOfTimeIndicator = (time: string) => {
    const minutes = time.split(":")[1].slice(0, 2);

    if (minutes === "00") {
      return "3px";
    }
    return "2px";
  };

  const getHeightOfTimeIndicator = (time: string) => {
    const minutes = time.split(":")[1].slice(0, 2);

    if (minutes === "00") {
      return "36px";
    } else if (minutes === "30") {
      return "28px";
    }
    return "21px";
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

  const handleDeleteBookingEvent = (time: string) => {
    deleteBooking(time);
    onCloseEvent();
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
      justifyContent="center"
      ref={containerRef}
      width="85%"
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
            {/* {
              // means that there's a booking in this time slot
              getBookingInTimeSlot(time)?.startTime === time ? (
                <Popover>
                  <PopoverTrigger>
                    <Box>
                      <Tooltip
                        label={getBookingInTimeSlot(time)!.title.toUpperCase()}
                      >
                        <Text
                          fontSize=".7rem"
                          fontWeight="700"
                          pos="absolute"
                          top="-32px"
                          cursor="pointer"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {getBookingInTimeSlot(time)!.title.toUpperCase()}
                        </Text>
                      </Tooltip>
                    </Box>
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
            } */}
            <Tooltip
              label={
                <div>
                  {convert24HourTo12(time)}
                  {getBookingInTimeSlot(time)?.title && (
                    <>
                      <br />
                      {getBookingInTimeSlot(time)?.title}
                    </>
                  )}
                </div>
              }
              aria-label="tooltip"
              placement="top"
            >
              <Box
                width={getWidthOfTimeIndicator(time)}
                backgroundColor={getBookingInTimeSlot(time)?.color || color}
                height={getHeightOfTimeIndicator(time)}
                mx="auto"
                mt="auto"
                transition="all .2s"
                _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                onClick={() => onTimeIndicatorClick(time)}
              />
            </Tooltip>
          </Box>
        ))}
        <Modal isOpen={isOpen} onClose={onCloseEvent}>
          <ModalOverlay />
          <ModalContent
            onMouseDown={(e) => e.stopPropagation()}
            width="370px"
            borderRadius="15px"
            overflow="hidden"
          >
            <DayPlannerForm
              background="var(--bg-color-sidebar)"
              color="var(--text-color-sidebar)"
              formValues={formValues}
              bookings={bookings}
              setFormValues={setFormValues}
              onSubmit={onSubmit}
              startTime={formValues.startTime}
              onClose={onCloseEvent}
              usingExternalCalendar={usingExternalCalendar}
              setUsingExternalCalendar={setUsingExternalCalendar}
              isEditingEvent={isEditingEvent}
              handleDeleteBookingEvent={handleDeleteBookingEvent}
            />
          </ModalContent>
        </Modal>
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
