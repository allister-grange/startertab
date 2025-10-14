import { Clock } from "@/components/clock/Clock";
import { digits } from "@/helpers/digit";
import { Grid, SimpleGrid } from "@chakra-ui/react";
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

  console.log(time);
  console.log(initialRender);

  const getTimeDigits = () => {
    const now = new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()].flatMap((val) =>
      String(val).padStart(2, "0").split("").map(Number)
    );
  };

  React.useEffect(() => {
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
      clearTimeout(updateTimerId);
      clearTimeout(initialTimerId);
    };
  }, []);

  const color = `var(--text-color-${tileId})`;
  return (
    <SimpleGrid style={{ color }} columns={6}>
      {/* <Clock digit={1} key={1} initialRender={false} /> */}
      {time.map((digit: number, index: number) => {
        return (
          <Clock digit={digit} key={index} initialRender={initialRender} />
        );
      })}

      {/* {time.map((t, i) => (
        <div key={i}>
          {digits[t].map(({ h, m }, j) => (
            <Clock key={j} h={h} m={m} initial={initial} />
          ))}
        </div>
      ))} */}
    </SimpleGrid>
  );
};
