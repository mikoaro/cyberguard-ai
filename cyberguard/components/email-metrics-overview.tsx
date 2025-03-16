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

export function EmailMetricsOverview() {
  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  const [barChartData, setBarChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    setLineChartData({
      labels: hours,
      datasets: [
        {
          label: "Total Email Volume",
          data: [
            850, 750, 620, 580, 650, 780, 920, 1250, 1850, 2100, 1950, 1750,
            1650, 1800, 1950, 1850, 1700, 1550, 1400, 1250, 1100, 980, 920, 880,
          ],
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          tension: 0.3,
        },
        {
          label: "Spam Detected",
          data: [
            120, 105, 95, 85, 90, 110, 130, 175, 260, 295, 275, 245, 230, 250,
            275, 260, 240, 215, 195, 175, 155, 135, 125, 120,
          ],
          borderColor: "rgb(245, 158, 11)",
          backgroundColor: "rgba(245, 158, 11, 0.5)",
          tension: 0.3,
        },
        {
          label: "Threats Blocked",
          data: [
            15, 12, 10, 8, 9, 11, 14, 22, 35, 42, 38, 32, 28, 31, 36, 33, 29,
            25, 21, 18, 15, 13, 12, 11,
          ],
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          tension: 0.3,
        },
      ],
    });

    setBarChartData({
      labels: ["Spam", "Phishing", "Malware", "BEC", "Spoofing", "Legitimate"],
      datasets: [
        {
          label: "Email Classification",
          data: [3241, 142, 45, 32, 25, 21407],
          backgroundColor: [
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(220, 38, 38, 0.7)",
            "rgba(124, 58, 237, 0.7)",
            "rgba(37, 99, 235, 0.7)",
            "rgba(34, 197, 94, 0.7)",
          ],
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
        text: "Email Traffic (24 Hours)",
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
        display: false,
      },
      title: {
        display: true,
        text: "Email Classification Distribution",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Email Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            {lineChartData.datasets.length > 0 && (
              <Line options={lineOptions} data={lineChartData} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            {barChartData.datasets.length > 0 && (
              <Bar options={barOptions} data={barChartData} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Security Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Spam Detection Rate</span>
                <span className="text-sm font-medium">99.2%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-amber-500 h-2.5 rounded-full"
                  style={{ width: "99.2%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  Phishing Detection Rate
                </span>
                <span className="text-sm font-medium">98.7%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-destructive h-2.5 rounded-full"
                  style={{ width: "98.7%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  Malware Detection Rate
                </span>
                <span className="text-sm font-medium">99.5%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-red-800 h-2.5 rounded-full"
                  style={{ width: "99.5%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">BEC Detection Rate</span>
                <span className="text-sm font-medium">97.8%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-purple-500 h-2.5 rounded-full"
                  style={{ width: "97.8%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">False Positive Rate</span>
                <span className="text-sm font-medium">0.3%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: "0.3%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
