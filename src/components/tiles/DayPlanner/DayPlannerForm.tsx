import { NumberedBubble } from "@/components/ui/NumberedBubble";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { HexColorPicker } from "react-colorful";
import { Booking } from "./DayPlannerTile";

interface DayPlannerFormProps {
  formValues: Booking;
  setFormValues: React.Dispatch<React.SetStateAction<Booking>>;
}

export const DayPlannerForm: React.FC<DayPlannerFormProps> = ({
  formValues,
  setFormValues,
}) => {
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <form>
      <Box>
        <Flex fontSize="md" mb="4" fontWeight="600">
          <NumberedBubble displayNumber={1} mr="2" /> Event Name
        </Flex>
        <Input
          value={formValues.title}
          onChange={onTitleChange}
          width="80%s"
          outline="3px solid #B0AED0"
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
            min="05:00"
            max="21:00"
            width="145px"
            outline="3px solid #B0AED0"
            step="900"
            _focus={{
              border: "none",
            }}
          />
          <Text>to</Text>
          <Input
            value={formValues.endTime}
            onChange={onEndTimeChange}
            width="145px"
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
      <OutlinedButton fontWeight="500" mt="2" borderColor="#B0AED0">
        Create Event
      </OutlinedButton>
    </form>
  );
};
