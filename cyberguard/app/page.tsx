import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { SecurityDashboard } from "@/components/security-dashboard";

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Security Dashboard"
        text="Monitor and respond to security threats in real-time"
      />
      <SecurityDashboard />
    </DashboardShell>
  );
}
