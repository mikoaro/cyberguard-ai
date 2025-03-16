"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

// Types
interface Threat {
  id: string;
  title: string;
  description: string;
  status: "active" | "investigating" | "mitigated" | "resolved";
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  target: string;
  type: string;
  timestamp: string;
  aiAnalysis: string;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: "active" | "investigating" | "mitigating" | "resolved";
  priority: "critical" | "high" | "medium" | "low";
  affectedSystems: string;
  category: string;
  timestamp: string;
  responseProgress: number;
  aiResponse: string;
}

interface SecurityContextType {
  threats: Threat[];
  incidents: Incident[];
  markThreatAsResolved: (id: string) => void;
  resolveIncident: (id: string) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(
  undefined
);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedThreats = localStorage.getItem("threats");
    const storedIncidents = localStorage.getItem("incidents");

    if (storedThreats) {
      setThreats(JSON.parse(storedThreats));
    } else {
      // Initialize with sample data if none exists
      setThreats(sampleThreats);
      localStorage.setItem("threats", JSON.stringify(sampleThreats));
    }

    if (storedIncidents) {
      setIncidents(JSON.parse(storedIncidents));
    } else {
      // Initialize with sample data if none exists
      setIncidents(sampleIncidents);
      localStorage.setItem("incidents", JSON.stringify(sampleIncidents));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("threats", JSON.stringify(threats));
  }, [threats]);

  useEffect(() => {
    localStorage.setItem("incidents", JSON.stringify(incidents));
  }, [incidents]);

  const markThreatAsResolved = (id: string) => {
    setThreats((prevThreats) =>
      prevThreats.map((threat) =>
        threat.id === id ? { ...threat, status: "resolved" } : threat
      )
    );
  };

  const resolveIncident = (id: string) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id
          ? { ...incident, status: "resolved", responseProgress: 100 }
          : incident
      )
    );
  };

  return (
    <SecurityContext.Provider
      value={{ threats, incidents, markThreatAsResolved, resolveIncident }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurityContext() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error(
      "useSecurityContext must be used within a SecurityProvider"
    );
  }
  return context;
}

// Sample data
const sampleThreats: Threat[] = [
  {
    id: "1",
    title: "Suspicious Login Attempt",
    description:
      "Multiple failed login attempts detected from an unusual location",
    status: "active",
    severity: "high",
    source: "45.123.45.67",
    target: "Authentication Server",
    type: "Brute Force",
    timestamp: "2025-03-14 09:23:45",
    aiAnalysis:
      "Pattern matches known brute force attack. Recommend blocking source IP and enforcing MFA.",
  },
  {
    id: "2",
    title: "Malware Detection",
    description: "Potential malware detected in email attachment",
    status: "investigating",
    severity: "critical",
    source: "Email Gateway",
    target: "User Workstation",
    type: "Malware",
    timestamp: "2025-03-14 10:15:32",
    aiAnalysis:
      "File signature matches known ransomware variant. Quarantined and scanning related systems.",
  },
  {
    id: "3",
    title: "Unusual Network Traffic",
    description: "Abnormal outbound traffic detected to unknown IP address",
    status: "mitigated",
    severity: "medium",
    source: "Internal Server",
    target: "External IP: 91.234.56.78",
    type: "Data Exfiltration",
    timestamp: "2025-03-14 08:45:12",
    aiAnalysis:
      "Traffic pattern suggests potential data exfiltration. Connection blocked and server isolated for investigation.",
  },
  {
    id: "4",
    title: "SQL Injection Attempt",
    description: "Potential SQL injection detected in web application",
    status: "resolved",
    severity: "high",
    source: "Web Application",
    target: "Database Server",
    type: "Web Attack",
    timestamp: "2025-03-13 22:17:09",
    aiAnalysis:
      "Attack signature identified and blocked. Input validation rules updated to prevent similar attacks.",
  },
  {
    id: "5",
    title: "Unauthorized Access Attempt",
    description: "Attempt to access restricted system resources",
    status: "active",
    severity: "high",
    source: "Internal Network",
    target: "File Server",
    type: "Privilege Escalation",
    timestamp: "2025-03-14 11:05:27",
    aiAnalysis:
      "User attempting to access files beyond their permission level. Account temporarily suspended for investigation.",
  },
  {
    id: "6",
    title: "Phishing Campaign Detected",
    description:
      "Sophisticated phishing emails targeting executive team with fake invoice attachments",
    status: "active",
    severity: "critical",
    source: "External Email",
    target: "Executive Team",
    type: "Email Fraud",
    timestamp: "2025-03-14 08:30:15",
    aiAnalysis:
      "AI detected suspicious sender patterns and malicious links. Emails quarantined and users notified.",
  },
  {
    id: "7",
    title: "Business Email Compromise Attempt",
    description: "Spoofed email from CEO requesting urgent wire transfer",
    status: "mitigated",
    severity: "critical",
    source: "Spoofed Email Address",
    target: "Finance Department",
    type: "Email Fraud",
    timestamp: "2025-03-14 09:45:22",
    aiAnalysis:
      "Email writing style inconsistent with CEO's patterns. AI flagged and blocked before reaching recipients.",
  },
  {
    id: "8",
    title: "Suspicious Transaction Pattern",
    description:
      "Unusual sequence of small transactions detected in payment processing system",
    status: "investigating",
    severity: "high",
    source: "Payment Gateway",
    target: "Financial System",
    type: "Financial Fraud",
    timestamp: "2025-03-14 10:12:33",
    aiAnalysis:
      "Pattern matches known card testing behavior. Transactions flagged for review and additional verification.",
  },
  {
    id: "9",
    title: "Account Takeover Attempt",
    description:
      "Multiple password reset attempts on high-value customer accounts",
    status: "active",
    severity: "high",
    source: "External IP: 78.45.123.89",
    target: "Customer Accounts",
    type: "Financial Fraud",
    timestamp: "2025-03-14 11:20:18",
    aiAnalysis:
      "Coordinated attack targeting multiple accounts. Implementing additional authentication challenges and notifying customers.",
  },
];

