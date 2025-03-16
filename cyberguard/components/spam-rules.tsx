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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";

interface SpamRule {
  id: string;
  name: string;
  description: string;
  type: "content" | "sender" | "header" | "attachment" | "ai";
  enabled: boolean;
  score: number;
  pattern?: string;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

export function SpamRules() {
  const [rules, setRules] = useState<SpamRule[]>([
    {
      id: "1",
      name: "Pharmaceutical Keywords",
      description: "Detects common pharmaceutical spam keywords",
      type: "content",
      enabled: true,
      score: 25,
      pattern: "viagra|cialis|pharmacy|prescription|meds|pills",
      createdAt: "2025-01-15",
      lastTriggered: "2025-03-14 08:45:12",
      triggerCount: 1247,
    },
    {
      id: "2",
      name: "Urgent Subject Lines",
      description: "Flags emails with urgent language in subject lines",
      type: "content",
      enabled: true,
      score: 15,
      pattern: "urgent|immediate|action required|alert|attention",
      createdAt: "2025-01-20",
      lastTriggered: "2025-03-14 09:23:45",
      triggerCount: 3582,
    },
    {
      id: "3",
      name: "Suspicious Attachments",
      description: "Detects potentially malicious file attachments",
      type: "attachment",
      enabled: true,
      score: 35,
      pattern: ".exe|.js|.vbs|.bat|.scr|.cmd",
      createdAt: "2025-01-25",
      lastTriggered: "2025-03-14 10:15:32",
      triggerCount: 892,
    },
    {
      id: "4",
      name: "Spoofed Domains",
      description:
        "Identifies emails from domains that mimic legitimate companies",
      type: "sender",
      enabled: true,
      score: 40,
      pattern: "paypal|amazon|apple|microsoft|google|bank",
      createdAt: "2025-02-05",
      lastTriggered: "2025-03-14 11:05:27",
      triggerCount: 2145,
    },
    {
      id: "5",
      name: "AI Content Analysis",
      description: "Uses AI to analyze email content for spam patterns",
      type: "ai",
      enabled: true,
      score: 50,
      createdAt: "2025-02-10",
      lastTriggered: "2025-03-14 12:30:18",
      triggerCount: 8734,
    },
    {
      id: "6",
      name: "Excessive Capitalization",
      description: "Detects emails with excessive use of capital letters",
      type: "content",
      enabled: true,
      score: 20,
      pattern: "[A-Z]{5,}",
      createdAt: "2025-02-15",
      lastTriggered: "2025-03-14 13:45:22",
      triggerCount: 1856,
    },
    {
      id: "7",
      name: "Suspicious Headers",
      description: "Identifies emails with manipulated or suspicious headers",
      type: "header",
      enabled: true,
      score: 30,
      createdAt: "2025-02-20",
      lastTriggered: "2025-03-14 14:20:35",
      triggerCount: 743,
    },
    {
      id: "8",
      name: "Money/Financial Keywords",
      description: "Detects common financial scam keywords",
      type: "content",
      enabled: true,
      score: 25,
      pattern: "million|lottery|winner|inheritance|fortune|jackpot|prize",
      createdAt: "2025-02-25",
      lastTriggered: "2025-03-14 15:10:42",
      triggerCount: 2367,
    },
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "content":
        return "bg-blue-500 text-white";
      case "sender":
        return "bg-green-500 text-white";
      case "header":
        return "bg-purple-500 text-white";
      case "attachment":
        return "bg-amber-500 text-white";
      case "ai":
        return "bg-red-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const toggleRule = (id: string) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Spam Detection Rules</CardTitle>
            <CardDescription>
              Configure and manage rules used for spam detection
            </CardDescription>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add New Rule
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {rules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => toggleRule(rule.id)}
                          aria-label={`Toggle ${rule.name}`}
                        />
                        <CardTitle className="text-lg">{rule.name}</CardTitle>
                      </div>
                      <Badge className={getTypeColor(rule.type)}>
                        {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>{rule.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`score-${rule.id}`}>
                            Score Impact
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id={`score-${rule.id}`}
                              type="number"
                              value={rule.score}
                              className="w-20"
                              readOnly
                            />
                            <span className="text-sm text-muted-foreground">
                              points
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label>Trigger Count</Label>
                          <div className="text-sm font-medium">
                            {rule.triggerCount.toLocaleString()} emails
                          </div>
                        </div>
                      </div>

                      {rule.pattern && (
                        <div>
                          <Label htmlFor={`pattern-${rule.id}`}>Pattern</Label>
                          <Input
                            id={`pattern-${rule.id}`}
                            value={rule.pattern}
                            className="font-mono text-sm"
                            readOnly
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span>Created: {rule.createdAt}</span>
                        </div>
                        <div>
                          {rule.lastTriggered && (
                            <span>Last triggered: {rule.lastTriggered}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
