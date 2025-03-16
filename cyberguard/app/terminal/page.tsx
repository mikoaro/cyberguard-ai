import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { AITerminal } from "@/components/ai-terminal";

export default function TerminalPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Terminal"
        text="Interact with your AI security assistant"
      />
      <AITerminal />
    </DashboardShell>
  );
}
