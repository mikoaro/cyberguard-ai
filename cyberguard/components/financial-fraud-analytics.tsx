"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Doughnut } from "react-chartjs-2";
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

export function FinancialFraudAnalytics() {
  const [barChartData, setBarChartData] = useState({ datasets: [] });
  const [doughnutChartData, setDoughnutChartData] = useState({ datasets: [] });

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
          label: "Transaction Fraud",
          data: [42, 48, 55, 62, 75, 85, 78, 68, 58, 52, 48, 55],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Account Takeovers",
          data: [18, 22, 28, 35, 42, 48, 45, 38, 32, 28, 25, 30],
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Identity Theft",
          data: [12, 15, 18, 22, 28, 32, 30, 25, 20, 18, 15, 18],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    });

    setDoughnutChartData({
      labels: [
        "Transaction Fraud",
        "Account Takeover",
        "Identity Theft",
        "Wire Transfer Fraud",
        "Payment Fraud",
      ],
      datasets: [
        {
          data: [40, 25, 15, 12, 8],
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
  }, []);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Financial Fraud Attempts by Month",
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Financial Fraud Types Distribution",
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Financial Fraud Trends</CardTitle>
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
          <CardTitle>Financial Fraud Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            {doughnutChartData.datasets.length > 0 && (
              <Doughnut options={doughnutOptions} data={doughnutChartData} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
