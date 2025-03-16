import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { IncidentResponse } from "@/components/incident-response";

export default function IncidentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Incident Response"
        text="Automated incident response and management"
      />
      <IncidentResponse />
    </DashboardShell>
  );
}
