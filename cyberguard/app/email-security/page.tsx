import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmailSecurityDashboard } from "@/components/email-security-dashboard";

export default function EmailSecurityPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Email Security Center"
        text="Comprehensive email protection with AI-powered spam detection, event-driven classification, and fraud prevention"
      />
      <EmailSecurityDashboard />
    </DashboardShell>
  );
}
