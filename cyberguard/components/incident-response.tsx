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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export function IncidentResponse() {
  const { incidents, resolveIncident } = useSecurityContext();
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredIncidents =
    selectedTab === "all"
      ? incidents
      : incidents.filter((incident) => incident.status === selectedTab);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "investigating":
        return <Clock className="h-4 w-4 text-amber-500" />;
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
      case "mitigating":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleResolve = (id: string, title: string) => {
    resolveIncident(id);
    toast.success(`Incident "${title}" resolved`, {
      description:
        "The incident has been successfully resolved and documented.",
      action: {
        label: "View Report",
        onClick: () => console.log("View incident report"),
      },
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Automated Incident Response</CardTitle>
          <CardDescription>
            AI-driven incident response system that autonomously analyzes and
            mitigates security threats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Incidents</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="investigating">Investigating</TabsTrigger>
              <TabsTrigger value="mitigating">Mitigating</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab}>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredIncidents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No incidents found in this category
                    </p>
                  ) : (
                    filteredIncidents.map((incident) => (
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
                              {incident.affectedSystems} •
                              <strong> Category:</strong> {incident.category}
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
                                <Progress value={incident.responseProgress} />
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-4">
                              <div className="text-sm">
                                <strong>AI Response:</strong>{" "}
                                {incident.aiResponse}
                              </div>
                              {incident.status !== "resolved" && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleResolve(incident.id, incident.title)
                                  }
                                >
                                  Resolve Incident
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
