import { digits, rotation } from "@/helpers/digit";
import { Box, BoxProps, SimpleGrid } from "@chakra-ui/react";
import React from "react";

interface ClockProps extends BoxProps {
  digit: number;
  initialRender: boolean;
}

const randomAngle = () => Math.floor(Math.random() * 360);

const normalizeAngle = (next: number, prev: number) => {
  const delta = (((next - prev) % 360) + 360) % 360;
  return prev + delta;
};

// Will represent one mini-clock that will fill in the clock grid
export const Clock: React.FC<ClockProps> = ({ digit, initialRender }) => {
  const digitRepresentationFromDigitMatrix = digits[digit];
  const prevAngles = React.useRef<{ [key: number]: { h: number; m: number } }>(
    {}
  );

  const angles = digitRepresentationFromDigitMatrix.map((char, idx) => {
    const [h, m] = rotation[char as keyof typeof rotation];
    const prev = prevAngles.current[idx] || { h: 0, m: 0 };
    const hourAngle = normalizeAngle(h, prev.h);
    const minuteAngle = normalizeAngle(m, prev.m);
    return { h: hourAngle, m: minuteAngle };
  });

  React.useEffect(() => {
    angles.forEach((angle, idx) => {
      prevAngles.current[idx] = angle;
    });
  }, [angles]);

  const clockFaceStyle: React.CSSProperties = {
    position: "relative",
    width: "2em",
    height: "2em",
    borderRadius: "50%",
    background: "linear-gradient(225deg, #d0d0d0 10%, white)",
    border: "2px solid white",
    // boxShadow: "-2px 2px 6px #d0d0d0, 2px -2px 6px #ffffff",
  };

  return (
    <SimpleGrid
      columns={4}
      columnGap={"2.3em"}
      rowGap={"3px"}
      w={"min-content"}
    >
      {digitRepresentationFromDigitMatrix.map((char, idx) => {
        const { h, m } = angles[idx];

        console.log(h, m);

        const hourHandStyle: React.CSSProperties = {
          position: "absolute",
          top: "0%",
          left: "50%",
          width: "3px",
          height: "50%",
          background: "black",
          transformOrigin: "bottom",
          transform: `translateX(-50%) rotate(${
            initialRender ? randomAngle() : h + 90
          }deg)`,
          transition: `transform ${initialRender ? 1 : 0.4}s`,
        };

        const minuteHandStyle: React.CSSProperties = {
          position: "absolute",
          top: "0%",
          left: "50%",
          width: "3px",
          height: "50%",
          background: "black",
          transformOrigin: "bottom",
          transform: `translateX(-50%) rotate(${
            initialRender ? randomAngle() : m + 90
          }deg)`,
          transition: `transform ${initialRender ? 1 : 0.4}s`,
        };

        return (
          <Box key={idx} style={clockFaceStyle}>
            <Box style={hourHandStyle} />
            <Box style={minuteHandStyle} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
