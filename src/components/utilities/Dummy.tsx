import Loading from "./Loading.tsx";

function Dummy({
  loading,
  error,
  nothing,
  size,
}: {
  loading: boolean;
  error?: string;
  nothing?: boolean;
  size?: number;
}) {
  if (loading) return <Loading size={size} />;
  else if (error?.length > 0)
    return (
      <div
        className={
          "h-full w-full flex items-center text-center justify-center font-extrabold text-xl text-rose-500 overflow-ellipsis "
        }
      >
        {error}
      </div>
    );
  else if (nothing)
    return (
      <div
        className={
          " w-full flex items-center text-center justify-center font-extrabold text-xl overflow-ellipsis"
        }
      >
        Nothing to show
      </div>
    );
  else return <div className={"hidden"}></div>;
}

export default Dummy;
