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
import { AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

export function ThreatDetection() {
  const { threats, markThreatAsResolved } = useSecurityContext();
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredThreats =
    selectedTab === "all"
      ? threats
      : threats.filter((threat) => threat.status === selectedTab);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "investigating":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "mitigated":
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
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleResolve = (id: string, title: string) => {
    markThreatAsResolved(id);
    toast.success(`Threat "${title}" marked as resolved`, {
      description: "The threat has been successfully resolved and archived.",
      action: {
        label: "View Details",
        onClick: () => console.log("View threat details"),
      },
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Threat Detection</CardTitle>
          <CardDescription>
            Real-time monitoring and detection of security threats using
            advanced AI algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Threats</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="investigating">Investigating</TabsTrigger>
              <TabsTrigger value="mitigated">Mitigated</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab}>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredThreats.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No threats found in this category
                    </p>
                  ) : (
                    filteredThreats.map((threat) => (
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
                              <strong> Target:</strong> {threat.target} •
                              <strong> Type:</strong> {threat.type}
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
                                    handleResolve(threat.id, threat.title)
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
