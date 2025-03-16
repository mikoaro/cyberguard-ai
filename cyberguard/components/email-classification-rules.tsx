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

interface ClassificationRule {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  priority: number;
  conditions: string[];
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

export function EmailClassificationRules() {
  const [rules, setRules] = useState<ClassificationRule[]>([
    {
      id: "1",
      name: "Financial Statements",
      description: "Classifies financial statements and account notifications",
      category: "Financial",
      enabled: true,
      priority: 1,
      conditions: [
        "From trusted financial domains",
        "Contains account statement keywords",
        "Has secure authentication markers",
      ],
      createdAt: "2025-01-15",
      lastTriggered: "2025-03-14 09:23:45",
      triggerCount: 3247,
    },
    {
      id: "2",
      name: "Internal Communications",
      description: "Identifies internal company communications",
      category: "Internal",
      enabled: true,
      priority: 1,
      conditions: [
        "From internal domain",
        "Contains company-specific terms",
        "Matches internal email patterns",
      ],
      createdAt: "2025-01-20",
      lastTriggered: "2025-03-14 10:15:32",
      triggerCount: 8562,
    },
    {
      id: "3",
      name: "E-commerce Transactions",
      description: "Classifies order confirmations and shipping notifications",
      category: "Transactional",
      enabled: true,
      priority: 2,
      conditions: [
        "From trusted e-commerce domains",
        "Contains order/tracking numbers",
        "Has transactional patterns",
      ],
      createdAt: "2025-01-25",
      lastTriggered: "2025-03-14 08:45:12",
      triggerCount: 5892,
    },
    {
      id: "4",
      name: "Security Notifications",
      description: "Identifies legitimate security alerts and notifications",
      category: "Security",
      enabled: true,
      priority: 1,
      conditions: [
        "From verified security domains",
        "Contains security-related keywords",
        "Has proper authentication markers",
      ],
      createdAt: "2025-02-05",
      lastTriggered: "2025-03-14 11:05:27",
      triggerCount: 1245,
    },
    {
      id: "5",
      name: "Newsletters and Updates",
      description: "Classifies subscription-based newsletters and updates",
      category: "Newsletter",
      enabled: true,
      priority: 3,
      conditions: [
        "From confirmed subscription sources",
        "Contains newsletter formatting",
        "Has bulk sending patterns",
      ],
      createdAt: "2025-02-10",
      lastTriggered: "2025-03-14 12:30:18",
      triggerCount: 4734,
    },
    {
      id: "6",
      name: "Phishing Detection",
      description: "Identifies potential phishing attempts",
      category: "Phishing",
      enabled: true,
      priority: 1,
      conditions: [
        "Contains suspicious URL patterns",
        "Has urgent action language",
        "Spoofed sender or domain",
      ],
      createdAt: "2025-02-15",
      lastTriggered: "2025-03-14 13:45:22",
      triggerCount: 1856,
    },
    {
      id: "7",
      name: "Malware Detection",
      description: "Identifies potential malware distribution attempts",
      category: "Malware",
      enabled: true,
      priority: 1,
      conditions: [
        "Contains suspicious attachments",
        "Has known malware indicators",
        "Suspicious sender patterns",
      ],
      createdAt: "2025-02-20",
      lastTriggered: "2025-03-14 14:20:35",
      triggerCount: 743,
    },
    {
      id: "8",
      name: "Marketing and Promotions",
      description: "Classifies marketing emails and promotional content",
      category: "Marketing",
      enabled: true,
      priority: 4,
      conditions: [
        "Contains promotional language",
        "Has marketing formatting",
        "From known marketing sources",
      ],
      createdAt: "2025-02-25",
      lastTriggered: "2025-03-14 15:10:42",
      triggerCount: 6367,
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Financial":
        return "bg-green-500 text-white";
      case "Internal":
        return "bg-blue-500 text-white";
      case "Transactional":
        return "bg-purple-500 text-white";
      case "Security":
        return "bg-amber-500 text-white";
      case "Newsletter":
        return "bg-cyan-500 text-white";
      case "Phishing":
        return "bg-destructive text-destructive-foreground";
      case "Malware":
        return "bg-red-800 text-white";
      case "Marketing":
        return "bg-indigo-500 text-white";
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
            <CardTitle>Email Classification Rules</CardTitle>
            <CardDescription>
              Configure and manage rules for event-driven email classification
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
                      <Badge className={getCategoryColor(rule.category)}>
                        {rule.category}
                      </Badge>
                    </div>
                    <CardDescription>{rule.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`priority-${rule.id}`}>
                            Priority
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id={`priority-${rule.id}`}
                              type="number"
                              value={rule.priority}
                              className="w-20"
                              readOnly
                            />
                            <span className="text-sm text-muted-foreground">
                              (lower = higher priority)
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

                      <div>
                        <Label>Conditions</Label>
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {rule.conditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                          ))}
                        </ul>
                      </div>

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
