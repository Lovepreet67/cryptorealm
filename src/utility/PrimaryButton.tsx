import { ButtonProps } from "./Interfaces.ts";

function PrimaryButton({ title, onClick }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={
        "cursor-pointer select-none rounded-xl bg-primary px-5  w-fit h-fit py-1 transition-all hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
      }
    >
      <div className={"text-lg font-semibold "}>{title}</div>
    </div>
  );
}

export default PrimaryButton;
