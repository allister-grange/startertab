import { CloseIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Stack, Tooltip } from "@chakra-ui/react";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DayPlannerForm } from "./DayPlannerForm";

interface DayPlannerTileProps {
  tileId: string;
}

const times = [
  "6:00am",
  "6:15am",
  "6:30am",
  "6:45am",
  "7:00am",
  "8:00am",
  "9:00am",
  "10:00am",
  "11:00am",
  "12:00pm",
  "13:00pm",
  "14:00pm",
  "15:00pm",
  "16:00pm",
  "17:00pm",
  "18:00pm",
  "19:00pm",
  "20:00pm",
  "21:00pm",
];

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

export const DayPlannerTile: React.FC<DayPlannerTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [showingTimePicker, setShowingTimePicker] = useState(false);
  const [pixelsToPushTimerAcross, setPixelsToPushTimerAcross] = useState(3);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formValues, setFormValues] = useState<Booking>(defaultFormValues);

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
    setBookings([...bookings, formValues]);
    setFormValues(defaultFormValues);
    setShowingTimePicker(false);
  };

  // all times are in the format HH:MM (in 24 hour time)
  const getBookingInTimeSlot = (time: string) => {
    const searchingTimeHour = Number.parseInt(time.split(":")[0]);
    const searchingTimeMinute = Number.parseInt(time.split(":")[1]);

    for (const key in bookings) {
      const booking = bookings[key];
      const startHour = Number.parseInt(booking.startTime?.split(":")[0]);
      const startMinute = Number.parseInt(booking.startTime?.split(":")[1]);

      const endHour = Number.parseInt(booking.endTime?.split(":")[0]);
      const endMinute = Number.parseInt(booking.endTime?.split(":")[1]);

      if (
        searchingTimeHour >= startHour &&
        searchingTimeHour <= endHour &&
        searchingTimeMinute >= startMinute &&
        searchingTimeMinute <= endMinute
      ) {
        return booking;
      }
    }

    return null;
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

        {times.map((val, idx) => (
          <Flex
            key={val}
            width={`${width / 16}px`}
            height="24px"
            pos="relative"
          >
            {
              // means that there's a booking in this time slot
              getBookingInTimeSlot(val) ? (
                <Box pos="absolute" top="-25px">
                  <Text fontSize="xs" fontWeight="700">
                    {getBookingInTimeSlot(val)!.title.toUpperCase()}
                  </Text>
                </Box>
              ) : null
            }
            <Tooltip label={val}>
              <Box
                width="3px"
                backgroundColor={
                  getBookingInTimeSlot(val)
                    ? getBookingInTimeSlot(val)?.color
                    : color
                }
                height="90%"
                mx="auto"
                mt="auto"
                transition="all .2s"
                _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                onClick={onTimeIndicatorClick}
              />
            </Tooltip>
            {Array.from(Array(3).keys()).map((idx) => (
              <Tooltip
                // ugly code to get the 15 minute intervals between hours
                label={`${val.split(":00")[0]}:${15 * (idx + 1)}${
                  val.split(":00")[1]
                }`}
                key={val + idx}
              >
                <Box
                  height={idx === 1 ? "15px" : "10px"}
                  width="2px"
                  backgroundColor={
                    getBookingInTimeSlot(val)
                      ? getBookingInTimeSlot(val)?.color
                      : color
                  }
                  mt="auto"
                  mx="auto"
                  transition="all .2s"
                  _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                  onClick={onTimeIndicatorClick}
                />
              </Tooltip>
            ))}
          </Flex>
        ))}
        {bookings.map((booking) => (
          <Flex
            key={booking.title + booking.startTime}
            width={`${width / 16}px`}
            height="24px"
            pos="relative"
          ></Flex>
        ))}
      </Flex>
      <Box pos="fixed" bottom="200px" zIndex={999}>
        {showingTimePicker && (
          <DayPlannerForm
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
