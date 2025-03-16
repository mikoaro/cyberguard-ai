"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function ClassificationAccuracyChart() {
  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  const [doughnutChartData, setDoughnutChartData] = useState<
    ChartData<"doughnut">
  >({
    datasets: [],
  });

  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    setLineChartData({
      labels: months,
      datasets: [
        {
          label: "Overall Accuracy",
          data: [
            98.2, 98.5, 98.7, 98.9, 99.1, 99.2, 99.3, 99.4, 99.5, 99.6, 99.7,
            99.7,
          ],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
        {
          label: "Phishing Detection",
          data: [
            97.5, 97.8, 98.2, 98.5, 98.8, 99.0, 99.2, 99.3, 99.5, 99.6, 99.8,
            99.9,
          ],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Spam Detection",
          data: [
            96.8, 97.2, 97.5, 97.8, 98.2, 98.5, 98.7, 98.9, 99.1, 99.2, 99.3,
            99.4,
          ],
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          tension: 0.3,
        },
      ],
    });

    setDoughnutChartData({
      labels: [
        "Correct Classification",
        "False Positives",
        "False Negatives",
        "Misclassification",
      ],
      datasets: [
        {
          data: [99.7, 0.2, 0.08, 0.02],
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(255, 159, 64)",
            "rgb(255, 99, 132)",
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
        text: "Classification Accuracy Trends (%)",
      },
    },
    scales: {
      y: {
        min: 95,
        max: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Current Classification Performance (%)",
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Classification Accuracy Trends</CardTitle>
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
          <CardTitle>Current Classification Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {doughnutChartData.datasets.length > 0 && (
              <Doughnut options={doughnutOptions} data={doughnutChartData} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
