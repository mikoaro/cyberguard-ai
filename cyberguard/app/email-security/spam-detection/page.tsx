import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmailSpamAIAssistant } from "@/components/email-spam-ai-assistant"

export default function EmailSpamDetectionPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Email Spam & Phishing AI Assistant"
        text="AI-powered detection and analysis of email-based threats"
      />
      <EmailSpamAIAssistant />
    </DashboardShell>
  )
}

