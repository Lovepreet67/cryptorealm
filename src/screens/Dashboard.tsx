import Navbar from "../components/dashboard/Navbar.tsx";
import Board from "../components/dashboard/board/Board.tsx";
import Trade from "../components/dashboard/Trade.tsx";
import History from "../components/dashboard/history/History.tsx";
import Outcome from "../components/dashboard/outcome/Outcome.tsx";
import { useEffect, useState } from "react";
import details from "../apiclient/details.ts";
import Turnover from "../components/dashboard/Turnover.tsx";
import { useAppDispatch } from "../redux/hooks.ts";

// importing reducer methods
import { populate as populateBalance } from "../redux/balance.ts";
import { populate as populateWatchlist } from "../redux/watchlist.ts";
import { populate as populateTransactions } from "../redux/transactions/transaction.ts";
import { useNavigate } from "react-router-dom";
import Dummy from "../components/utilities/Dummy.tsx";

function Dashboard() {
  const [user, setUser] = useState({ loading: true });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userDetails = await details.userDetails();
      if (userDetails.code) return navigate("/");
      // now we are going to add data to our redux using dispatch;
      dispatch(
        populateBalance({
          error: userDetails?.error,
          value: userDetails?.money,
        }),
      );
      dispatch(
        populateWatchlist({
          error: userDetails?.error,
          value: userDetails?.watchlist,
        }),
      );
      dispatch(
        populateTransactions({
          error: userDetails?.error,
          value: userDetails.transictions,
        }),
      );
      setUser(userDetails);
    })();
  }, [dispatch]);
  if (user.loading)
    return (
      <div
        className={"min-h-screen min-w-full flex items-center justify-center"}
      >
        <Dummy loading={true} size={10} error={""} nothing={false} />
      </div>
    );
  return (
    <div className={"flex flex-col md:mx-10 h-full"}>
      <Navbar />
      <div
        className={
          "flex flex-col md:grid md:grid-cols-[49%_19%_28%] mt-5 gap-5 mx-5 md:mx-0"
        }
      >
        <Board />
        <Trade />
        <Turnover />
        <History />
        <Outcome />
      </div>
    </div>
  );
}

export default Dashboard;
