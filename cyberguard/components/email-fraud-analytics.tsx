"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function EmailFraudAnalytics() {
  const [barChartData, setBarChartData] = useState({ datasets: [] });
  const [pieChartData, setPieChartData] = useState({ datasets: [] });
  const [lineChartData, setLineChartData] = useState({ datasets: [] });

  useEffect(() => {
    setBarChartData({
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
          label: "Phishing Attempts",
          data: [65, 78, 86, 92, 110, 120, 145, 132, 115, 102, 87, 95],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "BEC Attacks",
          data: [28, 32, 38, 45, 55, 62, 58, 48, 42, 38, 35, 40],
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Email Spoofing",
          data: [15, 18, 22, 28, 35, 42, 38, 32, 25, 20, 18, 22],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        {
          label: "Spam Campaigns",
          data: [85, 92, 105, 118, 132, 145, 138, 125, 112, 98, 90, 95],
          backgroundColor: "rgba(255, 159, 64, 0.5)",
        },
      ],
    });

    setPieChartData({
      labels: [
        "Phishing",
        "Business Email Compromise",
        "Email Spoofing",
        "Spam",
        "Malware Distribution",
      ],
      datasets: [
        {
          data: [35, 20, 15, 25, 5],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
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
          label: "Detection Rate",
          data: [
            98.2, 98.5, 98.7, 98.9, 99.1, 99.3, 99.4, 99.5, 99.6, 99.7, 99.8,
            99.9,
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.3,
          yAxisID: "y",
        },
        {
          label: "Total Threats",
          data: [185, 220, 245, 278, 325, 365, 342, 310, 285, 255, 230, 250],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.3,
          yAxisID: "y1",
        },
      ],
    });
  }, []);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Email Fraud Attempts by Month",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Email Fraud Types Distribution",
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
        text: "Detection Rate vs. Total Threats",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        min: 98,
        max: 100,
        title: {
          display: true,
          text: "Detection Rate (%)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Total Threats",
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email Fraud Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              {barChartData.datasets.length > 0 && (
                <Bar options={barOptions} data={barChartData} />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email Fraud Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center">
              {pieChartData.datasets.length > 0 && (
                <Pie options={pieOptions} data={pieChartData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detection Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {lineChartData.datasets.length > 0 && (
              <Line options={lineOptions} data={lineChartData} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
