import { Clock } from "@/components/clock/Clock";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

type PageProps = {
  tileId: number;
};

/*
Inspired by:
u/EntropyReversed
https://codepen.io/EntropyReversed/pen/QwybYEJ
https://github.com/githyperplexed/clock-of-clocks
*/

export const ClockOfClocksTile: React.FC<PageProps> = ({ tileId }) => {
  // [1, 6, 3, 6, 2, 9] = 4:36:29pm
  const [time, setTime] = React.useState<number[]>(Array(6).fill(0));
  const [initialRender, setInitialRender] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = React.useState(10);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const getTimeDigits = () => {
    const now = new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()].flatMap((val) =>
      String(val).padStart(2, "0").split("").map(Number)
    );
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const width = ref.current.offsetWidth;
        setContainerWidth(width);

        let newFontSize;
        if (width < 800) {
          newFontSize = width / 60;
        } else {
          newFontSize = 800 / 60 + (width - 800) / 30;
        }
        setFontSize(newFontSize);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    handleResize(); // initial size

    let updateTimerId: NodeJS.Timeout;
    const updateTime = () => {
      setTime(getTimeDigits());
      const now = Date.now();
      const delay = 1000 - (now % 1000);
      updateTimerId = setTimeout(updateTime, delay);
    };

    // wait 600ms before we spin the clocks
    const initialTimerId = setTimeout(() => {
      setInitialRender(false);
      updateTime();
    }, 600);

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
      clearTimeout(updateTimerId);
      clearTimeout(initialTimerId);
    };
  }, []);

  const color = `var(--text-color-${tileId})`;
  return (
    <Box
      ref={ref}
      style={{ color, fontSize: `${fontSize}px` }}
      display={"flex"}
      gap="3.3em"
      justifyContent={"center"}
      alignItems={"center"}
      h="100%"
    >
      <HStack justifyContent={"center"} minW={"max-content"}>
        <Clock digit={time[0]} initialRender={initialRender} />
        <Clock digit={time[1]} initialRender={initialRender} />
      </HStack>
      <HStack justifyContent={"center"} minW={"max-content"}>
        <Clock digit={time[2]} initialRender={initialRender} />
        <Clock digit={time[3]} initialRender={initialRender} />
      </HStack>
      {containerWidth > 350 && (
        <HStack justifyContent={"center"} minW={"max-content"}>
          <Clock digit={time[4]} initialRender={initialRender} />
          <Clock digit={time[5]} initialRender={initialRender} />
        </HStack>
      )}
    </Box>
  );
};
