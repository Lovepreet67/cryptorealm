import { useEffect, useState } from "react";

function Loading({ size = 8 }: { size?: number }) {
  const [curr, setCurr] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((v) => (v + 1) % 4);
    }, 700);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const dotStyle = (isActive: boolean) =>
    `transition-all duration-700 rounded-full ${
      isActive ? "scale-110 -translate-y-5 bg-rose-500" : "bg-rose-100"
    }`;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex gap-1 items-center">
        <div
          className={dotStyle(curr === 0)}
          style={{ padding: `${size}px` }}
        ></div>
        <div
          className={dotStyle(curr === 1)}
          style={{ padding: `${size}px` }}
        ></div>
        <div
          className={dotStyle(curr === 2)}
          style={{ padding: `${size}px` }}
        ></div>
        <div
          className={dotStyle(curr === 3)}
          style={{ padding: `${size}px` }}
        ></div>
      </div>
    </div>
  );
}

export default Loading;
