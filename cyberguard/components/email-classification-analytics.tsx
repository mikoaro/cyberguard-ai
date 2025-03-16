"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function EmailClassificationAnalytics() {
  const [pieChartData, setPieChartData] = useState({ datasets: [] });
  const [barChartData, setBarChartData] = useState({ datasets: [] });

  useEffect(() => {
    setPieChartData({
      labels: [
        "Transactional",
        "Marketing",
        "Internal",
        "Financial",
        "Newsletter",
        "Security",
        "Phishing",
        "Malware",
      ],
      datasets: [
        {
          data: [30, 25, 20, 10, 8, 3, 3, 1],
          backgroundColor: [
            "rgba(124, 58, 237, 0.7)",
            "rgba(79, 70, 229, 0.7)",
            "rgba(59, 130, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(6, 182, 212, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(185, 28, 28, 0.7)",
          ],
          borderColor: [
            "rgba(124, 58, 237, 1)",
            "rgba(79, 70, 229, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(6, 182, 212, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(185, 28, 28, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setBarChartData({
      labels: [
        "Sender Analysis",
        "Content Analysis",
        "Header Analysis",
        "Attachment Analysis",
        "URL Analysis",
        "AI Pattern Recognition",
      ],
      datasets: [
        {
          label: "Classification Contribution",
          data: [30, 25, 15, 10, 10, 10],
          backgroundColor: [
            "rgba(59, 130, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(124, 58, 237, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(236, 72, 153, 0.7)",
          ],
        },
      ],
    });
  }, []);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Email Classification Distribution",
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Classification Method Contribution (%)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Email Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            {pieChartData.datasets.length > 0 && (
              <Pie options={pieOptions} data={pieChartData} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Classification Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {barChartData.datasets.length > 0 && (
              <Bar options={barOptions} data={barChartData} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Classification Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Overall Accuracy</span>
                  <span className="text-sm font-medium">99.5%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: "99.5%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Processing Speed</span>
                  <span className="text-sm font-medium">98.7%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "98.7%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Threat Detection</span>
                  <span className="text-sm font-medium">99.2%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-destructive h-2.5 rounded-full"
                    style={{ width: "99.2%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    False Positive Rate
                  </span>
                  <span className="text-sm font-medium">0.3%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{ width: "0.3%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    False Negative Rate
                  </span>
                  <span className="text-sm font-medium">0.2%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-red-800 h-2.5 rounded-full"
                    style={{ width: "0.2%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    AI Model Confidence
                  </span>
                  <span className="text-sm font-medium">97.8%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: "97.8%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
