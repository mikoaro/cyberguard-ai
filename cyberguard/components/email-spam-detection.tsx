"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Trash2, BarChart2, AlertTriangle } from "lucide-react";
import { SpamTrendsChart } from "@/components/spam-trends-chart";
import { toast } from "sonner";

export function EmailSpamDetection() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [threshold, setThreshold] = useState([85]);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleSaveSettings = () => {
    toast.success("Spam detection settings saved", {
      description: `Threshold set to ${threshold}% with auto-update ${
        autoUpdate ? "enabled" : "disabled"
      }.`,
      action: {
        label: "Undo",
        onClick: () => toast.info("Settings change reverted"),
      },
    });
  };

  const spamEmails = [
    {
      id: "1",
      subject: "URGENT: Your Account Will Be Suspended",
      sender: "security-alert@bankingsecure-verify.com",
      receivedTime: "2025-03-14 09:23:45",
      spamScore: 98,
      reason:
        "Suspicious sender domain, urgent language, impersonation attempt",
      action: "Quarantined",
    },
    {
      id: "2",
      subject: "You've Won $5,000,000 in the International Lottery",
      sender: "claims@international-lottery-winner.org",
      receivedTime: "2025-03-14 10:15:32",
      spamScore: 99,
      reason:
        "Classic lottery scam patterns, suspicious domain, request for personal information",
      action: "Blocked",
    },
    {
      id: "3",
      subject: "Your Package Delivery Failed - Click to Reschedule",
      sender: "delivery-notification@tracking-delivery-service.net",
      receivedTime: "2025-03-14 11:05:27",
      spamScore: 95,
      reason:
        "Spoofed delivery service, suspicious link patterns, malicious attachment",
      action: "Quarantined",
    },
    {
      id: "4",
      subject: "FINAL NOTICE: Invoice #INV-29581 Payment Required",
      sender: "accounting@billing-department-services.com",
      receivedTime: "2025-03-14 12:30:18",
      spamScore: 97,
      reason: "Fake invoice, urgent payment request, suspicious attachment",
      action: "Blocked",
    },
    {
      id: "5",
      subject: "Your Recent Order from Amazon",
      sender: "orders@amazon-shipping-department.info",
      receivedTime: "2025-03-14 13:45:22",
      spamScore: 96,
      reason: "Brand impersonation, suspicious domain, phishing link patterns",
      action: "Quarantined",
    },
    {
      id: "6",
      subject: "Important Security Update Required",
      sender: "microsoft-security@account-verification-center.com",
      receivedTime: "2025-03-14 14:20:15",
      spamScore: 94,
      reason:
        "Microsoft impersonation, suspicious domain, urgent action request",
      action: "Blocked",
    },
    {
      id: "7",
      subject: "Confirm Your Identity - Account Access Limited",
      sender: "support@paypal-secure-center.net",
      receivedTime: "2025-03-14 15:10:33",
      spamScore: 98,
      reason: "PayPal impersonation, suspicious domain, phishing indicators",
      action: "Quarantined",
    },
    {
      id: "8",
      subject: "Exclusive Business Proposal - Confidential",
      sender: "dr.james.williams@business-proposal.co",
      receivedTime: "2025-03-14 16:05:42",
      spamScore: 92,
      reason: "Advance fee fraud patterns, suspicious sender, unusual request",
      action: "Blocked",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-destructive";
    if (score >= 70) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-4 border p-5 rounded-xl">
      <Tabs defaultValue="dashboard" onValueChange={setSelectedTab}>
      <TabsList className="mb-4 w-full rounded-none bg-transparent p-0">
        <TabsTrigger
          value="dashboard"
          className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Spam Dashboard
        </TabsTrigger>
        <TabsTrigger
          value="detected"
          className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Detected Spam
        </TabsTrigger>
        <TabsTrigger
          value="trends"
          className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Spam Trends
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Detection Settings
        </TabsTrigger>
      </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Spam Detection Summary
                  </CardTitle>
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Total Emails Scanned
                    </span>
                    <span className="font-bold">12,458</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Spam Detected</span>
                    <span className="font-bold">1,248</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Phishing Attempts
                    </span>
                    <span className="font-bold">87</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Malware Attachments
                    </span>
                    <span className="font-bold">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">False Positives</span>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Top Spam Categories</CardTitle>
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Phishing</span>
                      <span className="text-sm">42%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-destructive h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Malware</span>
                      <span className="text-sm">28%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: "28%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Scams</span>
                      <span className="text-sm">18%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "18%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Bulk</span>
                      <span className="text-sm">12%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    <div className="border-l-4 border-destructive pl-3 py-1">
                      <p className="text-sm font-medium">
                        Phishing Campaign Detected
                      </p>
                      <p className="text-xs text-muted-foreground">
                        15 minutes ago
                      </p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-3 py-1">
                      <p className="text-sm font-medium">
                        Malware Attachment Blocked
                      </p>
                      <p className="text-xs text-muted-foreground">
                        42 minutes ago
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3 py-1">
                      <p className="text-sm font-medium">Spam Rules Updated</p>
                      <p className="text-xs text-muted-foreground">
                        1 hour ago
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3 py-1">
                      <p className="text-sm font-medium">
                        False Positive Corrected
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    toast.info("Viewing all activity", {
                      description: "Loading complete activity log...",
                    });
                  }}
                >
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detected">
          <Card>
            <CardHeader>
              <CardTitle>Detected Spam Emails</CardTitle>
              <CardDescription>
                Emails identified as spam by the AI detection system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {spamEmails.map((email) => (
                    <Card
                      key={email.id}
                      className="border-l-4 border-destructive"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {email.subject}
                          </CardTitle>
                          <Badge variant="outline" className="font-mono">
                            Score:{" "}
                            <span className={getScoreColor(email.spamScore)}>
                              {email.spamScore}
                            </span>
                          </Badge>
                        </div>
                        <CardDescription>
                          From: {email.sender} • Received: {email.receivedTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <strong>Reason:</strong> {email.reason}
                          </div>
                          <div className="text-sm">
                            <strong>Action:</strong>{" "}
                            <Badge>{email.action}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <SpamTrendsChart />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Spam Detection Settings</CardTitle>
              <CardDescription>
                Configure AI-powered spam detection parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="threshold">Spam Detection Threshold</Label>
                    <span className="text-sm font-medium">{threshold}%</span>
                  </div>
                  <Slider
                    id="threshold"
                    min={50}
                    max={99}
                    step={1}
                    value={threshold}
                    onValueChange={setThreshold}
                  />
                  <p className="text-xs text-muted-foreground">
                    Emails with a spam score above this threshold will be
                    automatically quarantined
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Detection Features</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="phishing">Phishing Detection</Label>
                      <p className="text-xs text-muted-foreground">
                        Detect emails attempting to steal credentials or
                        personal information
                      </p>
                    </div>
                    <Switch id="phishing" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="malware">Malware Detection</Label>
                      <p className="text-xs text-muted-foreground">
                        Scan attachments and links for malicious content
                      </p>
                    </div>
                    <Switch id="malware" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="impersonation">
                        Impersonation Protection
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Detect emails impersonating executives or trusted
                        entities
                      </p>
                    </div>
                    <Switch id="impersonation" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="bulk">Bulk Email Filtering</Label>
                      <p className="text-xs text-muted-foreground">
                        Filter marketing and promotional emails
                      </p>
                    </div>
                    <Switch id="bulk" checked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-update">Auto-Update Rules</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically update detection rules based on new
                        threats
                      </p>
                    </div>
                    <Switch
                      id="auto-update"
                      checked={autoUpdate}
                      onCheckedChange={setAutoUpdate}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowlist">Email Allowlist</Label>
                  <Input
                    id="allowlist"
                    placeholder="Enter domains or email addresses to allowlist (comma separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Emails from these domains or addresses will bypass spam
                    filtering
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setThreshold([85]);
                  setAutoUpdate(true);
                  toast.info("Settings reset to defaults");
                }}
              >
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
