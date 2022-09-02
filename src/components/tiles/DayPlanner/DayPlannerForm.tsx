import { NumberedBubble } from "@/components/ui/NumberedBubble";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { Booking } from "@/types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Stack,
  StackProps,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface DayPlannerFormProps extends StackProps {
  formValues: Booking;
  setFormValues: React.Dispatch<React.SetStateAction<Booking>>;
  onSubmit: (e: React.FormEvent) => void;
  bookings: Booking[] | undefined;
  startTime: string;
  setShowingTimePicker: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

const DayPlannerForm: React.FC<DayPlannerFormProps> = ({
  formValues,
  onSubmit,
  setFormValues,
  bookings,
  startTime,
  setShowingTimePicker,
  ...props
}) => {
  const [userTyped, setUserTyped] = useState(false);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserTyped(true);
    setFormValues({ ...formValues, title: e.target.value });
  };

  const onColorChange = (newColor: string) => {
    setFormValues({ ...formValues, color: newColor });
  };

  const onStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, startTime: e.target.value });
  };

  const onEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, endTime: e.target.value });
  };

  const onPermanentCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, permanentBooking: e.target.checked });
  };

  const validateForm = (): string | undefined => {
    // make sure this booking doesn't overlap with another one
    if (bookings) {
      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        if (
          formValues.startTime <= booking.endTime &&
          formValues.endTime >= booking.endTime
        ) {
          return "Overlaps with another booking";
        }
      }
    }

    if (formValues.title.length <= 0 || formValues.title.length >= 20) {
      return "Title is too long";
    }

    if (formValues.endTime < formValues.startTime) {
      return "End time is before the start time";
    }
  };

  const formValidationError = validateForm();

  return (
    <Stack
      shadow="lg"
      background="white"
      p="4"
      borderRadius="10px"
      width="370px"
      pos="relative"
      {...props}
    >
      <Button
        pos="absolute"
        top="2"
        right="2"
        onClick={() => setShowingTimePicker(undefined)}
        background="transparent"
      >
        <CloseIcon />
      </Button>
      <form onSubmit={onSubmit}>
        <Box>
          <Flex fontSize="md" mb="4" fontWeight="600">
            <NumberedBubble displayNumber={1} mr="2" /> Event Name
          </Flex>
          <Input
            value={formValues.title}
            onChange={onTitleChange}
            width="80%s"
            outline="3px solid var(--chakra-colors-purple-500)"
            step="900"
            _focus={{
              border: "none",
            }}
          />
        </Box>
        <Box mb="6" mt="6">
          <Flex fontSize="md" fontWeight="600" mb="4" mt="4">
            <NumberedBubble displayNumber={2} mr="2" /> Event Time
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Input
              value={formValues.startTime}
              onChange={onStartTimeChange}
              type="time"
              min="06:00"
              max="20:45"
              width="120px"
              outline="3px solid var(--chakra-colors-purple-500)"
              step="900"
              _focus={{
                border: "none",
              }}
            />
            <Text>to</Text>
            <Input
              value={formValues.endTime}
              onChange={onEndTimeChange}
              width="120px"
              type="time"
              step="900"
              min="06:15"
              max="21:00"
              outline="3px solid var(--chakra-colors-purple-500)"
              _focus={{
                border: "none",
              }}
            />
          </Flex>
        </Box>
        <Box mb="6" mt="6">
          <Flex fontSize="md" mb="4" mt="4" fontWeight="600">
            <NumberedBubble displayNumber={3} mr="2" /> Event Color&nbsp;-
            <Text color={formValues.color}>&nbsp;{`${formValues.color}`}</Text>
          </Flex>
          <HexColorPicker
            color={formValues.color}
            onChange={onColorChange}
            style={{
              width: "100%",
              height: "120px",
              marginTop: "10px",
              marginBottom: "5px",
              borderRadius: "10px",
            }}
          />
        </Box>
        {formValidationError && userTyped && (
          <Text mb="2" color="red">
            Error - {formValidationError}
          </Text>
        )}
        <Flex alignItems="center" mt="2" justifyContent="space-around">
          <Checkbox colorScheme="purple" onChange={onPermanentCheckboxChange}>
            <Tooltip
              aria-label="tooltip"
              label="This will keep the event over multiple days"
            >
              Permanent?
            </Tooltip>
          </Checkbox>
          <OutlinedButton
            fontWeight="500"
            borderColor="var(--chakra-colors-purple-500)"
            type="submit"
            disabled={formValidationError ? true : false}
          >
            Create Event
          </OutlinedButton>
        </Flex>
      </form>
    </Stack>
  );
};

export default React.memo(DayPlannerForm);
