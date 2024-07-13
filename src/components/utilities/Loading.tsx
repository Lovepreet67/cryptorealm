import { useEffect, useState } from "react";

function Loading({ size = 5 }: { size?: number }) {
  const [curr, setCurr] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((v) => (v + 1) % 4);
    }, 700);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={"flex w-full items-center justify-center  "}>
      <div className={"flex gap-1 items-center h-fit w-fit"}>
        <div
          className={
            `transition-all duration-700  p-[${size}px] rounded-full bg-rose-100 ` +
            (curr == 0 ? "scale-110 -translate-y-5 bg-rose-500" : "")
          }
        ></div>
        <div
          className={
            `transition-all duration-700  p-[${size}px] rounded-full bg-rose-100  ` +
            (curr == 1 ? "scale-110 -translate-y-5 bg-rose-500" : "")
          }
        ></div>
        <div
          className={
            `transition-all duration-700 p-[${size}px] rounded-full bg-rose-100 ` +
            (curr == 2 ? "scale-110 -translate-y-5 bg-rose-500" : "")
          }
        ></div>
        <div
          className={
            `transition-all duration-700 p-[${size}px] rounded-full bg-rose-100 ` +
            (curr == 3 ? "scale-110 -translate-y-5 bg-rose-500" : "")
          }
        ></div>
      </div>
    </div>
  );
}

export default Loading;
