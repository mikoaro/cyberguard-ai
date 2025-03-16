"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { MALWARE_API_CONFIG, SPAM_API_CONFIG } from "@/lib/api/config"

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("api")
  const [useMockData, setUseMockData] = useState(
    process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || !process.env.NEXT_PUBLIC_MALWARE_API_URL,
  )
  const [malwareApiUrl, setMalwareApiUrl] = useState(MALWARE_API_CONFIG.baseUrl)
  const [spamApiUrl, setSpamApiUrl] = useState(SPAM_API_CONFIG.baseUrl)
  const [darkModeEnabled, setDarkModeEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false)
  const [autoScanAttachments, setAutoScanAttachments] = useState(true)
  const [scanLevel, setScanLevel] = useState("standard")
  const [autoUpdateSignatures, setAutoUpdateSignatures] = useState(true)
  const [threatIntelligenceSharing, setThreatIntelligenceSharing] = useState(true)
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true)
  const [aiSensitivity, setAiSensitivity] = useState("balanced")

  const handleSaveApiSettings = () => {
    // In a real app, this would update environment variables or configuration
    toast.success("API settings saved", {
      description: "Your API configuration has been updated successfully.",
    })
  }

  const handleSaveSecuritySettings = () => {
    toast.success("Security settings saved", {
      description: "Your security preferences have been updated successfully.",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast.success("Notification settings saved", {
      description: "Your notification preferences have been updated successfully.",
    })
  }

  const handleSaveAiSettings = () => {
    toast.success("AI settings saved", {
      description: "Your AI assistant preferences have been updated successfully.",
    })
  }

  const handleResetSettings = () => {
    toast.info("Settings reset to defaults", {
      description: "All settings have been reset to their default values.",
    })
  }

  return (
    <Tabs defaultValue="api" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="api">API Configuration</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
      </TabsList>

      <TabsContent value="api">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Configure connections to external security APIs for malware detection and email security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="use-mock-data" className="font-medium">
                  Use Mock Data
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable this for development or when real API endpoints are not available
                </p>
              </div>
              <Switch id="use-mock-data" checked={useMockData} onCheckedChange={setUseMockData} />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Malware Detection API</h3>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="malware-api-url">API Endpoint URL</Label>
                  <Input
                    id="malware-api-url"
                    placeholder="https://api.malwaredetection.example"
                    value={malwareApiUrl}
                    onChange={(e) => setMalwareApiUrl(e.target.value)}
                    disabled={useMockData}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="malware-api-key">API Key</Label>
                  <Input id="malware-api-key" type="password" placeholder="Enter your API key" disabled={useMockData} />
                  <p className="text-xs text-muted-foreground mt-1">
                    This key is stored securely and never exposed to the client
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Security API</h3>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="spam-api-url">API Endpoint URL</Label>
                  <Input
                    id="spam-api-url"
                    placeholder="https://api.emailsecurity.example"
                    value={spamApiUrl}
                    onChange={(e) => setSpamApiUrl(e.target.value)}
                    disabled={useMockData}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="spam-api-key">API Key</Label>
                  <Input id="spam-api-key" type="password" placeholder="Enter your API key" disabled={useMockData} />
                  <p className="text-xs text-muted-foreground mt-1">
                    This key is stored securely and never exposed to the client
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">API Connection Status</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Malware Detection API</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">{useMockData ? "Using Mock Data" : "Connected"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Security API</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">{useMockData ? "Using Mock Data" : "Connected"}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveApiSettings}>Save API Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security preferences and scanning behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Scanning Options</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="auto-scan" className="font-medium">
                      Auto-scan Email Attachments
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically scan all email attachments for malware
                    </p>
                  </div>
                  <Switch id="auto-scan" checked={autoScanAttachments} onCheckedChange={setAutoScanAttachments} />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="scan-level">Scan Intensity Level</Label>
                  <Select value={scanLevel} onValueChange={setScanLevel}>
                    <SelectTrigger id="scan-level">
                      <SelectValue placeholder="Select scan level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quick">Quick Scan (Faster, Basic Detection)</SelectItem>
                      <SelectItem value="standard">Standard Scan (Recommended)</SelectItem>
                      <SelectItem value="deep">Deep Scan (Thorough, Slower)</SelectItem>
                      <SelectItem value="custom">Custom Scan Settings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="auto-update" className="font-medium">
                      Auto-update Threat Signatures
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Keep malware signatures and detection rules up to date
                    </p>
                  </div>
                  <Switch id="auto-update" checked={autoUpdateSignatures} onCheckedChange={setAutoUpdateSignatures} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Threat Intelligence</h3>
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="threat-sharing" className="font-medium">
                    Threat Intelligence Sharing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous threat data to improve detection capabilities
                  </p>
                </div>
                <Switch
                  id="threat-sharing"
                  checked={threatIntelligenceSharing}
                  onCheckedChange={setThreatIntelligenceSharing}
                />
              </div>
            </div>

            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Security Status</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Malware Definitions</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Up to date</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Full Scan</span>
                  <span className="text-sm">Today at 09:45 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Threats Detected (30 days)</span>
                  <span className="text-sm">12</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how you receive security alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive security alerts via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive alerts in your browser or mobile device</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Preferences</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="critical-only" className="font-medium">
                      Critical Alerts Only
                    </Label>
                    <p className="text-sm text-muted-foreground">Only notify for high-severity security threats</p>
                  </div>
                  <Switch id="critical-only" checked={criticalAlertsOnly} onCheckedChange={setCriticalAlertsOnly} />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    placeholder="security@yourcompany.com"
                    disabled={!emailNotifications}
                  />
                </div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Notification Schedule</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security Digest</span>
                  <span className="text-sm">Daily at 8:00 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Threat Intelligence Updates</span>
                  <span className="text-sm">Weekly on Monday</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveNotificationSettings}>Save Notification Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="ai">
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Settings</CardTitle>
            <CardDescription>Configure your AI security assistant preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="ai-enabled" className="font-medium">
                  Enable AI Assistant
                </Label>
                <p className="text-sm text-muted-foreground">
                  Use AI to analyze security threats and provide recommendations
                </p>
              </div>
              <Switch id="ai-enabled" checked={aiAssistantEnabled} onCheckedChange={setAiAssistantEnabled} />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">AI Behavior</h3>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="ai-sensitivity">Detection Sensitivity</Label>
                  <Select value={aiSensitivity} onValueChange={setAiSensitivity} disabled={!aiAssistantEnabled}>
                    <SelectTrigger id="ai-sensitivity">
                      <SelectValue placeholder="Select sensitivity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (May increase false positives)</SelectItem>
                      <SelectItem value="balanced">Balanced (Recommended)</SelectItem>
                      <SelectItem value="low">Low (Fewer alerts, higher risk)</SelectItem>
                      <SelectItem value="custom">Custom Sensitivity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select defaultValue="gpt4" disabled={!aiAssistantEnabled}>
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4o (Recommended)</SelectItem>
                      <SelectItem value="gpt35">GPT-3.5 Turbo (Faster)</SelectItem>
                      <SelectItem value="claude">Claude 3 Opus</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Learning & Improvement</h3>
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="ai-learning" className="font-medium">
                    Continuous Learning
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the AI to learn from your feedback and improve over time
                  </p>
                </div>
                <Switch id="ai-learning" checked={true} disabled={!aiAssistantEnabled} />
              </div>
            </div>

            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">AI Assistant Status</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model Version</span>
                  <span className="text-sm">v2.4.1 (Latest)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Training Update</span>
                  <span className="text-sm">March 10, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Accuracy Rating</span>
                  <span className="text-sm">98.7%</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveAiSettings}>Save AI Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure system preferences and appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for the application interface</p>
                </div>
                <Switch id="dark-mode" checked={darkModeEnabled} onCheckedChange={setDarkModeEnabled} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Management</h3>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="90">
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">How long to keep security logs and threat data</p>
                </div>

                <Button variant="outline" className="w-full">
                  Export Security Data
                </Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                  Clear All Data
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">System Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span>CyberGuard AI v1.2.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>March 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License</span>
                  <span>Enterprise (Valid until Dec 31, 2025)</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Check for Updates</Button>
            <Button variant="default">Save System Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

