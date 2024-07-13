import { Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import details from "../../../apiclient/details.ts";
import "chart.js/auto";
import Dummy from "../../utilities/Dummy.tsx";
export default function LineChart({ coinId, change }) {
  const ref = useRef();
  const [graph, setGraph] = useState(undefined);
  useEffect(() => {
    (async () => {
      const result = await details.oneDayCoinDetails(coinId);
      setGraph(result.prices.map((e) => e[1]).filter((x, i) => i % 12 == 0));
    })();
  }, [coinId]);
  if (window.innerWidth <= 768) return <div className={"hidden"}></div>;
  if (!graph && window.innerWidth > 768)
    return <Dummy loading={true} size={5} />;
  else {
    const data = {
      labels: [...Array(graph.length).keys()],
      datasets: [
        {
          data: graph,
          fill: false,
          pointRadius: 0,
          borderColor: change < 0 ? "rgb(244,63,94)" : "#0f0",
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    };
    return (
      <div className="hidden sm:block">
        <Line ref={ref} width={40} height={40} data={data} options={options} />
      </div>
    );
  }
}
