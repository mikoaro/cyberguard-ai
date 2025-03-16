"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SecurityMetrics() {
  const metrics = [
    {
      title: "Threat Detection Rate",
      value: 98,
      description: "Percentage of threats detected by AI",
    },
    {
      title: "False Positive Rate",
      value: 3,
      description: "Percentage of false positive alerts",
    },
    {
      title: "Automated Response Rate",
      value: 87,
      description: "Percentage of incidents handled automatically",
    },
    {
      title: "Mean Time to Detect",
      value: 92,
      description: "Speed of threat detection (percentile)",
    },
    {
      title: "Mean Time to Respond",
      value: 95,
      description: "Speed of incident response (percentile)",
    },
    {
      title: "System Coverage",
      value: 99,
      description: "Percentage of systems monitored",
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
