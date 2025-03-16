"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SpamRules } from "@/components/spam-rules";
import { SpamAnalytics } from "@/components/spam-analytics";

interface SpamEmail {
  id: string;
  subject: string;
  sender: string;
  receivedTime: string;
  spamScore: number;
  spamCategory: string;
  quarantined: boolean;
  confidence: number;
  aiAnalysis: string;
}

export function SpamDetection() {
  const [selectedTab, setSelectedTab] = useState("detected");

  // Sample spam emails data
  const spamEmails: SpamEmail[] = [
    {
      id: "1",
      subject: "URGENT: Your Account Has Been Compromised",
      sender: "security-alert@bankofamerica-secure.com",
      receivedTime: "2025-03-14 09:23:45",
      spamScore: 98,
      spamCategory: "Phishing",
      quarantined: true,
      confidence: 98,
      aiAnalysis:
        "Detected spoofed domain and urgent language patterns consistent with phishing attempts.",
    },
    {
      id: "2",
      subject: "You've Won $5,000,000 in the International Lottery",
      sender: "claims@international-lottery-winner.com",
      receivedTime: "2025-03-14 10:15:32",
      spamScore: 99,
      spamCategory: "Scam",
      quarantined: true,
      confidence: 99,
      aiAnalysis:
        "Classic lottery scam indicators detected. Contains known scam phrases and suspicious sender domain.",
    },
    {
      id: "3",
      subject: "Buy Discount Medications Online - No Prescription Needed",
      sender: "pharmacy-deals@rx-discount-meds.net",
      receivedTime: "2025-03-14 08:45:12",
      spamScore: 95,
      spamCategory: "Unsolicited",
      quarantined: true,
      confidence: 95,
      aiAnalysis:
        "Pharmaceutical spam with multiple trigger phrases. Sender domain has poor reputation score.",
    },
    {
      id: "4",
      subject: "LAST CHANCE: 85% OFF Designer Watches - Today Only!",
      sender: "deals@luxury-replica-watches.co",
      receivedTime: "2025-03-14 11:05:27",
      spamScore: 92,
      spamCategory: "Promotional",
      quarantined: true,
      confidence: 92,
      aiAnalysis:
        "Counterfeit goods spam with excessive capitalization and urgency indicators.",
    },
    {
      id: "5",
      subject: "Your Package Delivery Failed - Action Required",
      sender: "delivery-notification@fedex-delivery-service.info",
      receivedTime: "2025-03-14 12:30:18",
      spamScore: 97,
      spamCategory: "Phishing",
      quarantined: true,
      confidence: 97,
      aiAnalysis:
        "Delivery notification phishing attempt. Uses spoofed FedEx domain and contains suspicious attachment.",
    },
    {
      id: "6",
      subject: "Business Proposal from Foreign Diplomat",
      sender: "dr.james.williams@diplomatic-office.co",
      receivedTime: "2025-03-14 13:45:22",
      spamScore: 96,
      spamCategory: "Scam",
      quarantined: true,
      confidence: 96,
      aiAnalysis:
        "Advanced fee fraud attempt. Contains narrative patterns consistent with '419' scams.",
    },
    {
      id: "7",
      subject: "INVOICE #INV-29581 - Payment Due",
      sender: "accounting@invoices-billing-dept.com",
      receivedTime: "2025-03-14 14:20:35",
      spamScore: 94,
      spamCategory: "Malware",
      quarantined: true,
      confidence: 94,
      aiAnalysis:
        "Fake invoice email with malicious attachment. High probability of ransomware or trojan payload.",
    },
    {
      id: "8",
      subject: "Confirm Your Identity - Account Verification Required",
      sender: "support@paypal-secure-center.com",
      receivedTime: "2025-03-14 15:10:42",
      spamScore: 98,
      spamCategory: "Phishing",
      quarantined: true,
      confidence: 98,
      aiAnalysis:
        "PayPal phishing attempt with fraudulent login page. Domain registered within last 24 hours.",
    },
  ];

  // Sample false positives
  const falsePositives: SpamEmail[] = [
    {
      id: "101",
      subject: "Your Monthly Newsletter Subscription",
      sender: "newsletter@industry-updates.com",
      receivedTime: "2025-03-14 09:45:12",
      spamScore: 82,
      spamCategory: "Promotional",
      quarantined: true,
      confidence: 82,
      aiAnalysis:
        "Legitimate newsletter flagged due to bulk sending patterns and promotional language.",
    },
    {
      id: "102",
      subject: "Important: Your Order #45982 Has Shipped",
      sender: "orders@amazon.com",
      receivedTime: "2025-03-14 10:30:25",
      spamScore: 75,
      spamCategory: "Potential Phishing",
      quarantined: true,
      confidence: 75,
      aiAnalysis:
        "Legitimate order confirmation flagged due to similarity with phishing templates.",
    },
    {
      id: "103",
      subject: "ACTION REQUIRED: Verify Your Account Details",
      sender: "support@linkedin.com",
      receivedTime: "2025-03-14 11:15:38",
      spamScore: 85,
      spamCategory: "Potential Phishing",
      quarantined: true,
      confidence: 85,
      aiAnalysis:
        "Legitimate account verification email flagged due to urgent language patterns.",
    },
  ];

  const getSpamScoreColor = (score: number) => {
    if (score >= 90) return "text-destructive";
    if (score >= 75) return "text-amber-500";
    return "text-green-500";
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Phishing":
        return "bg-destructive text-destructive-foreground";
      case "Scam":
        return "bg-red-800 text-white";
      case "Malware":
        return "bg-purple-700 text-white";
      case "Unsolicited":
        return "bg-amber-500 text-white";
      case "Promotional":
        return "bg-blue-500 text-white";
      case "Potential Phishing":
        return "bg-amber-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Detected</CardTitle>
            <Filter className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,241</div>
            <p className="text-xs text-muted-foreground">
              In the last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Detection Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              Spam detection accuracy
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              False Positives
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.3%</div>
            <p className="text-xs text-muted-foreground">
              Legitimate emails flagged
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quarantined</CardTitle>
            <Trash2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,198</div>
            <p className="text-xs text-muted-foreground">
              Emails in quarantine
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detected" onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="detected">Detected Spam</TabsTrigger>
          <TabsTrigger value="false-positives">False Positives</TabsTrigger>
          <TabsTrigger value="rules">Spam Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="detected">
          <Card>
            <CardHeader>
              <CardTitle>Detected Spam Emails</CardTitle>
              <CardDescription>
                AI-detected spam emails quarantined in the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {spamEmails.map((email) => (
                    <Card
                      key={email.id}
                      className="border-l-4"
                      style={{
                        borderLeftColor:
                          email.spamScore >= 90
                            ? "var(--destructive)"
                            : email.spamScore >= 75
                            ? "orange"
                            : "green",
                      }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {email.subject}
                          </CardTitle>
                          <Badge
                            className={getCategoryBadgeColor(
                              email.spamCategory
                            )}
                          >
                            {email.spamCategory}
                          </Badge>
                        </div>
                        <CardDescription>
                          From: {email.sender} • Received: {email.receivedTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">
                              Spam Score
                            </span>
                            <span
                              className={`text-sm font-medium ${getSpamScoreColor(
                                email.spamScore
                              )}`}
                            >
                              {email.spamScore}/100
                            </span>
                          </div>
                          <Progress
                            value={email.spamScore}
                            className="h-2"
                            style={
                              {
                                background: "var(--secondary)",
                                "--progress-background":
                                  email.spamScore >= 90
                                    ? "var(--destructive)"
                                    : email.spamScore >= 75
                                    ? "orange"
                                    : "green",
                              } as React.CSSProperties
                            }
                          />

                          <div className="text-sm mt-4">
                            <strong>AI Analysis:</strong> {email.aiAnalysis}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Release to Inbox
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="false-positives">
          <Card>
            <CardHeader>
              <CardTitle>False Positives</CardTitle>
              <CardDescription>
                Legitimate emails incorrectly flagged as spam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {falsePositives.map((email) => (
                    <Card
                      key={email.id}
                      className="border-l-4 border-l-amber-500"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {email.subject}
                          </CardTitle>
                          <Badge
                            className={getCategoryBadgeColor(
                              email.spamCategory
                            )}
                          >
                            {email.spamCategory}
                          </Badge>
                        </div>
                        <CardDescription>
                          From: {email.sender} • Received: {email.receivedTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">
                              Spam Score
                            </span>
                            <span
                              className={`text-sm font-medium ${getSpamScoreColor(
                                email.spamScore
                              )}`}
                            >
                              {email.spamScore}/100
                            </span>
                          </div>
                          <Progress
                            value={email.spamScore}
                            className="h-2"
                            style={
                              {
                                background: "var(--secondary)",
                                "--progress-background":
                                  email.spamScore >= 90
                                    ? "var(--destructive)"
                                    : email.spamScore >= 75
                                    ? "orange"
                                    : "green",
                              } as React.CSSProperties
                            }
                          />

                          <div className="text-sm mt-4">
                            <strong>AI Analysis:</strong> {email.aiAnalysis}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            Release to Inbox
                          </Button>
                          <Button variant="default" size="sm">
                            Train AI Model
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <SpamRules />
        </TabsContent>

        <TabsContent value="analytics">
          <SpamAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
