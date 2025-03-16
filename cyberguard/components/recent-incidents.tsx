"use client";

import { useSecurityContext } from "@/context/security-context";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentIncidents() {
  const { incidents } = useSecurityContext();

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

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {incidents.slice(0, 5).map((incident) => (
          <div
            key={incident.id}
            className="flex items-start space-x-4 rounded-md border p-3"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {incident.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {incident.description}
              </p>
              <div className="flex items-center pt-2">
                <Badge className={getStatusColor(incident.status)}>
                  {incident.status}
                </Badge>
                <span className="ml-auto text-xs text-muted-foreground">
                  {incident.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
