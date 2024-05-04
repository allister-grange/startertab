import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import {
  timeTileShowing12HourSelector,
  timeTileShowingSecondsSelector,
  timeTileShowingTimerSelector,
} from "@/recoil/UserSettingsSelectors";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface TimeProps {
  tileId: number;
}

const getTimerDisplayText = (time: number) => {
  let minutes: any = parseInt((time / 60).toString(), 10);
  let seconds: any = parseInt((time % 60).toString(), 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
};

export const TimeTile: React.FC<TimeProps> = ({ tileId }) => {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const [time, setTime] = useState("");
  const [timerPlaceholder, setTimerPlaceholder] = useState<number>();
  const [timer, setTimer] = useState<number>();

  const [is12HourFormat, setIs12HourFormat] = useRecoilState(
    timeTileShowing12HourSelector(tileId)
  ) as [boolean | undefined, SetterOrUpdater<boolean | undefined>];
  const [isShowingTimer, setIsShowingTimer] = useRecoilState(
    timeTileShowingTimerSelector(tileId)
  ) as [boolean | undefined, SetterOrUpdater<boolean | undefined>];
  const [isShowingSeconds, setIsShowingSeconds] = useRecoilState(
    timeTileShowingSecondsSelector(tileId)
  ) as [boolean | undefined, SetterOrUpdater<boolean | undefined>];

  const intervalRef = useRef<NodeJS.Timeout>();
  const color = `var(--text-color-${tileId})`;

  // old clients before the setting update need the value initialized
  if (isShowingSeconds === undefined) {
    setIsShowingSeconds(true);
  }
  if (is12HourFormat === undefined) {
    setIs12HourFormat(false);
  }
  if (isShowingTimer === undefined) {
    setIsShowingTimer(false);
  }

  const updateTime = React.useCallback(() => {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let timeString = "";

    if (is12HourFormat) {
      // Convert 24 hour time to 12 hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      timeString = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
    } else {
      // 24 hour format
      timeString = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
    }

    if (isShowingSeconds) {
      // Append seconds to the time string
      timeString += `:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    setTime(timeString);
  }, [is12HourFormat, isShowingSeconds]);

  useEffect(() => {
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, [updateTime, is12HourFormat, isShowingSeconds]);

  // Load timer state from localStorage
  useEffect(() => {
    const loadTimer = () => {
      const storedTimer = localStorage.getItem("timer");
      const storedStartTime = localStorage.getItem("timer-start");
      const storedDuration = localStorage.getItem("timer-duration");
      if (storedTimer && storedStartTime && storedDuration) {
        const now = Date.now();
        const startTime = parseInt(storedStartTime, 10);
        const duration = parseInt(storedDuration, 10);
        const elapsedTime = Math.floor((now - startTime) / 1000);
        const remainingTime = duration - elapsedTime;

        if (remainingTime > 0) {
          clearInterval(intervalRef.current);
          setTimer(remainingTime);
          startTimer(remainingTime); // Adjust this to resume from remaining time
        } else {
          clearTimerState();
          alert("Timer finished!");
        }
      }
    };
    updateTime();
    loadTimer();

    return () => {
      // Cleanup: Clear the interval when the component is unmounted
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = (duration: number) => {
    setTimer(duration);
    const startTime = Date.now();
    localStorage.setItem("timer", duration.toString());
    localStorage.setItem("timer-start", startTime.toString());
    localStorage.setItem("timer-duration", duration.toString());

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsedTime = Math.floor((now - startTime) / 1000);
      const remainingTime = duration - elapsedTime;

      if (remainingTime >= 0) {
        setTimer(remainingTime);
      } else {
        clearInterval(intervalId);
        alert("Timer finished!");
        clearTimerState();
      }
    }, 1000);

    intervalRef.current = intervalId;

    return () => clearInterval(intervalId);
  };

  const handleStart = () => {
    clearInterval(intervalRef.current);
    const durationInSeconds = timerPlaceholder! * 60; // Convert minutes to seconds
    startTimer(durationInSeconds);
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleStart();
    }
  };

  const clearTimerState = () => {
    setTimer(undefined);
    localStorage.removeItem("timer");
    localStorage.removeItem("timer-start");
    localStorage.removeItem("timer-duration");
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
      <Text
        fontWeight="700"
        marginX="auto"
        fontSize={isShowingTimer ? "38" : "42"}
      >
        {timer ? getTimerDisplayText(timer) : time}
      </Text>
      {isShowingTimer && (
        <Box display="flex" flexDir="row" width="200px" mt="3">
          <Input
            borderColor={color}
            type="number"
            value={timerPlaceholder}
            onChange={(e) => setTimerPlaceholder(parseInt(e.target.value))}
            placeholder="timer - minutes"
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
            onClick={handleStart}
          >
            {intervalRef.current ? "reset" : "go"}
          </OutlinedButton>
        </Box>
      )}
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