const sampleIncidents: Incident[] = [
  {
    id: "1",
    title: "Ransomware Attack",
    description:
      "Ransomware detected on multiple workstations in the finance department",
    status: "active",
    priority: "critical",
    affectedSystems: "Finance Department Workstations",
    category: "Malware",
    timestamp: "2025-03-14 09:30:15",
    responseProgress: 25,
    aiResponse:
      "Isolating affected systems, blocking command and control servers, and deploying emergency patches.",
  },
  {
    id: "2",
    title: "DDoS Attack",
    description:
      "Distributed Denial of Service attack targeting public-facing web servers",
    status: "mitigating",
    priority: "high",
    affectedSystems: "Web Servers, Load Balancers",
    category: "Network Attack",
    timestamp: "2025-03-14 10:45:22",
    responseProgress: 75,
    aiResponse:
      "Traffic filtering rules deployed, scaling up resources, and coordinating with ISP for upstream filtering.",
  },
  {
    id: "3",
    title: "Data Breach",
    description: "Potential unauthorized access to customer database",
    status: "investigating",
    priority: "critical",
    affectedSystems: "Customer Database, API Server",
    category: "Data Security",
    timestamp: "2025-03-14 08:15:37",
    responseProgress: 40,
    aiResponse:
      "Analyzing access logs, securing affected systems, and preparing forensic analysis.",
  },
  {
    id: "4",
    title: "Phishing Campaign",
    description: "Targeted phishing emails sent to executive team",
    status: "resolved",
    priority: "medium",
    affectedSystems: "Email System",
    category: "Social Engineering",
    timestamp: "2025-03-13 14:22:18",
    responseProgress: 100,
    aiResponse:
      "Identified and blocked all phishing emails, reset affected credentials, and provided security awareness training.",
  },
  {
    id: "5",
    title: "Insider Threat",
    description: "Unusual data access patterns from employee account",
    status: "investigating",
    priority: "high",
    affectedSystems: "CRM System, Document Management",
    category: "Insider Threat",
    timestamp: "2025-03-14 11:30:42",
    responseProgress: 60,
    aiResponse:
      "Monitoring account activity, restricting access privileges, and preparing for HR involvement if confirmed.",
  },
  {
    id: "6",
    title: "Large-Scale Phishing Campaign",
    description:
      "Organization-wide phishing attack impersonating IT department",
    status: "active",
    priority: "critical",
    affectedSystems: "Email System, User Credentials",
    category: "Email Fraud",
    timestamp: "2025-03-14 08:45:33",
    responseProgress: 35,
    aiResponse:
      "Blocking malicious domains, scanning for compromised accounts, and deploying emergency user notifications.",
  },
  {
    id: "7",
    title: "CEO Fraud Attack",
    description:
      "Sophisticated business email compromise targeting financial transfers",
    status: "mitigating",
    priority: "critical",
    affectedSystems: "Email System, Financial Approval Process",
    category: "Email Fraud",
    timestamp: "2025-03-14 09:15:27",
    responseProgress: 65,
    aiResponse:
      "Implementing additional verification steps for wire transfers, scanning for additional compromise, and training finance staff.",
  },
  {
    id: "8",
    title: "Payment Processing Fraud",
    description:
      "Unusual pattern of transaction reversals detected in payment system",
    status: "investigating",
    priority: "high",
    affectedSystems: "Payment Gateway, Transaction Processing",
    category: "Financial Fraud",
    timestamp: "2025-03-14 10:30:18",
    responseProgress: 45,
    aiResponse:
      "Analyzing transaction patterns, implementing additional verification for suspicious transactions, and reviewing affected accounts.",
  },
  {
    id: "9",
    title: "Customer Account Compromise",
    description:
      "Multiple high-value customer accounts showing signs of unauthorized access",
    status: "active",
    priority: "critical",
    affectedSystems: "Customer Portal, Authentication System",
    category: "Financial Fraud",
    timestamp: "2025-03-14 11:05:42",
    responseProgress: 30,
    aiResponse:
      "Locking affected accounts, analyzing access patterns, and preparing customer communication plan.",
  },
];
