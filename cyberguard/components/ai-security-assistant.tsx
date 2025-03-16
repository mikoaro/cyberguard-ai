"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TerminalIcon, Send, User, Bot, Upload, AlertTriangle, X, SendHorizonal } from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  attachments?: Attachment[]
}

interface Attachment {
  id: string
  name: string
  type: "file" | "email"
  status?: "scanning" | "clean" | "malicious" | "suspicious"
  scanProgress?: number
  detectionDetails?: {
    score: number
    threats: string[]
    recommendation: string
  }
}

export function AISecurityAssistant() {
  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const [isProcessing, setIsProcessing] = useState(false)
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [emailContent, setEmailContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello, I'm your AI Security Assistant. I can help you analyze suspicious emails and files for malware or spam. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() && !fileUpload && !emailContent) return

    let newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    // Handle file attachment
    if (fileUpload) {
      newMessage.attachments = [
        {
          id: Date.now().toString(),
          name: fileUpload.name,
          type: "file",
          status: "scanning",
          scanProgress: 0,
        },
      ]
    }

    // Handle email content
    if (emailContent && activeTab === "email") {
      newMessage = {
        id: Date.now().toString(),
        role: "user",
        content: "Can you analyze this email for potential spam or phishing?",
        timestamp: new Date().toLocaleTimeString(),
        attachments: [
          {
            id: Date.now().toString(),
            name: "Email Content",
            type: "email",
            status: "scanning",
            scanProgress: 0,
          },
        ],
      }
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setFileUpload(null)
    setEmailContent("")
    setIsProcessing(true)

    // Simulate scanning progress for attachments
    if (newMessage.attachments) {
      const attachment = newMessage.attachments[0]
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id
              ? {
                  ...msg,
                  attachments: msg.attachments?.map((att) =>
                    att.id === attachment.id ? { ...att, scanProgress: progress } : att,
                  ),
                }
              : msg,
          ),
        )

        if (progress >= 100) {
          clearInterval(interval)

          // Determine scan result based on attachment type
          const isMalicious = Math.random() < 0.3 // 30% chance of being malicious for demo
          const status = isMalicious ? "malicious" : Math.random() < 0.3 ? "suspicious" : "clean"

          // Generate detection details
          const detectionDetails = {
            score:
              status === "malicious"
                ? Math.floor(Math.random() * 20) + 80
                : status === "suspicious"
                  ? Math.floor(Math.random() * 30) + 50
                  : Math.floor(Math.random() * 30) + 10,
            threats:
              status === "malicious"
                ? ["Trojan.GenericKD.45678901", "Suspicious.PDF.Exploit"]
                : status === "suspicious"
                  ? ["Suspicious.Behavior.Heuristic"]
                  : [],
            recommendation:
              status === "malicious"
                ? "This file contains malware and should be deleted immediately."
                : status === "suspicious"
                  ? "This file exhibits suspicious behavior and should be handled with caution."
                  : "No threats detected in this file.",
          }

          // Update attachment status
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id
                ? {
                    ...msg,
                    attachments: msg.attachments?.map((att) =>
                      att.id === attachment.id ? { ...att, status, detectionDetails, scanProgress: 100 } : att,
                    ),
                  }
                : msg,
            ),
          )

          // Show toast notification based on scan result
          if (status === "malicious") {
            toast.error(`Malware detected in ${attachment.type}!`, {
              description: "High risk threats found. See analysis for details.",
              action: {
                label: "View Details",
                onClick: () => console.log("View threat details"),
              },
            })
          } else if (status === "suspicious") {
            toast.warning(`Suspicious content detected in ${attachment.type}`, {
              description: "Potential security risks identified. Review with caution.",
            })
          } else {
            toast.success(`${attachment.type === "file" ? "File" : "Email"} is clean`, {
              description: "No threats detected in the analysis.",
            })
          }

          // Generate AI response after scan completes
          generateAIResponse(newMessage, status, attachment.type)
        }
      }, 300)
    } else {
      // Handle regular text message
      setTimeout(() => {
        generateAIResponse(newMessage)
      }, 1000)
    }
  }

  const generateAIResponse = (userMessage: Message, scanResult?: string, attachmentType?: string) => {
    let responseContent = ""

    // Generate response based on scan result if there was an attachment
    if (scanResult && attachmentType) {
      if (scanResult === "malicious") {
        if (attachmentType === "file") {
          responseContent = `I've analyzed the file you uploaded and detected high-risk malware. The file contains signatures matching known threats including Trojan.GenericKD and a PDF exploit. I recommend:
          
1. Delete this file immediately
2. Scan your system with a full antivirus scan
3. Check if you've opened this file and monitor for suspicious activity
4. Report this to your security team

Would you like me to provide more details about the threats detected?`
        } else {
          responseContent = `I've analyzed the email content and it appears to be a sophisticated phishing attempt. This email contains several red flags:

1. Sender domain spoofing a legitimate organization
2. Urgent language designed to create panic
3. Suspicious links that redirect to credential harvesting sites
4. Request for sensitive information

I recommend deleting this email and not clicking any links or downloading any attachments. Would you like me to explain how to identify similar phishing attempts in the future?`
        }
      } else if (scanResult === "suspicious") {
        if (attachmentType === "file") {
          responseContent = `I've analyzed the file and while I didn't detect known malware, it exhibits some suspicious behaviors that warrant caution:

1. Contains obfuscated code sections
2. Attempts to access system directories
3. Uses uncommon encryption methods

I recommend:
- Having your security team review this file before opening
- Running it in a sandbox environment if you must access it
- Updating your security software to the latest version

Would you like me to provide more specific details about the suspicious behaviors?`
        } else {
          responseContent = `I've analyzed the email and while it's not definitively malicious, it contains some suspicious elements:

1. Sender address doesn't match the display name
2. Contains unusual attachment types
3. Links in the email redirect through tracking domains
4. Uses social engineering tactics

I recommend verifying the sender through another communication channel before taking any actions requested in this email. Would you like tips on how to verify the authenticity of emails?`
        }
      } else {
        if (attachmentType === "file") {
          responseContent = `I've completed the analysis of your file and no malware or suspicious content was detected. The file appears to be clean and safe to use.

However, always remember that new threats emerge daily, so continue practicing good security hygiene:
- Keep your security software updated
- Only download files from trusted sources
- Scan files before opening them

Is there anything else you'd like me to help you with?`
        } else {
          responseContent = `I've analyzed the email content and it appears to be legitimate. I didn't detect any indicators of phishing, spam, or malicious content.

The email follows expected patterns for legitimate communication:
- Sender domain matches the organization it claims to be from
- No suspicious links or redirects
- No urgent requests for sensitive information
- Content is consistent with normal business communication

Is there anything specific about this email that concerned you?`
        }
      }
    } else {
      // Handle regular text queries about security
      const securityResponses = [
        "Based on my analysis, this appears to be a potential phishing attempt. The sender is using urgent language and requesting sensitive information, which are common tactics in phishing emails. I recommend not responding and reporting this to your security team.",

        "I've reviewed your security logs and detected unusual login patterns from IP 192.168.1.45. This could indicate a potential brute force attack. I recommend temporarily blocking this IP address and enabling multi-factor authentication for all accounts.",

        "The attachment you're concerned about has several characteristics of malware, including obfuscated code and attempts to access system directories. I recommend isolating this file and running a deep scan with your security software.",

        "Based on the email headers you've shared, I can confirm this is a spoofed email. The original sender doesn't match the displayed address, and the email was routed through suspicious servers. This is a sophisticated phishing attempt targeting your organization.",

        "I've analyzed the network traffic patterns you shared, and there appears to be data exfiltration occurring from your finance department servers. The traffic is being sent to an unrecognized IP address during off-hours. I recommend immediately isolating those systems for further investigation.",
      ]

      responseContent = securityResponses[Math.floor(Math.random() * securityResponses.length)]
    }

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsProcessing(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0])
      toast.info(`File selected: ${e.target.files[0].name}`, {
        description: "Click send to analyze this file for malware",
      })
    }
  }

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removeSelectedFile = () => {
    setFileUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="max-h-[calc(100vh-22rem)] min-h-[calc(100vh-22rem)]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-5 w-5 text-primary" />
          <CardTitle>AI Security Assistant</CardTitle>
        </div>
        <CardDescription>Analyze suspicious emails and files for malware, phishing, and other threats</CardDescription>
      </CardHeader>
       <CardContent className="flex flex-col h-[calc(100%-5rem)] overflow-y-auto pb-20">
        <Tabs defaultValue="chat" className="mb-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="file">File Analysis</TabsTrigger>
            <TabsTrigger value="email">Email Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full ${
                          message.role === "user" ? "bg-primary" : "bg-secondary"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-5 w-5 text-primary-foreground" />
                        ) : (
                          <Bot className="h-5 w-5" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content.split("\n").map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-2" : ""}>
                              {line}
                            </p>
                          ))}

                          {/* Render attachments if any */}
                          {message.attachments &&
                            message.attachments.map((attachment) => (
                              <div key={attachment.id} className="mt-2 p-2 bg-background rounded border">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Upload className="h-4 w-4" />
                                    <span className="text-sm font-medium">{attachment.name}</span>
                                  </div>
                                  <Badge
                                    variant={
                                      attachment.status === "clean"
                                        ? "outline"
                                        : attachment.status === "suspicious"
                                          ? "secondary"
                                          : attachment.status === "malicious"
                                            ? "destructive"
                                            : "outline"
                                    }
                                  >
                                    {attachment.status === "scanning" ? "Scanning..." : attachment.status}
                                  </Badge>
                                </div>

                                {attachment.status === "scanning" && (
                                  <div className="mt-2">
                                    <Progress value={attachment.scanProgress} className="h-1" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Analyzing {attachment.type} for threats... {attachment.scanProgress}%
                                    </p>
                                  </div>
                                )}

                                {attachment.status &&
                                  attachment.status !== "scanning" &&
                                  attachment.detectionDetails && (
                                    <div className="mt-2 text-xs">
                                      <div className="flex items-center justify-between">
                                        <span>Threat Score:</span>
                                        <span
                                          className={
                                            attachment.detectionDetails.score > 70
                                              ? "text-destructive"
                                              : attachment.detectionDetails.score > 40
                                                ? "text-amber-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {attachment.detectionDetails.score}/100
                                        </span>
                                      </div>

                                      {attachment.detectionDetails.threats.length > 0 && (
                                        <div className="mt-1">
                                          <span>Threats detected:</span>
                                          <ul className="list-disc list-inside">
                                            {attachment.detectionDetails.threats.map((threat, i) => (
                                              <li key={i}>{threat}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  )}
                              </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="p-3 rounded-lg bg-muted">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-current rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="flex space-x-2 fixed bottom-12 lg:bottom-34 right-0 left-64 container mx-auto w-318 bg-white p-2 rounded-b-lg">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about security threats or upload a file to analyze..."
                disabled={isProcessing}
                className="flex-1 h-20"
              />
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <div className="absolute right-10 bottom-5 flex gap-3">
                <Button
                className="size-sm"
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={triggerFileUpload}
                  disabled={isProcessing || fileUpload !== null}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button className="size-sm" type="submit" size="icon" disabled={isProcessing && !fileUpload && !input}>
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {fileUpload && (
              <div className="mt-2 p-2 bg-muted rounded flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">{fileUpload.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={removeSelectedFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="file" className="flex-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>Malware Detection</CardTitle>
                <CardDescription>Upload a file to scan for malware, viruses, and other threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={triggerFileUpload}
                >
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Drag and drop a file or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-2">Supports all file types. Max size 50MB.</p>
                </div>

                {fileUpload && (
                  <div className="mt-4 p-3 bg-muted rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Upload className="h-5 w-5" />
                        <span>{fileUpload.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={removeSelectedFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Size: {(fileUpload.size / 1024).toFixed(2)} KB</p>
                      <p>Type: {fileUpload.type || "Unknown"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={!fileUpload || isProcessing} onClick={handleSendMessage}>
                  {isProcessing ? "Analyzing..." : "Scan for Malware"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="flex-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>Email Analysis</CardTitle>
                <CardDescription>Paste an email to analyze for phishing, spam, and other threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-content" className="text-sm font-medium">
                      Email Content
                    </label>
                    <textarea
                      id="email-content"
                      rows={10}
                      className="w-full mt-1 p-2 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Paste the full email content here, including headers if available..."
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      disabled={isProcessing}
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <p className="text-sm text-muted-foreground">
                      Never share sensitive information. Redact personal data before analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={!emailContent || isProcessing} onClick={handleSendMessage}>
                  {isProcessing ? "Analyzing..." : "Analyze Email"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

