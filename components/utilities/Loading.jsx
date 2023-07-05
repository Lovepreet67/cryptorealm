import React from "react";

export default function Loading({ size }) {
  return (
    <div
      className={`space-x-1 m-auto  flex px-3 py-1 rounded-xl shadow-xl justify-center max-w-${
        3 * size
      } h-${2 * size}`}
    >
      <div
        className={`duration-300 animate-bounce  h-${size} w-${size} rounded-full bg-gray-700`}
      ></div>
      <div
        className={`animation-delay-300 duration-300  animate-bounce   h-${size} w-${size} rounded-full bg-gray-700`}
      ></div>
      <div
        className={`animation-delay-600 duration-300  animate-bounce  h-${size} w-${size} rounded-full bg-gray-700`}
      ></div>
    </div>
  );
}
