import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmailFraudDetection } from "@/components/email-fraud-detection";

export default function EmailFraudPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Email Fraud Detection"
        text="AI-powered detection and prevention of email-based fraud attempts"
      />
      <EmailFraudDetection />
    </DashboardShell>
  );
}
