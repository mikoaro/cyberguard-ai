"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Mail, ShieldCheck, Filter } from "lucide-react";
import { EmailMetricsOverview } from "@/components/email-metrics-overview";
import { SpamDetection } from "@/components/spam-detection";
import { EmailClassification } from "@/components/email-classification";
import { EmailFraudDetection } from "@/components/email-fraud-detection";

export function EmailSecurityDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Volume</CardTitle>
            <Mail className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,892</div>
            <p className="text-xs text-muted-foreground">
              Emails processed today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Detected</CardTitle>
            <Filter className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,241</div>
            <p className="text-xs text-muted-foreground">13% of total volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Threats Blocked
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">
              Malicious emails blocked
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Protection Rate
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Email security effectiveness
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spam">Spam Detection</TabsTrigger>
          <TabsTrigger value="classification">Event Classification</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Prevention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <EmailMetricsOverview />
        </TabsContent>

        <TabsContent value="spam">
          <SpamDetection />
        </TabsContent>

        <TabsContent value="classification">
          <EmailClassification />
        </TabsContent>

        <TabsContent value="fraud">
          <EmailFraudDetection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
