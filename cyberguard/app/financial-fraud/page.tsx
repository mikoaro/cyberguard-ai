import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { FinancialFraudDetection } from "@/components/financial-fraud-detection";

export default function FinancialFraudPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Financial Fraud Detection"
        text="AI-powered detection and prevention of financial fraud attempts"
      />
      <FinancialFraudDetection />
    </DashboardShell>
  );
}
