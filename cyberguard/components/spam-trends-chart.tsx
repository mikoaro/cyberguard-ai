"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function SpamTrendsChart() {
  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  const [barChartData, setBarChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  useEffect(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    setLineChartData({
      labels: days,
      datasets: [
        {
          label: "Total Emails",
          data: [12458, 13245, 14587, 13985, 15247, 9854, 8745],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
        {
          label: "Spam Detected",
          data: [1248, 1354, 1587, 1298, 1624, 985, 874],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Phishing Attempts",
          data: [87, 95, 112, 78, 105, 45, 38],
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          tension: 0.3,
        },
      ],
    });

    setBarChartData({
      labels: ["Phishing", "Scam", "Malware", "Bulk", "Promotional", "Other"],
      datasets: [
        {
          label: "Spam Types Distribution",
          data: [42, 18, 12, 15, 8, 5],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weekly Email and Spam Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Spam Types Distribution (%)",
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Spam Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {lineChartData.datasets.length > 0 && (
              <Line options={lineOptions} data={lineChartData} />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Spam Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {barChartData.datasets.length > 0 && (
              <Bar options={barOptions} data={barChartData} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
