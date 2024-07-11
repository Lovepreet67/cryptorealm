import { ButtonProps } from "./Interfaces.ts";

function SecondaryButton({ title, onClick }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={
        "cursor-pointer select-none  transition-all hover:drop-shadow-lg hover:-translate-y-0.5  active:drop-shadow-sm active:translate-y-0 "
      }
    >
      <div className={"text-lg font-semibold"}>{title}</div>
    </div>
  );
}

export default SecondaryButton;
