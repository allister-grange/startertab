import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  Stack,
  Tooltip,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { HexColorPicker } from "react-colorful";
import { NumberedBubble } from "@/components/ui/NumberedBubble";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

interface DayPlannerTileProps {
  tileId: string;
}

const times = [
  "6:00am",
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

type Booking = {
  color: string;
  startTime: number;
  endTime: number;
};

export const DayPlannerTile: React.FC<DayPlannerTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [showingTimePicker, setShowingTimePicker] = useState(false);
  const [pixelsToPushTimerAcross, setPixelsToPushTimerAcross] = useState(3);
  const [bookings, setBookings] = useState<Booking[]>([]);

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
          label={`${new Date().getHours()}:${new Date().getMinutes()}${
            new Date().getHours() < 12 ? "am" : "pm"
          }`}
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
          <Flex key={1} width={`${width / 16}px`} height="24px" pos="relative">
            <Tooltip label={val}>
              <Box
                width="3px"
                background={color}
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
                key={idx}
              >
                <Box
                  height={idx === 1 ? "15px" : "10px"}
                  width="2px"
                  background={color}
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
      </Flex>
      <Box pos="fixed" bottom="200px" zIndex={999}>
        {/* use a ref to capture when a user focuses on the element, then use it on the new theme builder too */}
        {showingTimePicker && (
          <Stack
            shadow="md"
            background="white"
            p="6"
            borderRadius="10px"
            width="350px"
            spacing="2"
            mt="415px"
            pos="relative"
            color="black"
            tabIndex={1}
            onBlur={onTimeIndicatorClick}
          >
            <Button
              pos="absolute"
              top="2"
              right="2"
              onClick={onTimeIndicatorClick}
            >
              <CloseIcon />
            </Button>
            <form>
              <Heading mb="4" fontSize="2xl">
                New Event
              </Heading>
              <Box
                width="45%"
                borderBottom="1px solid grey"
                height="1px"
                mt="-2"
              />
              <Flex fontSize="md" mb="4" mt="6" fontWeight="600">
                <NumberedBubble displayNumber={1} mr="2" /> Event Time
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Input
                  // value={value}
                  // onChange={(e) => onChange(e.target.value)}
                  type="time"
                  min="05:00"
                  max="21:00"
                  width="138px"
                  outline="3px solid #B0AED0"
                  step="900"
                  _focus={{
                    border: "none",
                  }}
                />
                <Text>to</Text>
                <Input
                  // value={value}
                  // onChange={(e) => onChange(e.target.value)}
                  width="138px"
                  type="time"
                  step="900"
                  min="05:00"
                  max="21:00"
                  outline="3px solid #B0AED0"
                  _focus={{
                    border: "none",
                  }}
                />
              </Flex>
              <Flex fontSize="md" mb="4" mt="4" fontWeight="600">
                <NumberedBubble displayNumber={2} mr="2" /> Event Color
              </Flex>

              <HexColorPicker
                // color={value}
                // onChange={onChange}
                style={{
                  width: "100%",
                  height: "120px",
                  marginTop: "10px",
                  marginBottom: "5px",
                  borderRadius: "10px",
                }}
              />
              <OutlinedButton fontWeight="500" mt="2" borderColor="#B0AED0">
                Create Event
              </OutlinedButton>
            </form>
          </Stack>
        )}
      </Box>
    </Flex>
  );
};
