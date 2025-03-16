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
import { AlertTriangle, CheckCircle, Clock, Shield, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ClassificationAccuracyChart } from "@/components/classification-accuracy-chart";

export function EmailClassification() {
  const [selectedTab, setSelectedTab] = useState("realtime");

  const recentClassifications = [
    {
      id: "1",
      subject: "Quarterly Financial Report - Q1 2025",
      sender: "finance@company.com",
      receivedTime: "2025-03-14 09:15:22",
      classification: "Legitimate",
      confidence: 98,
      category: "Internal Communication",
      processingTime: "0.12s",
    },
    {
      id: "2",
      subject: "URGENT: Update your password immediately",
      sender: "security-alert@banking-secure.net",
      receivedTime: "2025-03-14 09:23:45",
      classification: "Phishing",
      confidence: 99,
      category: "Security Threat",
      processingTime: "0.08s",
    },
    {
      id: "3",
      subject: "Meeting agenda for tomorrow",
      sender: "manager@company.com",
      receivedTime: "2025-03-14 09:30:18",
      classification: "Legitimate",
      confidence: 97,
      category: "Internal Communication",
      processingTime: "0.14s",
    },
    {
      id: "4",
      subject: "Your package is ready for delivery",
      sender: "shipping@amazon-delivery.info",
      receivedTime: "2025-03-14 09:42:33",
      classification: "Spam",
      confidence: 95,
      category: "Brand Impersonation",
      processingTime: "0.09s",
    },
    {
      id: "5",
      subject: "Invoice #INV-2025-03-14",
      sender: "billing@vendor-partner.com",
      receivedTime: "2025-03-14 09:55:12",
      classification: "Legitimate",
      confidence: 92,
      category: "Business",
      processingTime: "0.15s",
    },
    {
      id: "6",
      subject: "You've won a free iPhone 15!",
      sender: "prize-notification@winnersclaim.org",
      receivedTime: "2025-03-14 10:05:27",
      classification: "Spam",
      confidence: 99,
      category: "Scam",
      processingTime: "0.07s",
    },
    {
      id: "7",
      subject: "Project status update - March 2025",
      sender: "project-manager@company.com",
      receivedTime: "2025-03-14 10:15:42",
      classification: "Legitimate",
      confidence: 99,
      category: "Internal Communication",
      processingTime: "0.11s",
    },
    {
      id: "8",
      subject: "Important: Your account has been limited",
      sender: "security@paypal-secure-center.com",
      receivedTime: "2025-03-14 10:25:18",
      classification: "Phishing",
      confidence: 98,
      category: "Financial Fraud",
      processingTime: "0.08s",
    },
  ];

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Legitimate":
        return "bg-green-500 text-white";
      case "Spam":
        return "bg-amber-500 text-white";
      case "Phishing":
        return "bg-destructive text-destructive-foreground";
      case "Malware":
        return "bg-purple-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-500";
    if (confidence >= 80) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="space-y-4 border p-5 rounded-xl">
      <Tabs defaultValue="realtime" onValueChange={setSelectedTab}>
        <TabsList className="mb-4 w-full rounded-none bg-transparent p-0">
          <TabsTrigger value="realtime"  className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">Real-time Classification</TabsTrigger>
          <TabsTrigger value="categories"  className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">
            Classification Categories
          </TabsTrigger>
          <TabsTrigger value="performance"  className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">
            Classification Performance
          </TabsTrigger>
          <TabsTrigger value="rules"  className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-primary">Classification Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Processing Rate
                </CardTitle>
                <Zap className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">
                  Emails classified per minute
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Processing Time
                </CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.11s</div>
                <p className="text-xs text-muted-foreground">
                  Per email classification
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Classification Accuracy
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.7%</div>
                <p className="text-xs text-muted-foreground">
                  Based on feedback and corrections
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Threat Detection Rate
                </CardTitle>
                <Shield className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">
                  For phishing and malware
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Email Classification</CardTitle>
              <CardDescription>
                Live feed of emails being classified by the AI system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {recentClassifications.map((email) => (
                    <Card
                      key={email.id}
                      className="border-l-4"
                      style={{
                        borderLeftColor:
                          email.classification === "Legitimate"
                            ? "green"
                            : email.classification === "Spam"
                            ? "orange"
                            : email.classification === "Phishing"
                            ? "red"
                            : "purple",
                      }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {email.subject}
                          </CardTitle>
                          <Badge
                            className={getClassificationColor(
                              email.classification
                            )}
                          >
                            {email.classification}
                          </Badge>
                        </div>
                        <CardDescription>
                          From: {email.sender} • Received: {email.receivedTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Category</p>
                            <p className="text-sm">{email.category}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Confidence</p>
                            <p
                              className={`text-sm ${getConfidenceColor(
                                email.confidence
                              )}`}
                            >
                              {email.confidence}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Processing Time
                            </p>
                            <p className="text-sm">{email.processingTime}</p>
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

        <TabsContent value="categories">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <CardTitle>Legitimate Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Internal Communication</Badge>
                      <Badge variant="outline">Business</Badge>
                      <Badge variant="outline">Personal</Badge>
                      <Badge variant="outline">Newsletter</Badge>
                      <Badge variant="outline">Transactional</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      Detection Features
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Verified sender domains</li>
                      <li>• Historical communication patterns</li>
                      <li>• Content sentiment analysis</li>
                      <li>• Legitimate link patterns</li>
                      <li>• Safe attachment signatures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Classification Rate</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>Spam</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Marketing</Badge>
                      <Badge variant="outline">Promotional</Badge>
                      <Badge variant="outline">Bulk</Badge>
                      <Badge variant="outline">Unsolicited</Badge>
                      <Badge variant="outline">Scam</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      Detection Features
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Bulk sending patterns</li>
                      <li>• Promotional language analysis</li>
                      <li>• Unsolicited content markers</li>
                      <li>• Sender reputation scoring</li>
                      <li>• Header analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Classification Rate</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle>Phishing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Credential Theft</Badge>
                      <Badge variant="outline">Brand Impersonation</Badge>
                      <Badge variant="outline">Financial Fraud</Badge>
                      <Badge variant="outline">Account Takeover</Badge>
                      <Badge variant="outline">Social Engineering</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      Detection Features
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Malicious URL detection</li>
                      <li>• Brand impersonation markers</li>
                      <li>• Urgent language patterns</li>
                      <li>• Spoofed sender analysis</li>
                      <li>• Credential harvesting indicators</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Classification Rate</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-purple-500" />
                  <CardTitle>Malware</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Malicious Attachments</Badge>
                      <Badge variant="outline">Ransomware</Badge>
                      <Badge variant="outline">Trojan</Badge>
                      <Badge variant="outline">Spyware</Badge>
                      <Badge variant="outline">Drive-by Download</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      Detection Features
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Malicious attachment scanning</li>
                      <li>• File hash verification</li>
                      <li>• Executable content detection</li>
                      <li>• Malicious script identification</li>
                      <li>• Sandbox analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Classification Rate</span>
                    <span className="text-sm font-medium">1%</span>
                  </div>
                  <Progress value={1} className="h-2" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <ClassificationAccuracyChart />
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Event-Driven Classification Rules</CardTitle>
              <CardDescription>
                Rules that trigger specific actions based on email
                classification events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">
                        Executive Protection Rule
                      </h3>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        When emails targeting executive team members are
                        classified as suspicious, immediately quarantine and
                        notify security team.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Trigger</p>
                          <p className="text-sm">
                            Executive team targeted + Confidence &gt; 70%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Action</p>
                          <p className="text-sm">
                            Quarantine + Security notification
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">
                        Financial Fraud Alert
                      </h3>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        When emails containing financial transaction requests
                        are classified as suspicious, block and alert finance
                        department.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Trigger</p>
                          <p className="text-sm">
                            Financial keywords + Suspicious classification
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Action</p>
                          <p className="text-sm">
                            Block + Finance team notification
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">
                        Malware Containment
                      </h3>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        When emails with attachments are classified as
                        containing malware, isolate and trigger security
                        incident response.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Trigger</p>
                          <p className="text-sm">
                            Malware classification + Confidence &gt; 90%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Action</p>
                          <p className="text-sm">
                            Isolate + Security incident creation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">
                        Phishing Campaign Detection
                      </h3>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        When multiple similar phishing emails are detected
                        within a short timeframe, trigger organization-wide
                        alert.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Trigger</p>
                          <p className="text-sm">
                            5+ similar phishing emails within 10 minutes
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Action</p>
                          <p className="text-sm">
                            Organization alert + Block pattern
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">
                        False Positive Learning
                      </h3>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        When users report false positives, update classification
                        model and release legitimate emails.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Trigger</p>
                          <p className="text-sm">
                            User-reported false positive
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Action</p>
                          <p className="text-sm">
                            Release email + Update AI model
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create New Classification Rule</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
