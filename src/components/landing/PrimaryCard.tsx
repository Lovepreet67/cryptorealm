interface PrimaryCardProps {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  num?: number;
}
function PrimaryCard({
  title,
  description,
  imgSrc,
  imgAlt,
  num,
}: PrimaryCardProps) {
  return (
    <div
      className={
        " transition-all grid grid-cols-2 md:grid-cols-3 gap-10 shadow-md rounded-lg px-5 py-3 hover:shadow-xl min-h-6 cursor-pointer"
      }
    >
      <div className={"col-span-2"}>
        <h1 className={"text-2xl font-bold"}>
          {num && <span className={"text-neutral-500 mr-2"}>0{num}</span>}
          {title}
        </h1>
        <p className={"text-neutral-600"}>{description}</p>
      </div>
      <div className={"hidden md:block col-span-2 md:col-span-1"}>
        <img className={"h-20"} src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  );
}

export default PrimaryCard;
