import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ThreatDetection } from "@/components/threat-detection";

export default function ThreatsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Threat Detection"
        text="AI-powered threat detection and analysis"
      />
      <ThreatDetection />
    </DashboardShell>
  );
}
