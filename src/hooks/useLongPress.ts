import { useState, useEffect, MouseEventHandler } from "react";

export function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: number | undefined;
    if (startLongPress) {
      timerId = window.setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.button === 0) {
        setStartLongPress(true);
      }
    },
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
