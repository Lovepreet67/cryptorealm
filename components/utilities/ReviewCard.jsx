import React from "react";
import Image from "next/image";
export default function ReviewCard({ imagePath, description, num }) {
  return (
    <div
      className={`flex h-24 md:w-[50%] border py-10 px-1 rounded-xl shadow-lg items-center m-auto  ${
        Number(num) % 2 == 0 ? "flex-row-reverse md:mr-[20%] " : "md:ml-[20%] "
      }`}
    >
      <div className="m-3">
        <Image
          src={imagePath}
          alt="Person Image"
          width={100}
          height={100}
          className={`rounded-full `}
        />
      </div>
      <p>{description}</p>
    </div>
  );
}
