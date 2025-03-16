import Link from "next/link";
// import { ShieldAlert } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo/Brand section */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="logo" width="200" height="40" />
          </Link>
        </div>

        {/* Navigation links - centered and with proper spacing */}
        <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/threats"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Threats
          </Link>
          <Link
            href="/incidents"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Incidents
          </Link>
          <Link
            href="/email-fraud"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Email Fraud
          </Link>
          <Link
            href="/financial-fraud"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Financial Fraud
          </Link>
          <Link
            href="/terminal"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            AI Terminal
          </Link>
        </nav>

        {/* Right section with mode toggle */}
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile navigation - appears when screen is small */}
      <div className="md:hidden flex overflow-x-auto py-2 px-4 space-x-4">
        <Link
          href="/"
          className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/threats"
          className="text-sm whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Threats
        </Link>
        <Link
          href="/incidents"
          className="text-sm whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Incidents
        </Link>
        <Link
          href="/email-fraud"
          className="text-sm whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Email Fraud
        </Link>
        <Link
          href="/financial-fraud"
          className="text-sm whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Financial Fraud
        </Link>
        <Link
          href="/terminal"
          className="text-sm whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          AI Terminal
        </Link>
      </div>
    </header>
  );
}
