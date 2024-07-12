import PrimaryButton from "./PrimaryButton.tsx";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import SecondaryButton from "./SecondaryButton.tsx";

function Navbar({ setState }: { setState: Dispatch<SetStateAction<string>> }) {
  const stateHandler = useCallback(
    (e: React.MouseEvent<HTMLElement>, state: string) => {
      e.preventDefault();
      e.stopPropagation();
      setState(state);
      setOpen(false);
    },
    [setState],
  );

  const linkHandler = useCallback((destination: string) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setOpen(false);
      const element = document.getElementById(destination);
      element?.scrollIntoView({
        behavior: "smooth",
      });
    };
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <div className={"flex  md:mx-5 justify-between mt-3  "}>
      <div className={"text-2xl font-semibold"}>CryptoRealm</div>
      <div className={"hidden md:flex gap-5 text-lg items-center"}>
        <SecondaryButton title={"About"} onClick={linkHandler("About")} />
        <SecondaryButton title={"Features"} onClick={linkHandler("Features")} />
        <SecondaryButton
          title={"Login"}
          onClick={(e) => stateHandler(e, "login")}
        />
        <PrimaryButton
          title={"Signup"}
          onClick={(e) => stateHandler(e, "signup")}
        />
      </div>
      <div className={"flex flex-col items-end md:hidden"}>
        <button
          onClick={() => setOpen((open) => !open)}
          className={
            "transition-all duration-100 " + (open ? "rotate-180" : "rotate-0")
          }
        >
          {!open ? (
            <img
              className={"h-7 md:h-10 "}
              src={"/images/hamburger.svg"}
              alt={"Hamburger"}
            />
          ) : (
            <img
              className={"h-7 md:h-10 "}
              src={"/images/cross.svg"}
              alt={"Hamburger"}
            />
          )}
        </button>
        <div
          className={
            "flex flex-col text-xl items-start shadow-md rounded-xl px-5 gap-y-3 [&>*]:border-b-2  pb-3 z-50 fixed mt-10 bg-white transition-all duration-700 top-7 " +
            (!open ? "-right-32" : "right-7 ")
          }
        >
          <button className={"border-b-2"} onClick={linkHandler("About")}>
            About
          </button>
          <button onClick={linkHandler("Features")}>Features</button>
          <button onClick={(e) => stateHandler(e, "login")}>Login</button>
          <button onClick={(e) => stateHandler(e, "signup")}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
