import React from "react";
import Image from "next/image";
export default function HeroImage() {
  return (
    <div className={"w-full mx-auto  z-100"}>
      <div>
        <Image
          src="./images/bitcoin.svg"
          className="h-[10rem] w-[35%] mx-auto "
          width={100}
          height={90}
          alt="bitcoin"
        />
        <br />
        <Image
          src={"./images/ethereum-1.svg"}
          className="h-[50%] w-[35%] mx-auto "
          width={100}
          height={90}
          alt="ethereum"
        />
      </div>
    </div>
  );
}
