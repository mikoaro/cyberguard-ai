"use client";

import { useState } from "react";
import { useSecurityContext } from "@/context/security-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Shield,
} from "lucide-react";
import { FinancialFraudMetrics } from "@/components/financial-fraud-metrics";
import { FinancialFraudAnalytics } from "@/components/financial-fraud-analytics";

export function FinancialFraudDetection() {
  const { threats, incidents, markThreatAsResolved } = useSecurityContext();
  const [selectedTab, setSelectedTab] = useState("threats");

  // Filter threats and incidents related to financial fraud
  const financialThreats = threats.filter(
    (threat) => threat.type === "Financial Fraud"
  );
  const financialIncidents = incidents.filter(
    (incident) => incident.category === "Financial Fraud"
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "investigating":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "mitigated":
      case "mitigating":
        return <Shield className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-destructive text-destructive-foreground";
      case "investigating":
        return "bg-amber-500 text-white";
      case "mitigated":
      case "mitigating":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Threats
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financialThreats.filter((t) => t.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Financial fraud threats detected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transaction Fraud
            </CardTitle>
            <CreditCard className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                financialThreats.filter((t) =>
                  t.title.toLowerCase().includes("transaction")
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Suspicious transactions detected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Takeovers
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                financialThreats.filter((t) =>
                  t.title.toLowerCase().includes("account")
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Account takeover attempts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prevention Rate
            </CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              Fraud prevention success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="threats" onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="threats">Financial Threats</TabsTrigger>
          <TabsTrigger value="incidents">Financial Incidents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="threats">
          <Card>
            <CardHeader>
              <CardTitle>Financial Fraud Threats</CardTitle>
              <CardDescription>
                AI-detected financial fraud attempts including suspicious
                transactions and account takeovers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {financialThreats.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No financial fraud threats detected
                    </p>
                  ) : (
                    financialThreats.map((threat) => (
                      <Card
                        key={threat.id}
                        className="border-l-4"
                        style={{
                          borderLeftColor:
                            threat.status === "active"
                              ? "var(--destructive)"
                              : threat.status === "investigating"
                              ? "orange"
                              : threat.status === "mitigated"
                              ? "blue"
                              : "green",
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(threat.status)}
                              <CardTitle className="text-lg">
                                {threat.title}
                              </CardTitle>
                            </div>
                            <Badge className={getStatusColor(threat.status)}>
                              {threat.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            Detected at {threat.timestamp} • Severity:{" "}
                            {threat.severity}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p>{threat.description}</p>
                            <div className="text-sm text-muted-foreground">
                              <strong>Source:</strong> {threat.source} •
                              <strong> Target:</strong> {threat.target}
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="text-sm">
                                <strong>AI Analysis:</strong>{" "}
                                {threat.aiAnalysis}
                              </div>
                              {threat.status !== "resolved" && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    markThreatAsResolved(threat.id)
                                  }
                                >
                                  Mark as Resolved
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Financial Fraud Incidents</CardTitle>
              <CardDescription>
                Active and historical financial fraud incidents requiring
                response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {financialIncidents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No financial fraud incidents found
                    </p>
                  ) : (
                    financialIncidents.map((incident) => (
                      <Card
                        key={incident.id}
                        className="border-l-4"
                        style={{
                          borderLeftColor:
                            incident.status === "active"
                              ? "var(--destructive)"
                              : incident.status === "investigating"
                              ? "orange"
                              : incident.status === "mitigating"
                              ? "blue"
                              : "green",
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(incident.status)}
                              <CardTitle className="text-lg">
                                {incident.title}
                              </CardTitle>
                            </div>
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            Reported at {incident.timestamp} • Priority:{" "}
                            {incident.priority}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p>{incident.description}</p>
                            <div className="text-sm text-muted-foreground">
                              <strong>Affected Systems:</strong>{" "}
                              {incident.affectedSystems}
                            </div>

                            {incident.status !== "resolved" && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">
                                    Response Progress
                                  </span>
                                  <span className="text-sm">
                                    {incident.responseProgress}%
                                  </span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                  <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{
                                      width: `${incident.responseProgress}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-4">
                              <div className="text-sm">
                                <strong>AI Response:</strong>{" "}
                                {incident.aiResponse}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <FinancialFraudAnalytics />
        </TabsContent>

        <TabsContent value="metrics">
          <FinancialFraudMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
