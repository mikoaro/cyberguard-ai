import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { AISecurityAssistant } from "@/components/ai-security-assistant";

export default function SecurityAssistantPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Security Assistant"
        text="Analyze suspicious emails and files for malware, phishing, and other threats"
      />
      <AISecurityAssistant />
    </DashboardShell>
  );
}
