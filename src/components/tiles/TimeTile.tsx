import { TileId } from "@/types";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { OutlinedButton } from "@/components/ui/OutlinedButton";

interface TimeProps {
  tileId: TileId;
}

export const TimeTile: React.FC<TimeProps> = ({ tileId }) => {
  const [time, setTime] = useState("");
  const [timerPlaceholder, setTimerPlaceholder] = useState<
    undefined | number
  >();
  const [timer, setTimer] = useState<undefined | number>(undefined);
  const intervalRef = useRef<NodeJS.Timer | undefined>();
  const color = `var(--text-color-${tileId})`;

  const updateTime = () => {
    setTime(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
  };

  useEffect(() => {
    setInterval(updateTime, 1000);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      alert("timer over!!");
      setTimer(undefined);
      clearInterval(intervalRef.current!);
      document.title = "Timer finished!";
    }
  }, [timer]);

  const tickTimer = () => {
    setTimer((prevTimer) => {
      document.title = getMinutesAndSeconds(prevTimer! - 1);
      return prevTimer! - 1;
    });
  };

  const startOrResetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimer(timerPlaceholder! * 60);
    setTimer(timerPlaceholder! * 60);
    document.title = getMinutesAndSeconds(timerPlaceholder! * 60);
    const interval = setInterval(tickTimer, 1000);
    intervalRef.current = interval;
  };

  const getMinutesAndSeconds = (time: number) => {
    let minutes: any = parseInt((time / 60) as unknown as string, 10);
    let seconds: any = parseInt((time % 60) as unknown as string, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startOrResetTimer();
    }
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDir="column"
      p="4"
      alignItems="center"
      justifyContent="center"
      color={color}
      position="relative"
    >
      <Heading marginX="auto">
        {timer ? getMinutesAndSeconds(timer) : time}
      </Heading>
      <Box display="flex" flexDir="row" width="200px" mt="3">
        <Input
          borderColor={color}
          type="number"
          value={timerPlaceholder}
          onChange={(e) => setTimerPlaceholder(parseInt(e.target.value))}
          placeholder="timer"
          colorScheme="white"
          mb="4"
          mr="1"
          _placeholder={{
            color: color,
          }}
          borderRadius="7"
          size="sm"
          _focus={{
            borderColor: { color },
          }}
          onKeyUpCapture={keyPress}
        />
        <OutlinedButton
          size="sm"
          ml="1"
          borderColor={color}
          borderWidth="1px"
          onClick={startOrResetTimer}
        >
          {intervalRef.current ? "reset" : "go"}
        </OutlinedButton>
      </Box>
    </Box>
  );
};
