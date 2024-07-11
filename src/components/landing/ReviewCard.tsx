import { useEffect } from "react";

function ReviewCard({
  comment,
  imgSrc,
  imgAlt,
}: {
  comment: string;
  imgSrc: string;
  imgAlt: string;
}) {
  useEffect(() => {
    console.log("i am running now :)");
  }, []);
  return (
    <div
      className={
        " md:flex gap-10 md:w-[70%] justify-evenly shadow-md rounded-xl px-5 py-2 cursor-pointer hover:shadow-lg"
      }
    >
      <img
        className={
          "rounded-full h-16 aspect-square float-left md:float-none mr-5 md:mr-0"
        }
        src={imgSrc}
        alt={imgAlt}
      />
      <p className={"text-justify"}>{comment}</p>
    </div>
  );
}

export default ReviewCard;
