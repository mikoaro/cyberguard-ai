"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function EmailFraudMetrics() {
  const metrics = [
    {
      title: "Phishing Detection Rate",
      value: 99.8,
      description: "Percentage of phishing emails detected",
    },
    {
      title: "Spam Detection Rate",
      value: 99.4,
      description: "Percentage of spam emails detected",
    },
    {
      title: "False Positive Rate",
      value: 0.2,
      description: "Percentage of legitimate emails flagged as malicious",
    },
    {
      title: "BEC Detection Rate",
      value: 98,
      description: "Percentage of business email compromise attempts detected",
    },
    {
      title: "Classification Accuracy",
      value: 99.7,
      description: "Overall accuracy of email classification system",
    },
    {
      title: "Response Time",
      value: 95,
      description: "Speed of email threat response (percentile)",
    },
    {
      title: "User Awareness",
      value: 87,
      description: "User awareness score based on phishing simulations",
    },
    {
      title: "Email Security Coverage",
      value: 100,
      description: "Percentage of email traffic analyzed by AI",
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
