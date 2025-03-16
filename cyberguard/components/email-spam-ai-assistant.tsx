"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Send,
  User,
  Bot,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Shield,
  SendHorizonal,
} from "lucide-react";
import { toast } from "sonner";

// Import API functions
import {
  analyzeEmail,
  checkEmailAnalysisStatus,
  type EmailAnalysisRequest,
} from "@/lib/api/spam-api";
import { Textarea } from "./ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  emailAnalysis?: EmailAnalysis;
}

interface EmailAnalysis {
  subject?: string;
  sender?: string;
  status: "analyzing" | "spam" | "phishing" | "legitimate" | "suspicious";
  confidence: number;
  analysisProgress?: number;
  indicators?: {
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
  }[];
  recommendation?: string;
  headers?: Record<string, string>;
  links?: {
    url: string;
    status: "malicious" | "suspicious" | "safe";
  }[];
  analysisId?: string;
}

export function EmailSpamAIAssistant() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [emailHeaders, setEmailHeaders] = useState("");
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");
  const [emailres, setEmailres] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Welcome to your Email Security Assistant! Select an action to begin, then ask me anything about that topic",
      timestamp: time,
    },
  ]);

  const [recentDetections, setRecentDetections] = useState<
    {
      id: string;
      subject: string;
      sender: string;
      timestamp: string;
      status: "phishing" | "spam" | "suspicious" | "legitimate";
      confidence: number;
    }[]
  >([]);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Poll for analysis status if there's an active analysis
  useEffect(() => {
    if (!activeAnalysisId) return;

    const pollInterval = setInterval(async () => {
      try {
        const statusResponse = await checkEmailAnalysisStatus(activeAnalysisId);

        if (
          statusResponse.status === "completed" ||
          statusResponse.status === "failed"
        ) {
          clearInterval(pollInterval);
          setActiveAnalysisId(null);

          // Update the message with the analysis results
          if (statusResponse.status === "completed" && statusResponse.result) {
            const result = statusResponse.result;
            const status = result.isPhishing
              ? "phishing"
              : result.isSpam
              ? "spam"
              : result.isSuspicious
              ? "suspicious"
              : "legitimate";

            // Update message with analysis results
            setMessages((prev) =>
              prev.map((msg) =>
                msg.emailAnalysis?.analysisId === activeAnalysisId
                  ? {
                      ...msg,
                      emailAnalysis: {
                        ...msg.emailAnalysis,
                        status,
                        confidence: result.confidence,
                        indicators: result.indicators,
                        links: result.links,
                        recommendation: result.recommendation,
                        analysisProgress: 100,
                      },
                    }
                  : msg
              )
            );

            // Add to recent detections if not legitimate
            if (status !== "legitimate") {
              const messageWithAnalysisId = messages.find(
                (m) => m.emailAnalysis?.analysisId === activeAnalysisId
              );
              if (messageWithAnalysisId?.emailAnalysis) {
                setRecentDetections((prev) => [
                  {
                    id: Date.now().toString(),
                    subject:
                      messageWithAnalysisId.emailAnalysis?.subject ||
                      "Unknown Subject",
                    sender:
                      messageWithAnalysisId.emailAnalysis?.sender ||
                      "Unknown Sender",
                    timestamp: new Date().toLocaleString(),
                    status,
                    confidence: result.confidence,
                  },
                  ...prev.slice(0, 9),
                ]);
              }
            }

            // Show toast notification based on analysis result
            if (status === "phishing") {
              toast.error("Phishing email detected!", {
                description: "High risk threat found in the analyzed email.",
                action: {
                  label: "View Details",
                  onClick: () => console.log("View threat details"),
                },
              });
            } else if (status === "spam") {
              toast.warning("Spam email detected", {
                description: "This email has been classified as spam.",
              });
            } else if (status === "suspicious") {
              toast.info("Suspicious email detected", {
                description: "This email contains some suspicious elements.",
              });
            } else {
              toast.success("Email appears legitimate", {
                description: "No threats detected in the analysis.",
              });
            }

            // Generate AI response after analysis completes
            generateAIResponse(
              messages.find(
                (m) => m.emailAnalysis?.analysisId === activeAnalysisId
              ) as Message,
              status
            );
          } else {
            // Handle failed analysis
            setMessages((prev) =>
              prev.map((msg) =>
                msg.emailAnalysis?.analysisId === activeAnalysisId
                  ? {
                      ...msg,
                      emailAnalysis: {
                        ...msg.emailAnalysis,
                        status: "analyzing",
                        analysisProgress: 100,
                      },
                    }
                  : msg
              )
            );

            toast.error("Analysis failed", {
              description:
                statusResponse.error ||
                "Failed to analyze email. Please try again.",
            });

            setIsProcessing(false);
          }
        } else {
          // Update progress for ongoing analysis
          const progress = Math.min(
            95,
            (messages.find(
              (m) => m.emailAnalysis?.analysisId === activeAnalysisId
            )?.emailAnalysis?.analysisProgress || 0) + 5
          );

          setMessages((prev) =>
            prev.map((msg) =>
              msg.emailAnalysis?.analysisId === activeAnalysisId
                ? {
                    ...msg,
                    emailAnalysis: {
                      ...msg.emailAnalysis,
                      analysisProgress: progress,
                    },
                  }
                : msg
            )
          );
        }
      } catch (error) {
        console.error("Error polling analysis status:", error);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [activeAnalysisId, messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() && !emailContent) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content:
        input || "Can you analyze this email for potential spam or phishing?",
      timestamp: new Date().toLocaleTimeString(),
    };

    // Handle email content
    if (emailContent && activeTab === "analyze") {
      const emailAnalysis: EmailAnalysis = {
        subject: emailSubject,
        sender: emailSender,
        status: "analyzing",
        confidence: 0,
        analysisProgress: 0,
        analysisId: `analysis-${Date.now()}`,
      };

      newMessage.emailAnalysis = emailAnalysis;
    }

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      // Process email analysis with API
      if (emailContent && activeTab === "analyze") {
        const analysisOptions = {
          checkPhishing: true,
          checkSpam: true,
          checkMalware: true,
          checkSenderReputation: true,
        };

        const emailData: EmailAnalysisRequest = {
          subject: emailSubject,
          sender: emailSender,
          content: emailContent,
          headers: emailHeaders,
          analysisOptions,
        };

        const response = await analyzeEmail(emailData);

        if (response.status === "failed") {
          toast.error("Email analysis failed", {
            description:
              response.error || "Failed to analyze email. Please try again.",
          });

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id
                ? {
                    ...msg,
                    emailAnalysis: {
                      ...msg.emailAnalysis!,
                      status: "analyzing",
                      analysisProgress: 100,
                    },
                  }
                : msg
            )
          );

          setIsProcessing(false);
        } else {
          setEmailres(JSON.stringify(response))
          // Update message with analysis ID and set active analysis
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id
                ? {
                    ...msg,
                    emailAnalysis: {
                      ...msg.emailAnalysis!,
                      analysisId: response.analysisId,
                      analysisProgress: 5,
                    },
                  }
                : msg
            )
          );

          setActiveAnalysisId(response.analysisId);
          setEmailContent("");
          setEmailSubject("");
          setEmailSender("");
          setEmailHeaders("");
        }
      }
      // Handle regular text message
      else {
        // For text-only queries, generate response directly
        // setTimeout(() => {
        //   generateAIResponse(newMessage);
        // }, 1000);
        generateAIResponse(newMessage);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      toast.error("An error occurred", {
        description: "Failed to process your request. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  const parseEmailHeaders = (headersText: string): Record<string, string> => {
    const headers: Record<string, string> = {};
    const lines = headersText.split("\n");

    lines.forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        headers[key] = value;
      }
    });

    return headers;
  };

  const generateAIResponse = async (
    userMessage: Message,
    emailStatus?: string
  ) => {
    let responseContent = "";

    // Generate response based on email analysis
    if (emailStatus) {
      if (emailStatus === "phishing") {
        responseContent = `I've analyzed the email and it appears to be a sophisticated phishing attempt. This email contains several red flags:

1. The sender is attempting to impersonate a legitimate organization
2. The email uses urgent language designed to create panic and force quick action
3. It contains suspicious links that likely lead to credential harvesting sites
4. The email is requesting sensitive information or immediate action

I strongly recommend deleting this email immediately and not clicking any links or downloading any attachments. If you've already clicked links or provided information, you should change your passwords immediately and monitor your accounts for suspicious activity.

Would you like me to explain how to identify similar phishing attempts in the future?`;
      } else if (emailStatus === "spam") {
        responseContent = `I've analyzed the email and classified it as spam. While not necessarily dangerous, it's unwanted marketing or bulk email. The analysis shows:

1. The email contains typical promotional language and offers
2. It matches patterns associated with mass marketing campaigns
3. The sender may be using bulk sending techniques

This type of email can be safely deleted if unwanted. Would you like me to help you set up better spam filtering rules to catch similar emails in the future?`;
      } else if (emailStatus === "suspicious") {
        responseContent = `I've analyzed the email and while it's not definitively malicious, it contains some suspicious elements that warrant caution:

1. The sender domain has low reputation or is newly registered
2. The email contains unusual formatting or structure
3. Some aspects of the email don't follow expected patterns

I recommend verifying the sender through another communication channel before taking any actions requested in this email. Would you like tips on how to verify the authenticity of suspicious emails?`;
      } else {
        responseContent = `I've analyzed the email content and it appears to be legitimate. I didn't detect any indicators of phishing, spam, or malicious content.

The email follows expected patterns for legitimate communication:
- Sender domain appears authentic
- No suspicious links or redirects detected
- No urgent requests for sensitive information
- Content is consistent with normal business communication

Is there anything specific about this email that concerned you?`;
      }
    } else {
      // Handle regular text queries about email security
      const securityResponses = [
        "Based on my analysis, this appears to be a potential phishing attempt. The sender is using urgent language and requesting sensitive information, which are common tactics in phishing emails. I recommend not responding and reporting this to your security team.",

        "Looking at the email headers you've shared, I can confirm this is a spoofed email. The original sender doesn't match the displayed address, and the email was routed through suspicious servers. This is a sophisticated phishing attempt targeting your organization.",

        "The links in this email are suspicious. They appear to lead to legitimate websites, but actually redirect to malicious domains. This is a common phishing technique called URL obfuscation. Never click on these links.",

        "This email contains several red flags: urgent language, grammatical errors, an unexpected attachment, and a sender address that's slightly different from the legitimate company. These are classic signs of a phishing attempt.",

        "I've analyzed the email and it appears to be legitimate marketing communication. While it contains promotional content, it follows email marketing best practices and comes from a verified sender. You can safely unsubscribe if you don't want to receive these messages.",
      ];

      responseContent =
        securityResponses[Math.floor(Math.random() * securityResponses.length)];
    }

    // const formData = new FormData();
    // formData.append("prompt", input);

    console.log("input is: ", input);

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    if (response.ok) {
      console.log("Successful!");
    } else {
      console.error("Failed.");
    }

    const json = await response.json();

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: json.response, // responseContent
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsProcessing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "phishing":
        return "bg-destructive text-destructive-foreground";
      case "spam":
        return "bg-amber-500 text-white";
      case "suspicious":
        return "bg-blue-500 text-white";
      case "legitimate":
        return "bg-green-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "phishing":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "spam":
        return <Filter className="h-4 w-4 text-amber-500" />;
      case "suspicious":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "legitimate":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive border-destructive";
      case "medium":
        return "text-amber-500 border-amber-500";
      case "low":
        return "text-blue-500 border-blue-500";
      default:
        return "text-muted-foreground border-muted-foreground";
    }
  };

  const getLinkStatusColor = (status: string) => {
    switch (status) {
      case "malicious":
        return "text-destructive";
      case "suspicious":
        return "text-amber-500";
      case "safe":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const handleViewDetails = (detectionId: string) => {
    // Find the detection
    const detection = recentDetections.find((d) => d.id === detectionId);
    if (!detection) return;

    // Create a message about this detection
    setInput(
      `Can you tell me more about the ${detection.status} email from ${detection.sender} with subject "${detection.subject}"?`
    );

    // Switch to chat tab and submit
    setActiveTab("chat");
    setTimeout(() => {
      handleSendMessage(new Event("submit") as any);
    }, 100);
  };

  return (
    <Card className="max-h-[calc(100vh-22rem)] min-h-[calc(100vh-22rem)]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle>Email Spam & Phishing AI Assistant</CardTitle>
        </div>
        <CardDescription>
          Analyze emails for spam, phishing, and other threats using advanced AI
          detection
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)] overflow-y-auto pb-20">
        <Tabs defaultValue="chat" className="mb-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="analyze">Analyze Email</TabsTrigger>
            <TabsTrigger value="recent">Recent Detections</TabsTrigger>
            <TabsTrigger value="learn">Learning Center</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex flex-col">
            <div className="flex flex-col space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className="p-4 hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => {
                    setActiveTab("analyze");
                    setInput(
                      "Can you analyze this email for potential spam or phishing?"
                    );
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Analyze Email</h3>
                      <p className="text-sm text-muted-foreground">
                        Check an email for spam or phishing attempts
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-4 hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => {
                    setInput(
                      "What are the latest phishing campaigns you've detected?"
                    );
                    handleSendMessage(new Event("submit") as any);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Latest Threats</h3>
                      <p className="text-sm text-muted-foreground">
                        Get updates on recent phishing campaigns
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-4 hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => {
                    setInput("How can I identify phishing emails?");
                    handleSendMessage(new Event("submit") as any);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Security Tips</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn how to spot suspicious emails
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-4 hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => {
                    setInput(
                      "What should I do if I suspect my system is infected with malware?"
                    );
                    handleSendMessage(new Event("submit") as any);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">
                        Incident Response Planning
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Assist in creating or reviewing incident response
                        strategies.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ask questions about email security, spam detection, or
                    phishing prevention
                  </p>
                </div>
              )}
            </div>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.role === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full ${
                          message.role === "user"
                            ? "bg-primary"
                            : "bg-secondary"
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
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.content.split("\n").map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-2" : ""}>
                              {line}
                            </p>
                          ))}

                          {/* Render email analysis if any */}
                          {message.emailAnalysis && (
                            <div className="mt-3 p-2 bg-background rounded border">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Mail className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {message.emailAnalysis.subject ||
                                      "Email Analysis"}
                                  </span>
                                </div>
                                {message.emailAnalysis.status !==
                                  "analyzing" && (
                                  <Badge
                                    className={getStatusColor(
                                      message.emailAnalysis.status
                                    )}
                                  >
                                    {message.emailAnalysis.status}
                                  </Badge>
                                )}
                              </div>

                              {message.emailAnalysis.sender && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  From: {message.emailAnalysis.sender}
                                </p>
                              )}

                              {message.emailAnalysis.status === "analyzing" && (
                                <div className="mt-2">
                                  <Progress
                                    value={
                                      message.emailAnalysis.analysisProgress
                                    }
                                    className="h-1"
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Analyzing email for threats...{" "}
                                    {message.emailAnalysis.analysisProgress}%
                                  </p>
                                </div>
                              )}

                              {message.emailAnalysis.status !== "analyzing" &&
                                message.emailAnalysis.confidence !==
                                  undefined && (
                                  <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs">
                                        Detection Confidence
                                      </span>
                                      <span
                                        className={`text-xs font-medium ${
                                          message.emailAnalysis.confidence > 90
                                            ? "text-destructive"
                                            : message.emailAnalysis.confidence >
                                              70
                                            ? "text-amber-500"
                                            : "text-muted-foreground"
                                        }`}
                                      >
                                        {message.emailAnalysis.confidence}%
                                      </span>
                                    </div>
                                    <Progress
                                      value={message.emailAnalysis.confidence}
                                      className="h-1"
                                      style={
                                        {
                                          background: "var(--secondary)",
                                          "--progress-background":
                                            message.emailAnalysis.confidence >
                                            90
                                              ? "var(--destructive)"
                                              : message.emailAnalysis
                                                  .confidence > 70
                                              ? "orange"
                                              : "var(--primary)",
                                        } as React.CSSProperties
                                      }
                                    />
                                  </div>
                                )}

                              {message.emailAnalysis.indicators &&
                                message.emailAnalysis.indicators.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium">
                                      Detected Indicators:
                                    </p>
                                    <div className="mt-1 space-y-1">
                                      {message.emailAnalysis.indicators.map(
                                        (indicator, i) => (
                                          <div
                                            key={i}
                                            className="flex items-start space-x-1"
                                          >
                                            <Badge
                                              variant="outline"
                                              className={getSeverityColor(
                                                indicator.severity
                                              )}
                                            >
                                              {indicator.severity}
                                            </Badge>
                                            <div className="text-xs">
                                              <p className="font-medium">
                                                {indicator.type}
                                              </p>
                                              <p className="text-muted-foreground">
                                                {indicator.description}
                                              </p>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                              {message.emailAnalysis.links &&
                                message.emailAnalysis.links.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium">
                                      Suspicious Links:
                                    </p>
                                    <div className="mt-1 space-y-1">
                                      {message.emailAnalysis.links.map(
                                        (link, i) => (
                                          <div
                                            key={i}
                                            className="flex items-center justify-between text-xs"
                                          >
                                            <span className="truncate max-w-[200px]">
                                              {link.url}
                                            </span>
                                            <span
                                              className={getLinkStatusColor(
                                                link.status
                                              )}
                                            >
                                              {link.status}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                              {message.emailAnalysis.recommendation && (
                                <div className="mt-2 text-xs p-1.5 bg-muted rounded">
                                  <strong>Recommendation:</strong>{" "}
                                  {message.emailAnalysis.recommendation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && !activeAnalysisId && (
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

            <form
              onSubmit={handleSendMessage}
              className="flex space-x-2 fixed bottom-12 lg:bottom-34 right-0 left-64 container mx-auto w-318 bg-white p-2 rounded-b-lg"
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about email security or paste suspicious email content..."
                disabled={isProcessing}
                className="flex-1 h-20"
              />
              <div className="absolute right-10 bottom-5 flex gap-3">
                <Button
                  className="size-sm"
                  type="submit"
                  size="icon"
                  disabled={isProcessing}
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="analyze" className="flex-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>Email Analysis</CardTitle>
                <CardDescription>
                  Submit an email for AI-powered spam and phishing detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Input
                      id="email-subject"
                      placeholder="Enter the email subject line"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      disabled={isProcessing || !!activeAnalysisId}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email-sender">Sender Address</Label>
                    <Input
                      id="email-sender"
                      placeholder="Enter the sender's email address"
                      value={emailSender}
                      onChange={(e) => setEmailSender(e.target.value)}
                      disabled={isProcessing || !!activeAnalysisId}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email-content">Email Body</Label>
                    <textarea
                      id="email-content"
                      rows={8}
                      className="w-full mt-1 p-2 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Paste the full email content here..."
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      disabled={isProcessing || !!activeAnalysisId}
                    ></textarea>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-headers">
                        Email Headers (Optional)
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        Advanced
                      </span>
                    </div>
                    <textarea
                      id="email-headers"
                      rows={3}
                      className="w-full mt-1 p-2 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Paste email headers for more accurate analysis..."
                      value={emailHeaders}
                      onChange={(e) => setEmailHeaders(e.target.value)}
                      disabled={isProcessing || !!activeAnalysisId}
                    ></textarea>
                    <p className="text-xs text-muted-foreground mt-1">
                      Headers provide additional information for more accurate
                      detection
                    </p>
                  </div>

                  {activeAnalysisId && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Analysis progress
                        </span>
                        <span className="text-sm">
                          {messages.find(
                            (m) =>
                              m.emailAnalysis?.analysisId === activeAnalysisId
                          )?.emailAnalysis?.analysisProgress || 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          messages.find(
                            (m) =>
                              m.emailAnalysis?.analysisId === activeAnalysisId
                          )?.emailAnalysis?.analysisProgress || 0
                        }
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Analyzing email content, links, and sender reputation...
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Never share sensitive information. Redact personal data
                      before analysis.
                    </p>
                  </div>
                </div>
                <div className="mt-5 mb-2 text-2xl">
                  {emailres !== "spam" && emailres != null && emailres !== ''? (
                    <p className="text-green-500">The message is: {emailres}</p>
                  ) : (
                    <p className="text-green-500">The message is: {emailres}</p>
                  )}
                  
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={!emailContent || isProcessing || !!activeAnalysisId}
                  onClick={handleSendMessage}
                >
                  {activeAnalysisId ? "Analyzing..." : "Analyze Email"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="flex-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>Recent Detections</CardTitle>
                <CardDescription>
                  Recently detected spam and phishing emails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {recentDetections.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No recent detections
                      </p>
                    ) : (
                      recentDetections.map((detection) => (
                        <Card
                          key={detection.id}
                          className="border-l-4"
                          style={{
                            borderLeftColor:
                              detection.status === "phishing"
                                ? "var(--destructive)"
                                : detection.status === "spam"
                                ? "orange"
                                : detection.status === "suspicious"
                                ? "blue"
                                : "green",
                          }}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(detection.status)}
                                <CardTitle className="text-base">
                                  {detection.subject}
                                </CardTitle>
                              </div>
                              <Badge
                                className={getStatusColor(detection.status)}
                              >
                                {detection.status}
                              </Badge>
                            </div>
                            <CardDescription>
                              From: {detection.sender} • Detected:{" "}
                              {detection.timestamp}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Detection Confidence
                              </span>
                              <span
                                className={`text-sm font-medium ${
                                  detection.confidence > 90
                                    ? "text-destructive"
                                    : detection.confidence > 70
                                    ? "text-amber-500"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {detection.confidence}%
                              </span>
                            </div>
                            <Progress
                              value={detection.confidence}
                              className="h-2 mt-1"
                              style={
                                {
                                  background: "var(--secondary)",
                                  "--progress-background":
                                    detection.confidence > 90
                                      ? "var(--destructive)"
                                      : detection.confidence > 70
                                      ? "orange"
                                      : "var(--primary)",
                                } as React.CSSProperties
                              }
                            />

                            <div className="flex justify-end mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(detection.id)}
                              >
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learn" className="flex-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>Email Security Learning Center</CardTitle>
                <CardDescription>
                  Learn how to identify and protect yourself from email threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        How to Identify Phishing Emails
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Check the sender's email address
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Look carefully at the sender's email address, not
                              just the display name. Phishing emails often use
                              domains that look similar to legitimate ones but
                              with slight variations (e.g., amazon-support.com
                              instead of amazon.com).
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Be wary of urgent or threatening language
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Phishing emails often create a sense of urgency or
                              fear to pressure you into taking immediate action
                              without thinking. Be suspicious of emails that
                              claim your account will be closed, you'll face
                              legal action, or you've won something.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Hover over links before clicking
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Before clicking any links, hover your mouse over
                              them to see the actual URL. If the link address
                              doesn't match the claimed destination or looks
                              suspicious, don't click it.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Be suspicious of unexpected attachments
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Don't open attachments you weren't expecting,
                              especially if they have file extensions like .exe,
                              .scr, or .zip. These could contain malware.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Common Types of Email Threats
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Phishing
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Emails designed to trick you into revealing
                              sensitive information like passwords or credit
                              card details by impersonating trusted entities.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Spear Phishing
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Targeted phishing attacks that use personal
                              information about you to make the scam more
                              convincing and personalized.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Business Email Compromise
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Attacks that target businesses, often by
                              impersonating executives to trick employees into
                              transferring money or sharing sensitive data.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Malware Distribution
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Emails containing malicious attachments or links
                              that install viruses, ransomware, or other malware
                              when opened.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Best Practices for Email Security
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use multi-factor authentication
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Enable multi-factor authentication on all your
                              accounts to add an extra layer of security beyond
                              just passwords.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Keep software updated</p>
                            <p className="text-sm text-muted-foreground">
                              Regularly update your operating system, email
                              client, and security software to protect against
                              the latest threats.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Use a spam filter</p>
                            <p className="text-sm text-muted-foreground">
                              Enable spam filtering on your email account to
                              automatically detect and quarantine suspicious
                              messages.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Verify requests for sensitive information
                            </p>
                            <p className="text-sm text-muted-foreground">
                              If you receive an email requesting sensitive
                              information or financial transactions, verify the
                              request through a different communication channel.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("chat")}
                  >
                    Ask the AI Assistant
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("analyze")}
                  >
                    Analyze Suspicious Email
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
