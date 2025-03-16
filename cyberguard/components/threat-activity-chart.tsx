"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ThreatActivityChart() {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    setChartData({
      labels: hours,
      datasets: [
        {
          label: "Detected Threats",
          data: [
            2, 4, 3, 5, 7, 8, 10, 9, 11, 14, 18, 16, 15, 13, 11, 10, 8, 6, 5, 4,
            3, 2, 1, 2,
          ],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Mitigated Threats",
          data: [
            1, 3, 2, 4, 6, 7, 9, 8, 10, 12, 16, 14, 13, 11, 9, 8, 7, 5, 4, 3, 2,
            1, 0, 1,
          ],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[300px]">
      {chartData.datasets.length > 0 && (
        <Line options={options} data={chartData} />
      )}
    </div>
  );
}
