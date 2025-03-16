"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, Line, Bar } from "react-chartjs-2";
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
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function SpamAnalytics() {
  const [pieChartData, setPieChartData] = useState({ datasets: [] });
  const [lineChartData, setLineChartData] = useState({ datasets: [] });
  const [barChartData, setBarChartData] = useState({ datasets: [] });

  useEffect(() => {
    setPieChartData({
      labels: ["Phishing", "Scam", "Unsolicited", "Promotional", "Malware"],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            "rgba(239, 68, 68, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(59, 130, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(124, 58, 237, 0.7)",
          ],
          borderColor: [
            "rgba(239, 68, 68, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(124, 58, 237, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setLineChartData({
      labels: [
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
      ],
      datasets: [
        {
          label: "Spam Volume",
          data: [
            2800, 3100, 2950, 3250, 3500, 3750, 4000, 3850, 3600, 3400, 3200,
            3250,
          ],
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          tension: 0.3,
        },
        {
          label: "Detection Rate (%)",
          data: [
            97.2, 97.5, 98.1, 98.4, 98.7, 98.9, 99.1, 99.2, 99.2, 99.3, 99.3,
            99.4,
          ],
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          tension: 0.3,
          yAxisID: "y1",
        },
      ],
    });

    setBarChartData({
      labels: [
        "Sender Reputation",
        "Content Analysis",
        "URL/Link Analysis",
        "Header Analysis",
        "Attachment Analysis",
        "AI Detection",
      ],
      datasets: [
        {
          label: "Detection Contribution",
          data: [35, 25, 15, 10, 5, 10],
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
        text: "Spam Categories Distribution",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Spam Volume and Detection Rate Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Spam Volume",
        },
      },
      y1: {
        beginAtZero: false,
        position: "right" as const,
        min: 95,
        max: 100,
        title: {
          display: true,
          text: "Detection Rate (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
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
        text: "Detection Method Contribution (%)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Spam Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            {pieChartData.datasets.length > 0 && (
              <Pie options={pieOptions} data={pieChartData} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            {barChartData.datasets.length > 0 && (
              <Bar options={barOptions} data={barChartData} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Spam Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            {lineChartData.datasets.length > 0 && (
              <Line options={lineOptions} data={lineChartData} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
