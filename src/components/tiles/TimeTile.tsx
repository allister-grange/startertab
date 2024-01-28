import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import { isTimerTile12HourSelector } from "@/recoil/UserSettingsSelectors";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface TimeProps {
  tileId: number;
}

export const TimeTile: React.FC<TimeProps> = ({ tileId }) => {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const [time, setTime] = useState("");
  const [timerPlaceholder, setTimerPlaceholder] = useState<number>();
  const [timer, setTimer] = useState<number>();

  const [is12HourFormat, setIs12HourFormat] = useRecoilState(
    isTimerTile12HourSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<boolean | undefined>];

  const intervalRef = useRef<number>();
  const color = `var(--text-color-${tileId})`;

  const updateTime = React.useCallback(() => {
    const now = new Date();
    setTime(
      is12HourFormat
        ? now.toLocaleTimeString("en-US").replace("PM", "").replace("AM", "")
        : now.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    );
  }, [is12HourFormat]);

  useEffect(() => {
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, [updateTime]);

  useEffect(() => {
    if (timer === 0) {
      alert("Timer finished ⏱️");
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
    // will only run on the browser, so we can cast it
    const interval = setInterval(tickTimer, 1000) as unknown as number;
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
      {sidebarOpen && (
        <Button
          position="absolute"
          right="2"
          bottom="2"
          size="xs"
          background="transparent"
          color={color}
          opacity={0.8}
          onClick={() => setIs12HourFormat(!is12HourFormat)}
        >
          {is12HourFormat ? "24h" : "12h"}
        </Button>
      )}
    </Box>
  );
};
