import type React from "react";
import { MainNav } from "@/components/main-nav";
import { SideNav } from "@/components/side-nav";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-6 md:p-20">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
