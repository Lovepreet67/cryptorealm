import React from "react";
import Image from "next/image";
export default function Card({
  num,
  title,
  imagePosition,
  imagePath,
  description,
}) {
  return (
    <div
      className={`m-auto border rounded-xl ${num ? "h-[200px]" : "h-[170px]"} ${
        imagePosition == "right" ? "flex" : " flex flex-row-reverse"
      } shadow-lg  px-10 py-3 w-[500px]`}
    >
      <div className="space-y-2">
        {num && <h1 className="text-3xl text-gray-400">0{num}</h1>}
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
      <Image
        src={imagePath}
        alt="coin image"
        width={100}
        height={100}
        className="mx-3"
      ></Image>
    </div>
  );
}
