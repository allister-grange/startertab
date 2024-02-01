import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { sidebarOpenAtom } from "@/recoil/SidebarAtoms";
import {
  timeTileShowing12HourSelector,
  timeTileShowingSecondsSelector,
  timeTileShowingTimerSelector,
} from "@/recoil/UserSettingsSelectors";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface TimeProps {
  tileId: number;
}

function getCurrentTime(
  is12HourFormat: boolean,
  isShowingSeconds: boolean
): string {
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

  return timeString;
}

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

  const intervalRef = useRef<number>();
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
    setTime(getCurrentTime(is12HourFormat!, isShowingSeconds!));
  }, [is12HourFormat, isShowingSeconds]);

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
      document.title = getTime(prevTimer! - 1);
      return prevTimer! - 1;
    });
  };

  const startOrResetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimer(timerPlaceholder! * 60);
    setTimer(timerPlaceholder! * 60);
    document.title = getTime(timerPlaceholder! * 60);
    // will only run on the browser, so we can cast it
    const interval = setInterval(tickTimer, 1000) as unknown as number;
    intervalRef.current = interval;
  };

  const getTime = (time: number) => {
    let minutes: any = parseInt((time / 60) as unknown as string, 10);
    let seconds: any = parseInt((time % 60) as unknown as string, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (isShowingSeconds) {
      console.log("there");

      return minutes + ":" + seconds;
    } else {
      console.log("here");

      return minutes;
    }
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
      <Heading marginX="auto" fontSize={isShowingTimer ? "38" : "48"}>
        {timer ? getTime(timer) : time}
      </Heading>
      {isShowingTimer && (
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
