"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Terminal,
  Settings,
  Mail,
  CreditCard,
  Bot,
  FileSearch,
  Filter,
  MailWarning,
  FileCode,
  WormIcon as Virus,
} from "lucide-react";

export function SideNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Threat Detection",
      href: "/threats",
      icon: Shield,
    },
    {
      title: "Incident Response",
      href: "/incidents",
      icon: AlertTriangle,
    },
    {
      title: "Email Security",
      href: "/email-security",
      icon: Mail,
      subItems: [
        {
          title: "Email Fraud",
          href: "/email-security/email-fraud",
          icon: MailWarning,
        },
        {
          title: "Spam Detection",
          href: "/email-security/spam-detection",
          icon: Filter,
        },
      ],
    },
    {
      title: "Financial Fraud",
      href: "/financial-fraud",
      icon: CreditCard,
    },
    {
      title: "Malware Protection",
      href: "/malware-analysis",
      icon: Virus,
      subItems: [
        {
          title: "Malware Analysis",
          href: "/malware-analysis",
          icon: FileSearch,
        },
        {
          title: "Malware Detection",
          href: "/malware-detection",
          icon: FileCode,
        },
      ],
    },
    {
      title: "Security Assistant",
      href: "/security-assistant",
      icon: Bot,
    },
    {
      title: "AI Terminal",
      href: "/terminal",
      icon: Terminal,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Security Operations
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Link>

                {item.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === subItem.href
                            ? "bg-accent text-accent-foreground"
                            : "transparent"
                        )}
                      >
                        <subItem.icon className="mr-2 h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
