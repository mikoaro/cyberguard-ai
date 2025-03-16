"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function FinancialFraudMetrics() {
  const metrics = [
    {
      title: "Transaction Fraud Detection",
      value: 99,
      description: "Percentage of fraudulent transactions detected",
    },
    {
      title: "False Decline Rate",
      value: 3,
      description: "Percentage of legitimate transactions declined",
    },
    {
      title: "Account Takeover Prevention",
      value: 97,
      description: "Percentage of account takeover attempts prevented",
    },
    {
      title: "Response Time",
      value: 98,
      description: "Speed of financial fraud response (percentile)",
    },
    {
      title: "Financial Loss Prevention",
      value: 99.5,
      description: "Percentage of potential financial loss prevented",
    },
    {
      title: "Transaction Monitoring Coverage",
      value: 100,
      description: "Percentage of transactions monitored by AI",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}%</div>
            <Progress value={metric.value} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
