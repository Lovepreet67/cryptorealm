import { PrimaryButton } from "../../utility";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import HeroImage from "./HeroImage.tsx";

function Hero({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) {
  const [mount, setMount] = useState(true);
  const joinHandler = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setState("signup");
      setTimeout(() => setMount(false), 400);
    },
    [setState],
  );
  useEffect(() => {
    if (state != "image") setTimeout(() => setMount(false), 400);
  }, [state]);

  return (
    <div className={"relative flex h-fit items-center justify-center"}>
      <div className={"grid md:grid-cols-2  overflow-hidden  "}>
        <div className="absolute inset-0 md:hidden flex justify-center items-center overflow-hidden w-[90%]">
          <img
            className="blur-sm opacity-40 w-[25%] aspect-square"
            src="/images/bitcoin.svg"
            alt="Bitcoin"
          />
          <img
            className="blur-sm opacity-40 w-[25%] aspect-square"
            src="/images/ethereum-1.svg"
            alt="Ethereum"
          />
        </div>
        <div
          className={
            "flex gap-10 flex-col h-full py-10 md:py-20 transition duration-500 " +
            (state != "image"
              ? "opacity-0 translate-x-full md:opacity-100 md:translate-x-0 "
              : "opacity-100 translate-x-0 ") +
            (mount ? "" : " hidden md:flex")
          }
        >
          <h1 className={"text-3xl md:text-5xl font-bold"}>
            Dont’s loose real money <br /> to learn instead join <br />{" "}
            CryptoRealm
          </h1>
          <p className={"text-neutral-500 text-justify"}>
            cryptorealm is a platform for learning crypto trade without risk .
            join us and buy , sell coins virtually with virtual money but with
            real feel . Join today and start learning.
          </p>
          <PrimaryButton title={"Join CryptoRealm"} onClick={joinHandler} />
        </div>
        <HeroImage state={state} />
      </div>
    </div>
  );
}

export default Hero;
