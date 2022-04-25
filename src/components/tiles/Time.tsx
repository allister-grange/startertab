import { Box, Button, Heading, Input, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface TimeProps {}

export const Time: React.FC<TimeProps> = ({}) => {
  const [time, setTime] = useState("");
  const [timerPlaceholder, setTimerPlaceholder] = useState<undefined | number>(
    undefined
  );
  const [timer, setTimer] = useState<undefined | number>(undefined);
  const color = useColorModeValue("white", "#222222");

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
    }
  }, [timer]);

  const tickTimer = () => {
    setTimer((prevTimer) => prevTimer! - 1);
  };

  const startTimer = () => {
    setTimer(timerPlaceholder! * 60);
    setInterval(tickTimer, 1000);
  };

  const getMinutesAndSeconds = (time: number) => {
    let minutes: any = parseInt((time / 60) as unknown as string, 10);
    let seconds: any = parseInt((time % 60) as unknown as string, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
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
    >
      <Heading marginX="auto">
        {timer ? getMinutesAndSeconds(timer) : time}
      </Heading>
      <Box display="flex" flexDir="row">
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
        />
        <Button ml="1" border="1px" bg="transparent" onClick={startTimer}>
          Go
        </Button>
      </Box>
    </Box>
  );
};
