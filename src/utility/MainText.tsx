function MainText({ text }: { text: string }) {
  return (
    <p
      className={"font-bold text-2xl md:text-3xl text-neutral-700 mb-3 mt-10 "}
    >
      {text}
    </p>
  );
}

export default MainText;
